import { useCallback, useEffect, useState } from "react";
import {
  createApplication,
  deleteApplication,
  fetchApplications,
  updateApplication,
} from "../api/applications";
import type { Application, NewApplication } from "../types";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadList = useCallback(async () => {
    const list = await fetchApplications();
    setApplications(list);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadOnMount() {
      try {
        const list = await fetchApplications();
        if (cancelled) return;
        setApplications(list);
      } catch {
        if (cancelled) return;
        setError("Something went wrong while loading your applications.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadOnMount();
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await loadList();
    } catch {
      setError("Something went wrong while loading your applications.");
    } finally {
      setLoading(false);
    }
  }, [loadList]);

  const add = useCallback(
    async (input: NewApplication) => {
      setSaving(true);
      setError(null);
      try {
        await createApplication(input);
        await loadList();
      } catch {
        setError("Something went wrong while saving the application.");
        throw new Error("save failed");
      } finally {
        setSaving(false);
      }
    },
    [loadList],
  );

  const update = useCallback(
    async (id: string, changes: Partial<Application>) => {
      setSaving(true);
      setError(null);
      try {
        await updateApplication(id, changes);
        await loadList();
      } catch {
        setError("Something went wrong while saving the application.");
        throw new Error("save failed");
      } finally {
        setSaving(false);
      }
    },
    [loadList],
  );

  const remove = useCallback(
    async (id: string) => {
      setSaving(true);
      setError(null);
      try {
        await deleteApplication(id);
        await loadList();
      } catch {
        setError("Something went wrong while deleting the application.");
        throw new Error("delete failed");
      } finally {
        setSaving(false);
      }
    },
    [loadList],
  );

  return {
    applications,
    loading,
    error,
    saving,
    add,
    update,
    remove,
    reload,
  };
}
