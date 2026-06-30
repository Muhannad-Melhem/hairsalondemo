/**
 * Supabase Storage utilities for image uploads.
 * Used by gallery, stylist images, and hero images.
 */

import { createClient } from "./server";

const AVATAR_BUCKET = "avatars";
const GALLERY_BUCKET = "gallery";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export type UploadResult =
  | { url: string; error: null }
  | { url: null; error: string };

/**
 * Upload an image file to Supabase Storage.
 * Returns the public URL on success.
 *
 * Must be called from a Server Action or Route Handler (uses server client).
 */
export async function uploadImage(
  file: File,
  bucket: "gallery" | "avatars" = GALLERY_BUCKET,
  folder = "",
): Promise<UploadResult> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: "File too large. Maximum 5 MB." };
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      url: null,
      error: "Invalid file type. Accepted: JPEG, PNG, WebP, AVIF.",
    };
  }

  try {
    const supabase = await createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = folder
      ? `${folder}/${crypto.randomUUID()}.${ext}`
      : `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("[Storage] Upload error:", uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { url: publicUrl.publicUrl, error: null };
  } catch (error) {
    console.error("[Storage] Upload failed:", error);
    return { url: null, error: "Upload failed. Please try again." };
  }
}

/**
 * Delete an image from Supabase Storage by its full URL.
 */
export async function deleteImage(
  url: string,
  bucket: "gallery" | "avatars" = GALLERY_BUCKET,
): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient();
    // Extract path from public URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/${bucket}/`);
    if (pathParts.length < 2) {
      return { error: "Invalid URL format" };
    }
    const path = pathParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error("[Storage] Delete error:", error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error("[Storage] Delete failed:", error);
    return { error: "Delete failed" };
  }
}

/**
 * Upload multiple images. Returns array of results.
 */
export async function uploadImages(
  files: File[],
  bucket: "gallery" | "avatars" = GALLERY_BUCKET,
  folder = "",
): Promise<UploadResult[]> {
  return Promise.all(files.map((f) => uploadImage(f, bucket, folder)));
}

/**
 * Ensure required storage buckets exist.
 * Call this during setup/seed.
 */
export async function ensureBuckets() {
  const supabase = await createClient();

  for (const bucket of [GALLERY_BUCKET, AVATAR_BUCKET]) {
    const { data: existing } = await supabase.storage.getBucket(bucket);
    if (!existing) {

      const { error } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: ALLOWED_TYPES,
      });
      if (error) {
        console.error(`[Storage] Failed to create bucket "${bucket}":`, error);
      } else {
        console.log(`[Storage] Bucket "${bucket}" created.`);
      }
    }
  }
}
