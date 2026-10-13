import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useApplications } from "../hooks/useApplications";
import { localIsoDate, STAGE_LABELS, STAGES } from "../lib/applications";
import type { NewApplication, Stage } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  company: string;
  role: string;
  link: string;
  dateSent: string;
  stage: Stage;
  notes: string;
};

export function NewApplicationPage() {
  const navigate = useNavigate();
  const { add } = useApplications();
  const companyRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      company: "",
      role: "",
      link: "",
      dateSent: localIsoDate(),
      stage: "wishlist",
      notes: "",
    },
  });

  const companyField = register("company", {
    required: "Company is required",
    minLength: { value: 2, message: "At least 2 characters" },
  });

  useEffect(() => {
    companyRef.current?.focus();
  }, []);

  async function onSubmit(values: FormValues) {
    const input: NewApplication = {
      company: values.company.trim(),
      role: values.role.trim(),
      dateSent: values.dateSent,
      stage: values.stage,
    };
    const link = values.link.trim();
    const notes = values.notes.trim();
    if (link.length > 0) input.link = link;
    if (notes.length > 0) input.notes = notes;
    await add(input);
    navigate("/");
  }

  return (
    <section className="space-y-4">
      <Button asChild variant="link" className="h-auto px-0">
        <Link to="/">← Back to all applications</Link>
      </Button>
      <h1 className="text-2xl font-semibold tracking-tight">Add an application</h1>
      <form className="grid max-w-xl gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "company-error" : undefined}
            disabled={isSubmitting}
            {...companyField}
            ref={(element) => {
              companyField.ref(element);
              companyRef.current = element;
            }}
          />
          {errors.company ? (
            <span id="company-error" role="alert" className="text-sm font-medium text-destructive">
              {errors.company.message}
            </span>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="role">Job title</Label>
          <Input
            id="role"
            type="text"
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={errors.role ? "role-error" : undefined}
            disabled={isSubmitting}
            {...register("role", {
              required: "Job title is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.role ? (
            <span id="role-error" role="alert" className="text-sm font-medium text-destructive">
              {errors.role.message}
            </span>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="link">Link to the advert (optional)</Label>
          <Input
            id="link"
            type="url"
            inputMode="url"
            placeholder="https://"
            aria-invalid={errors.link ? true : undefined}
            aria-describedby={errors.link ? "link-error" : undefined}
            disabled={isSubmitting}
            {...register("link", {
              validate: (value) => {
                const trimmed = value.trim();
                if (trimmed.length === 0) return true;
                try {
                  const url = new URL(trimmed);
                  if (url.protocol === "http:" || url.protocol === "https:") {
                    return true;
                  }
                  return "That does not look like a link";
                } catch {
                  return "That does not look like a link";
                }
              },
            })}
          />
          {errors.link ? (
            <span id="link-error" role="alert" className="text-sm font-medium text-destructive">
              {errors.link.message}
            </span>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="dateSent">Date sent</Label>
          <Input
            id="dateSent"
            type="date"
            aria-invalid={errors.dateSent ? true : undefined}
            aria-describedby={errors.dateSent ? "dateSent-error" : undefined}
            disabled={isSubmitting}
            {...register("dateSent", {
              required: "Date sent is required",
              validate: (value) =>
                value <= localIsoDate() || "You cannot have sent it tomorrow",
            })}
          />
          {errors.dateSent ? (
            <span id="dateSent-error" role="alert" className="text-sm font-medium text-destructive">
              {errors.dateSent.message}
            </span>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="stage">Stage</Label>
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="stage" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {STAGE_LABELS[stage]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea id="notes" rows={4} disabled={isSubmitting} {...register("notes")} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="accent" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save application"}
          </Button>
          <Button asChild variant="link">
            <Link to="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
