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
import type { Stylist } from "@/types";
import { Pencil, Plus, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const stylistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  experience: z.coerce.number().min(0, "Experience must be positive"),
  image: z.string().optional(),
  instagram: z.string().optional(),
  active: z.boolean(),
});

type StylistForm = z.infer<typeof stylistSchema>;

const defaultValues: StylistForm = {
  name: "",
  title: "",
  bio: "",
  specialties: [],
  experience: 0,
  image: "",
  instagram: "",
  active: true,
};

export default function StylistsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Stylist | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState("");

  const { data: stylists, loading, error, refetch } = useApiQuery<Stylist>(
    "/api/admin/stylists",
    "stylists",
  );

  const form = useForm<StylistForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(stylistSchema) as any,
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (stylist: Stylist) => {
    setEditing(stylist);
    form.reset({
      name: stylist.name,
      title: stylist.title,
      bio: stylist.bio,
      specialties: stylist.specialties,
      experience: stylist.experience,
      image: stylist.image || "",
      instagram: stylist.instagram || "",
      active: stylist.active,
    });
    setDialogOpen(true);
  };

  const addSpecialty = () => {
    const val = specialtyInput.trim();
    if (!val) return;
    const current = form.getValues("specialties");
    if (!current.includes(val)) {
      form.setValue("specialties", [...current, val]);
    }
    setSpecialtyInput("");
  };

  const removeSpecialty = (index: number) => {
    const current = form.getValues("specialties");
    form.setValue(
      "specialties",
      current.filter((_, i) => i !== index),
    );
  };

  const onSubmit = useCallback(async (data: StylistForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await api.put(`/api/admin/stylists/${editing.id}`, data);
        toast.success("Stylist updated");
      } else {
        await api.post("/api/admin/stylists", data);
        toast.success("Stylist created");
      }
      setDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [editing, refetch]);

  const deleteStylist = async (stylist: Stylist) => {
    if (!confirm(`Delete "${stylist.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/admin/stylists/${stylist.id}`);
      toast.success("Stylist deleted");
      refetch();
    } catch {
      toast.error("Failed to delete stylist");
    }
  };

  const columns: Column<Stylist>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "title", label: "Title", sortable: true, hideOnMobile: true },
    {
      key: "specialties",
      label: "Specialties",
      render: (s) => (
        <div className="flex flex-wrap gap-1">
          {s.specialties.slice(0, 2).map((spec) => (
            <Badge key={spec} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
          {s.specialties.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{s.specialties.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "experience",
      label: "Experience",
      sortable: true,
      render: (s) => `${s.experience} years`,
      hideOnMobile: true,
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      render: (s) => (
        <Badge variant={s.active ? "confirmed" : "cancelled"}>
          {s.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-destructive">Failed to load stylists: {error}</p>
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
          <h1 className="text-2xl font-heading font-semibold">Stylists</h1>
          <p className="text-sm text-muted-foreground">
            Manage your salon team
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" /> Add Stylist
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={stylists}
        keyExtractor={(s) => s.id}
        searchable
        searchKeys={["name", "title", "bio"]}
        loading={loading}
        emptyMessage="No stylists yet. Add your first stylist."
        actions={(stylist) => (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => openEdit(stylist)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => deleteStylist(stylist)}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        )}
        mobileCard={(stylist) => (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{stylist.name}</span>
              <Badge variant={stylist.active ? "confirmed" : "cancelled"}>
                {stylist.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {stylist.title} &middot; {stylist.experience} years
            </p>
          </Card>
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Stylist" : "Add Stylist"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the stylist details below."
                : "Fill in the details for the new stylist."}
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
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} placeholder="Senior Stylist" />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" {...form.register("bio")} />
              {form.formState.errors.bio && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.bio.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Specialties</Label>
              <div className="flex flex-wrap gap-1 mb-2">
                {form.watch("specialties").map((spec, i) => (
                  <Badge key={i} variant="secondary" className="gap-1">
                    {spec}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(i)}
                      className="hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                  placeholder="Add a specialty..."
                />
                <Button type="button" variant="outline" onClick={addSpecialty}>
                  Add
                </Button>
              </div>
              {form.formState.errors.specialties && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.specialties.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  type="number"
                  {...form.register("experience")}
                />
                {form.formState.errors.experience && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.experience.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input id="instagram" {...form.register("instagram")} placeholder="https://instagram.com/..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" {...form.register("image")} placeholder="https://..." />
            </div>
            <Label className="flex items-center gap-2">
              <Switch
                checked={form.watch("active")}
                onCheckedChange={(v) => form.setValue("active", v)}
              />
              Active
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
