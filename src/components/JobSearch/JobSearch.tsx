import { useState, useEffect } from "react";
import { fetchJobs } from "@/api/jobsAPI";
import useDebouncedSWR from "@/hooks/useDebouncedSWR";
import JobCard from "@/components/JobCard";
import localStorageKeys from "@/constants/localStorageKeys";
import { Job } from "@/types/job";

const DEBOUNCE_TIMEOUT = 200;

export default function JobsSearch() {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const userProfile = localStorage.getItem(localStorageKeys.USER_PROFILE);

    if (userProfile) {
      const profile = JSON.parse(userProfile);

      setQuery(profile.jobTitle);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { data, error, isLoading } = useDebouncedSWR<Job[]>({
    cacheKey: query ? ["jobs", query] : null,
    debounceDelay: DEBOUNCE_TIMEOUT,
    fetchFn: () => fetchJobs(query),
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-50 sm:text-4xl">
          Find your dream job
        </h2>
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative shadow-sm">
            <input
              className="w-full rounded-lg border border-gray-700/50 bg-gray-800 px-6 py-3 text-lg text-gray-50 
                placeholder-gray-400 transition-all duration-200 hover:border-gray-600 
                focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search for jobs..."
              onChange={handleChange}
              value={query}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block rounded-lg border border-gray-700/50 bg-gray-800/80 px-6 py-3 text-gray-300 shadow-lg backdrop-blur-sm">
              Loading jobs...
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="inline-block rounded-lg border border-red-900/50 bg-gray-800/80 px-6 py-3 text-red-400 shadow-lg backdrop-blur-sm">
              Error loading jobs. Please try again.
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="inline-block rounded-full border border-gray-700/50 bg-gray-800/80 px-4 py-2 text-sm font-medium text-gray-300 shadow-lg backdrop-blur-sm">
                {data?.length} jobs found
              </span>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {data?.map((job) => (
                  <div key={job.job_id} className="h-full">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
