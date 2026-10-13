import { seedApplications } from "../data/seed";
import type { Application, NewApplication } from "../types";

const STORAGE_KEY = "applied.applications";
const DELAY_MS = 300;

function wait(ms: number = DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function readStore(): Application[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedApplications));
    return seedApplications.map((item) => ({ ...item }));
  }

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved applications are not a list.");
  }

  return parsed as Application[];
}

function writeStore(applications: Application[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export async function fetchApplications(): Promise<Application[]> {
  await wait();
  return readStore();
}

export async function createApplication(
  input: NewApplication,
): Promise<Application> {
  await wait();
  const applications = readStore();
  const application: Application = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeStore([application, ...applications]);
  return application;
}

export async function updateApplication(
  id: string,
  changes: Partial<Application>,
): Promise<Application> {
  await wait();
  const applications = readStore();
  const index = applications.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("That application does not exist.");
  }

  const updated: Application = { ...applications[index], ...changes, id };
  const next = [...applications];
  next[index] = updated;
  writeStore(next);
  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  await wait();
  const applications = readStore();
  writeStore(applications.filter((item) => item.id !== id));
}
