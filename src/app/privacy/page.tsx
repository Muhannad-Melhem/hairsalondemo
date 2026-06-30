import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import { Shield } from "lucide-react";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Our commitment to protecting your privacy. Read about how Luxe Hair Studio collects, uses, and safeguards your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-b from-muted to-background">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Shield className="mx-auto mb-4 size-8 text-primary" />
          <h1 className="font-heading text-4xl text-foreground sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="prose prose-sm prose-zinc max-w-none dark:prose-invert">
          <h2 className="font-heading text-2xl text-foreground">
            Introduction
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {SITE.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
            committed to protecting the privacy of your personal information.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our
            services.
          </p>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may collect the following types of information:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Personal Identification Information:</strong>{" "}
              Name, email address, phone number, and any other information you
              voluntarily provide when booking appointments or contacting us.
            </li>
            <li>
              <strong className="text-foreground">Appointment Data:</strong> Service
              preferences, stylist preferences, appointment history, and
              related notes you provide.
            </li>
            <li>
              <strong className="text-foreground">Technical Data:</strong> IP address,
              browser type, device information, and browsing behaviour on our
              website collected through cookies and analytics tools.
            </li>
          </ul>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the collected information for the following purposes:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>To process and manage your appointments and service requests</li>
            <li>To communicate with you about appointments, promotions, and salon updates</li>
            <li>To improve our services, website experience, and customer care</li>
            <li>To comply with legal obligations and maintain records</li>
            <li>To send marketing communications with your explicit consent</li>
          </ul>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Data Protection
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, disclosure, or destruction. This includes encrypted
            data transmission, secure server infrastructure, and access
            controls.
          </p>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Third-Party Sharing
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating our website and conducting our
            business, provided they agree to keep your information confidential
            and use it solely for the purposes we specify.
          </p>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website uses cookies to enhance your browsing experience.
            Cookies are small text files stored on your device that help us
            understand how you use our site. You can control cookie
            preferences through your browser settings. Disabling cookies may
            affect certain features of our website.
          </p>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Your Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your data, subject to legal retention requirements</li>
            <li>Withdraw consent for marketing communications at any time</li>
            <li>Lodge a complaint with the applicable privacy authority</li>
          </ul>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Data Retention
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information only as long as necessary to
            fulfil the purposes for which it was collected, or as required by
            applicable law. When data is no longer needed, it is securely
            deleted or anonymised.
          </p>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy or wish to
            exercise your data rights, please contact us:
          </p>
          <div className="mt-4 rounded-xl border border-border/50 bg-muted/30 p-4">
            <p className="text-sm text-foreground">{SITE.name}</p>
            <p className="text-sm text-muted-foreground">
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region},{" "}
              {SITE.address.postcode}
            </p>
            <p className="text-sm text-muted-foreground">{SITE.email}</p>
            <p className="text-sm text-muted-foreground">{SITE.phone}</p>
          </div>

          <h2 className="mt-10 font-heading text-2xl text-foreground">
            Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update this Privacy Policy at any time.
            Changes will be posted on this page with an updated revision date.
            We encourage you to review this policy periodically.
          </p>
        </div>
      </section>
    </>
  );
}
