import { useMemo, useState, ReactNode, useCallback, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import LikedJobContext from "@/contexts/LikedJobContext";
import { Job } from "@/types/job";
import localStorageKeys from "@/constants/localStorageKeys";

interface Props {
  children: ReactNode;
}

export default function LikedJobsProvider({ children }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const isLiked = useCallback(
    (job: Job) => jobs.some((j) => j.job_id === job.job_id),
    [jobs]
  );

  useEffect(() => {
    const storedJobs = localStorage.getItem(localStorageKeys.LIKED_JOBS);

    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.LIKED_JOBS, JSON.stringify(jobs));
  }, [jobs]);

  const toggleLikedJob = useCallback(
    (job: Job) => {
      if (isLiked(job)) {
        setJobs((prevJobs) => prevJobs.filter((j) => j.job_id !== job.job_id));
        enqueueSnackbar("Job removed from liked list", {
          variant: "info",
        });
      } else {
        setJobs((prevJobs) => [...prevJobs, job]);
        enqueueSnackbar("Job added to liked list", {
          variant: "info",
        });
      }
    },
    [isLiked]
  );

  const reset = useCallback(() => {
    setJobs([]);
  }, []);

  const value = useMemo(
    () => ({
      likedJobs: jobs,
      toggleLikedJob,
      isLiked,
      reset,
    }),
    [jobs, toggleLikedJob, isLiked, reset]
  );

  return (
    <LikedJobContext.Provider value={value}>
      {children}
    </LikedJobContext.Provider>
  );
}
