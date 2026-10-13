import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useApplications } from "../hooks/useApplications";
import { localIsoDate, STAGE_LABELS, STAGES } from "../lib/applications";
import type { NewApplication, Stage } from "../types";

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
    <section className="page">
      <p>
        <Link to="/" className="text-link">
          ← Back to all applications
        </Link>
      </p>
      <h1>Add an application</h1>
      <form className="application-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className="filter-bar__field">
          <label htmlFor="company">Company</label>
          <input
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
            <span id="company-error" role="alert">
              {errors.company.message}
            </span>
          ) : null}
        </p>

        <p className="filter-bar__field">
          <label htmlFor="role">Job title</label>
          <input
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
            <span id="role-error" role="alert">
              {errors.role.message}
            </span>
          ) : null}
        </p>

        <p className="filter-bar__field">
          <label htmlFor="link">Link to the advert (optional)</label>
          <input
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
            <span id="link-error" role="alert">
              {errors.link.message}
            </span>
          ) : null}
        </p>

        <p className="filter-bar__field">
          <label htmlFor="dateSent">Date sent</label>
          <input
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
            <span id="dateSent-error" role="alert">
              {errors.dateSent.message}
            </span>
          ) : null}
        </p>

        <p className="filter-bar__field">
          <label htmlFor="stage">Stage</label>
          <select id="stage" disabled={isSubmitting} {...register("stage", { required: true })}>
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {STAGE_LABELS[stage]}
              </option>
            ))}
          </select>
        </p>

        <p className="filter-bar__field">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" rows={4} disabled={isSubmitting} {...register("notes")} />
        </p>

        <p className="form-actions">
          <button type="submit" className="add-application" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save application"}
          </button>
          <Link to="/" className="text-link">
            Cancel
          </Link>
        </p>
      </form>
    </section>
  );
}
