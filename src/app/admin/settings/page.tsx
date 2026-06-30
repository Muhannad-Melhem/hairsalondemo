"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE } from "@/lib/constants";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

type SettingsSections = "hours" | "contact" | "hero" | "social";

function SectionActions({
  section,
  isSubmitting,
}: {
  section: SettingsSections;
  isSubmitting: boolean;
}) {
  return (
    <div className="flex justify-end pt-4">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        <Save className="mr-2 size-4" />
        Save Changes
      </Button>
    </div>
  );
}

const hoursSchema = z.object({
  monFri: z.string().min(1),
  saturday: z.string().min(1),
  sunday: z.string().min(1),
});

const contactSchema = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
});

const heroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  cta: z.string().min(1),
});

const socialSchema = z.object({
  instagram: z.string().url().or(z.literal("")),
  facebook: z.string().url().or(z.literal("")),
  tiktok: z.string().url().or(z.literal("")),
  pinterest: z.string().url().or(z.literal("")),
});

export default function SettingsPage() {
  const [saving, setSaving] = useState<SettingsSections | null>(null);

  const hoursForm = useForm<z.infer<typeof hoursSchema>>({
    resolver: zodResolver(hoursSchema),
    defaultValues: {
      monFri: SITE.hours[0]?.hours || "9:00 AM — 7:00 PM",
      saturday: SITE.hours[1]?.hours || "10:00 AM — 5:00 PM",
      sunday: SITE.hours[2]?.hours || "10:00 AM — 3:00 PM",
    },
  });

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: SITE.phone,
      email: SITE.email,
      address: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postcode}`,
    },
  });

  const heroForm = useForm<z.infer<typeof heroSchema>>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      headline: "Where Style Meets Precision",
      subheadline: "Premium hair salon offering expert cuts, color, and treatments",
      cta: "Book an Appointment",
    },
  });

  const socialForm = useForm<z.infer<typeof socialSchema>>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      instagram: SITE.social.instagram,
      facebook: SITE.social.facebook,
      tiktok: SITE.social.tiktok,
      pinterest: SITE.social.pinterest,
    },
  });

  const saveSection = async (
    section: SettingsSections,
    data: Record<string, unknown>,
  ) => {
    setSaving(section);
    try {
      await api.post("/api/admin/settings", { key: section, value: data });
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved`);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your salon business settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your salon&apos;s operating hours displayed on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={hoursForm.handleSubmit((data) =>
              saveSection("hours", data),
            )}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Mon — Fri</Label>
                <Input {...hoursForm.register("monFri")} />
              </div>
              <div className="space-y-2">
                <Label>Saturday</Label>
                <Input {...hoursForm.register("saturday")} />
              </div>
              <div className="space-y-2">
                <Label>Sunday</Label>
                <Input {...hoursForm.register("sunday")} />
              </div>
            </div>
            <SectionActions section="hours" isSubmitting={saving === "hours"} />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Phone number, email, and address shown on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={contactForm.handleSubmit((data) =>
              saveSection("contact", data),
            )}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...contactForm.register("phone")} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...contactForm.register("email")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea {...contactForm.register("address")} />
            </div>
            <SectionActions section="contact" isSubmitting={saving === "contact"} />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>
            Main headline and call-to-action on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={heroForm.handleSubmit((data) =>
              saveSection("hero", data),
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input {...heroForm.register("headline")} />
            </div>
            <div className="space-y-2">
              <Label>Subheadline</Label>
              <Input {...heroForm.register("subheadline")} />
            </div>
            <div className="space-y-2">
              <Label>CTA Text</Label>
              <Input {...heroForm.register("cta")} />
            </div>
            <SectionActions section="hero" isSubmitting={saving === "hero"} />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Links to your salon&apos;s social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={socialForm.handleSubmit((data) =>
              saveSection("social", data),
            )}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input {...socialForm.register("instagram")} placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <Label>Facebook</Label>
                <Input {...socialForm.register("facebook")} placeholder="https://facebook.com/..." />
              </div>
              <div className="space-y-2">
                <Label>TikTok</Label>
                <Input {...socialForm.register("tiktok")} placeholder="https://tiktok.com/..." />
              </div>
              <div className="space-y-2">
                <Label>Pinterest</Label>
                <Input {...socialForm.register("pinterest")} placeholder="https://pinterest.com/..." />
              </div>
            </div>
            <SectionActions section="social" isSubmitting={saving === "social"} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
