import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export type UploadResult =
  | { url: string; error: null }
  | { url: null; error: string };

/**
 * Upload an image to Cloudinary.
 * Returns the secure URL on success.
 */
export async function uploadImage(
  file: File,
  folder = "luxe-hair-studio",
): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: "File too large. Maximum 5 MB." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      url: null,
      error: "Invalid file type. Accepted: JPEG, PNG, WebP, AVIF.",
    };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder,
          resource_type: "image",
          transformations: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error("Upload failed"));
          else resolve(result as { secure_url: string });
        },
      );
    });

    return { url: result.secure_url, error: null };
  } catch (error) {
    console.error("[Cloudinary] Upload error:", error);
    return { url: null, error: "Upload failed. Please try again." };
  }
}

/**
 * Delete an image from Cloudinary by its URL.
 */
export async function deleteImage(url: string): Promise<{ error: string | null }> {
  try {
    // Extract public_id from URL
    const parts = url.split("/");
    const fileWithExt = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${fileWithExt.split(".")[0]}`;

    await new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    return { error: null };
  } catch (error) {
    console.error("[Cloudinary] Delete error:", error);
    return { error: "Delete failed" };
  }
}

/**
 * Upload multiple images in parallel.
 */
export async function uploadImages(
  files: File[],
  folder?: string,
): Promise<UploadResult[]> {
  return Promise.all(files.map((f) => uploadImage(f, folder)));
}
