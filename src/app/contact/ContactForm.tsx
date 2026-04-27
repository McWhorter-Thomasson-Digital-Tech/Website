"use client";

import { useState } from "react";
import { sendContactFormEmail } from "@/actions/sendEmail";
import { CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    // Clearing status with a small timeout or just immediate
    setFormStatus({ type: null, message: null });

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await sendContactFormEmail({ name, email, message });

      if (response.success) {
        setFormStatus({
          type: "success",
          message: "Message sent! We'll get back to you soon.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        setFormStatus({
          type: "error",
          message: response.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.fieldLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className={styles.input}
              required
              minLength={2}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.fieldLabel}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us about your project..."
            className={styles.textarea}
            required
            minLength={10}
          />
        </div>

        {formStatus.message && (
          <div
            key={formStatus.message} // Forces re-animation if message changes
            className={`${styles.statusMessage} ${
              formStatus.type === "success" ? styles.success : styles.error
            }`}
            role="alert"
          >
            {formStatus.type === "success" ? (
              <CheckCircle2 className={styles.statusIcon} />
            ) : (
              <AlertCircle className={styles.statusIcon} />
            )}
            <span>{formStatus.message}</span>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}

