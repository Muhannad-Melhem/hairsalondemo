"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApiQuery } from "@/hooks/use-api-query";
import { api } from "@/lib/api-client";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/types";
import { Pencil, Plus, Trash2, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1, "Content is required"),
  featured: z.boolean(),
});

type TestimonialForm = z.infer<typeof testimonialSchema>;

const defaultValues: TestimonialForm = {
  name: "",
  role: "",
  rating: 5,
  content: "",
  featured: false,
};

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-colors hover:scale-110"
        >
          <Star
            className={`size-5 ${
              star <= value
                ? "fill-warning text-warning"
                : "fill-none text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: testimonials, loading, error, refetch } = useApiQuery<Testimonial>(
    "/api/admin/testimonials",
    "testimonials",
  );

  const form = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    form.reset({
      name: testimonial.name,
      role: testimonial.role || "",
      rating: testimonial.rating,
      content: testimonial.content,
      featured: testimonial.featured,
    });
    setDialogOpen(true);
  };

  const onSubmit = useCallback(async (data: TestimonialForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await api.put(`/api/admin/testimonials/${editing.id}`, data);
        toast.success("Testimonial updated");
      } else {
        await api.post("/api/admin/testimonials", data);
        toast.success("Testimonial created");
      }
      setDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [editing, refetch]);

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      await api.put(`/api/admin/testimonials/${testimonial.id}`, { featured: !testimonial.featured });
      toast.success(
        testimonial.featured
          ? "Removed from featured"
          : "Set as featured",
      );
      refetch();
    } catch {
      toast.error("Failed to update featured status");
    }
  };

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!confirm(`Delete this testimonial from ${testimonial.name}?`)) return;
    try {
      await api.delete(`/api/admin/testimonials/${testimonial.id}`);
      toast.success("Testimonial deleted");
      refetch();
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  const columns: Column<Testimonial>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "role", label: "Role", sortable: true, hideOnMobile: true },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (t) => (
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-warning text-warning" />
          <span>{t.rating}</span>
        </div>
      ),
    },
    {
      key: "content",
      label: "Content",
      render: (t) => (
        <span className="line-clamp-1 max-w-xs">{t.content}</span>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      sortable: true,
      render: (t) => (
        <Badge variant={t.featured ? "confirmed" : "secondary"}>
          {t.featured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-destructive">Failed to load testimonials: {error}</p>
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
          <h1 className="text-2xl font-heading font-semibold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" /> Add Testimonial
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={testimonials}
        keyExtractor={(t) => t.id}
        searchable
        searchKeys={["name", "content"]}
        loading={loading}
        emptyMessage="No testimonials yet."
        actions={(testimonial) => (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => openEdit(testimonial)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => toggleFeatured(testimonial)}
            >
              <Badge variant={testimonial.featured ? "confirmed" : "secondary"}>
                {testimonial.featured ? "Featured" : "Feature"}
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => deleteTestimonial(testimonial)}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        )}
        mobileCard={(testimonial) => (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{testimonial.name}</span>
              <Badge variant={testimonial.featured ? "confirmed" : "secondary"}>
                {testimonial.featured ? "Featured" : "Standard"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="size-3.5 fill-warning text-warning" />
              <span className="text-xs">{testimonial.rating}/5</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {testimonial.content}
            </p>
          </Card>
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the testimonial details."
                : "Fill in the testimonial details."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role (optional)</Label>
              <Input id="role" {...form.register("role")} placeholder="e.g. Regular Client" />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <StarRating
                value={form.watch("rating")}
                onChange={(v) => form.setValue("rating", v)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" {...form.register("content")} />
              {form.formState.errors.content && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
            <Label className="flex items-center gap-2">
              <Switch
                checked={form.watch("featured")}
                onCheckedChange={(v) => form.setValue("featured", v)}
              />
              Featured
            </Label>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                {editing ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
