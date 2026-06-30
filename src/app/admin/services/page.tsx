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
import type { Service } from "@/types";
import { formatPrice, formatDuration } from "@/lib/utils";
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(5, "Minimum 5 minutes"),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  featured: z.boolean(),
  active: z.boolean(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

const defaultValues: ServiceForm = {
  name: "",
  description: "",
  duration: 60,
  price: 0,
  category: "",
  image: "",
  featured: false,
  active: true,
};

export default function ServicesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: services, loading, error, refetch } = useApiQuery<Service>(
    "/api/admin/services",
    "services",
  );

  const form = useForm<ServiceForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(serviceSchema) as any,
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    form.reset({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category,
      image: service.image || "",
      featured: service.featured,
      active: service.active,
    });
    setDialogOpen(true);
  };

  const onSubmit = useCallback(async (data: ServiceForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await api.put(`/api/admin/services/${editing.id}`, data);
        toast.success("Service updated");
      } else {
        await api.post("/api/admin/services", data);
        toast.success("Service created");
      }
      setDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [editing, refetch]);

  const toggleActive = async (service: Service) => {
    try {
      await api.put(`/api/admin/services/${service.id}`, { active: !service.active });
      toast.success(service.active ? "Service deactivated" : "Service activated");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteService = async (service: Service) => {
    if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/admin/services/${service.id}`);
      toast.success("Service deleted");
      refetch();
    } catch {
      toast.error("Failed to delete service");
    }
  };

  const columns: Column<Service>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "category", label: "Category", sortable: true, hideOnMobile: true },
    {
      key: "duration",
      label: "Duration",
      sortable: true,
      render: (s) => formatDuration(s.duration),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (s) => formatPrice(s.price),
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
        <p className="text-destructive">Failed to load services: {error}</p>
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
          <h1 className="text-2xl font-heading font-semibold">Services</h1>
          <p className="text-sm text-muted-foreground">Manage your salon services</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" /> Add Service
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        keyExtractor={(s) => s.id}
        searchable
        searchKeys={["name", "category", "description"]}
        loading={loading}
        emptyMessage="No services yet. Create your first service."
        actions={(service) => (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(service)}>
              <Pencil className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => toggleActive(service)}>
              <Badge variant={service.active ? "confirmed" : "cancelled"}>
                {service.active ? "Active" : "Inactive"}
              </Badge>
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => deleteService(service)}>
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        )}
        mobileCard={(service) => (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{service.name}</span>
              <Badge variant={service.active ? "confirmed" : "cancelled"}>
                {service.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {service.category} &middot; {formatDuration(service.duration)} &middot; {formatPrice(service.price)}
            </p>
          </Card>
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the service details below." : "Fill in the details for the new service."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" {...form.register("duration")} />
                {form.formState.errors.duration && (
                  <p className="text-xs text-destructive">{form.formState.errors.duration.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" {...form.register("price")} />
                {form.formState.errors.price && (
                  <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...form.register("category")} />
              {form.formState.errors.category && (
                <p className="text-xs text-destructive">{form.formState.errors.category.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" {...form.register("image")} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-6">
              <Label className="flex items-center gap-2">
                <Switch checked={form.watch("featured")} onCheckedChange={(v) => form.setValue("featured", v)} />
                Featured
              </Label>
              <Label className="flex items-center gap-2">
                <Switch checked={form.watch("active")} onCheckedChange={(v) => form.setValue("active", v)} />
                Active
              </Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
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
