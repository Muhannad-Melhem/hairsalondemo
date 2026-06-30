"use client";

import { useState } from "react";
import { useApiQuery } from "@/hooks/use-api-query";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { GalleryItem } from "@/types";
import { Plus, Trash2, GripVertical, ImageOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GalleryPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: items, loading, error, refetch } = useApiQuery<GalleryItem>(
    "/api/admin/gallery",
    "items",
  );
  const [order, setOrder] = useState<string[]>([]);

  const sortedItems = [...items].sort((a, b) => {
    const idxA = order.indexOf(a.id);
    const idxB = order.indexOf(b.id);
    if (idxA === -1 && idxB === -1) return 0;
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });

  const moveItem = (dragIndex: number, dropIndex: number) => {
    const newOrder = [...sortedItems];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    setOrder(newOrder.map((i) => i.id));
  };

  const handleUpload = async () => {
    if (!src.trim()) {
      toast.error("Image URL is required");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/api/admin/gallery", {
        src,
        alt: alt || "Gallery image",
        category: category || "uncategorized",
      });
      toast.success("Image added to gallery");
      setSrc("");
      setAlt("");
      setCategory("");
      setUploadOpen(false);
      refetch();
    } catch {
      toast.error("Failed to add image");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteItem = async (item: GalleryItem) => {
    if (!confirm(`Delete this image? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/admin/gallery/${item.id}`);
      toast.success("Image deleted");
      refetch();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-destructive">Failed to load gallery: {error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Gallery</h1>
          <p className="text-sm text-muted-foreground">
            Manage your salon gallery images
          </p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <Button onClick={() => setUploadOpen(true)}>
            <Plus className="mr-2 size-4" /> Add Image
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Gallery Image</DialogTitle>
              <DialogDescription>
                Enter the image URL and details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src">Image URL</Label>
                <Input
                  id="src"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Description of the image"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat">Category</Label>
                <Input
                  id="cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. haircuts, color, styling"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUploadOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={submitting}>
                  {submitting && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Add to Gallery
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <ImageOff className="size-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            No images in the gallery yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedItems.map((item, index) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <div className="aspect-square">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="size-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f0f0f0' width='400' height='400'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-start justify-between gap-2 bg-black/0 p-2 transition-colors group-hover:bg-black/40">
                <button
                  type="button"
                  className="cursor-grab rounded bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                  onMouseDown={() => moveItem(index, 0)}
                >
                  <GripVertical className="size-4" />
                </button>
                <Button
                  variant="destructive"
                  size="icon-xs"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => deleteItem(item)}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-medium truncate">{item.alt}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {item.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
