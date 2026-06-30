"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApiQuery } from "@/hooks/use-api-query";
import { api } from "@/lib/api-client";
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
import type { FAQItem } from "@/types";
import { GripVertical, Pencil, Plus, Trash2, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  active: z.boolean(),
});

type FAQForm = z.infer<typeof faqSchema>;

const defaultValues: FAQForm = {
  question: "",
  answer: "",
  active: true,
};

export default function FAQsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: faqs, loading, error, refetch } = useApiQuery<FAQItem>(
    "/api/admin/faqs",
    "faqs",
  );

  const [localFaqs, setLocalFaqs] = useState<FAQItem[]>([]);

  const displayFaqs = localFaqs.length > 0 ? localFaqs : faqs;

  const form = useForm<FAQForm>({
    resolver: zodResolver(faqSchema),
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (faq: FAQItem) => {
    setEditing(faq);
    form.reset({
      question: faq.question,
      answer: faq.answer,
      active: faq.active ?? true,
    });
    setDialogOpen(true);
  };

  const onSubmit = useCallback(async (data: FAQForm) => {
    setSubmitting(true);
    try {
      if (editing) {
        await api.put(`/api/admin/faqs/${editing.id}`, data);
        toast.success("FAQ updated");
      } else {
        await api.post("/api/admin/faqs", { ...data, order: displayFaqs.length });
        toast.success("FAQ created");
      }
      setDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [editing, displayFaqs.length, refetch]);

  const deleteFaq = async (faq: FAQItem) => {
    if (!confirm(`Delete this FAQ?`)) return;
    try {
      await api.delete(`/api/admin/faqs/${faq.id}`);
      toast.success("FAQ deleted");
      refetch();
    } catch {
      toast.error("Failed to delete FAQ");
    }
  };

  const toggleActive = async (faq: FAQItem) => {
    try {
      const newActive = !(faq.active ?? true);
      await api.put(`/api/admin/faqs/${faq.id}`, { active: newActive });
      toast.success(newActive ? "FAQ activated" : "FAQ deactivated");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newFaqs = [...displayFaqs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;

    [newFaqs[index], newFaqs[targetIndex]] = [newFaqs[targetIndex], newFaqs[index]];
    const reordered = newFaqs.map((faq, i) => ({ ...faq, order: i }));
    setLocalFaqs(reordered);

    const updates = reordered.map((faq) => ({ id: faq.id, order: faq.order }));
    Promise.all(
      updates.map((u) => api.put(`/api/admin/faqs/${u.id}`, { order: u.order })),
    ).catch(() => toast.error("Failed to save order"));
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-destructive">Failed to load FAQs: {error}</p>
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
          <h1 className="text-2xl font-heading font-semibold">FAQs</h1>
          <p className="text-sm text-muted-foreground">
            Manage frequently asked questions
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" /> Add FAQ
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : displayFaqs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No FAQs yet. Add your first question.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayFaqs.map((faq, index) => (
            <Card key={faq.id} className="overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <button
                    type="button"
                    className="cursor-grab text-muted-foreground hover:text-foreground"
                  >
                    <GripVertical className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <ChevronUp className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === displayFaqs.length - 1}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <ChevronDown className="size-3" />
                  </button>
                </div>

                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => toggleExpand(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{faq.question}</span>
                      <Badge
                        variant={(faq.active ?? true) ? "confirmed" : "cancelled"}
                      >
                        {(faq.active ?? true) ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  {expandedId === faq.id && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(faq)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => toggleActive(faq)}
                  >
                    <Badge variant={(faq.active ?? true) ? "confirmed" : "cancelled"}>
                      {(faq.active ?? true) ? "Active" : "Inactive"}
                    </Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => deleteFaq(faq)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the question and answer."
                : "Enter a new frequently asked question."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input id="question" {...form.register("question")} />
              {form.formState.errors.question && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.question.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea id="answer" {...form.register("answer")} />
              {form.formState.errors.answer && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.answer.message}
                </p>
              )}
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
