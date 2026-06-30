"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ScissorsIcon, ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    setSubmitting(true);
    try {
      await api.post("/api/auth/forgot-password", { email: data.email });
      setSent(true);
    } catch {
      toast.success("If an account exists, a reset link has been sent.");
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <MailCheck className="mx-auto mb-4 size-12 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Check Your Email</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              If an account with that email exists, we&apos;ve sent password reset instructions.
            </p>
            <Link href="/auth/login">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" /> Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary">
            <ScissorsIcon className="size-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="text-foreground underline underline-offset-4 hover:text-primary">
              <ArrowLeft className="mr-1 inline size-3" /> Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
