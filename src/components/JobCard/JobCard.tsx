import { useState, useContext } from "react";
import router from "next/router";
import Image from "next/image";
import FALLBACK_IMAGE from "@/constants/fallbackImage";
import LikedJobContext from "@/contexts/LikedJobContext";
import routes from "@/constants/routes";
import checkAuth from "@/utils/checkAuth";
import { Job } from "@/types/job";

const MAX_DISPLAYED_QUALIFICATIONS = 3;

export default function JobCard({ job }: { job: Job }) {
  const canBeCollapsed =
    job.job_highlights?.Qualifications?.length > MAX_DISPLAYED_QUALIFICATIONS;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(canBeCollapsed);
  const { toggleLikedJob, isLiked } = useContext(LikedJobContext);

  const handleToggleQualifications = () => setIsCollapsed((prev) => !prev);

  const displayedQualifications = isCollapsed
    ? job.job_highlights?.Qualifications?.slice(0, MAX_DISPLAYED_QUALIFICATIONS)
    : job.job_highlights?.Qualifications;

  return (
    <div
      className="group relative h-full rounded-xl border border-gray-700/50 bg-gray-900/90 p-4 lg:p-6 
      transition-all duration-300 hover:rotate-1 hover:border-gray-600 hover:bg-gray-900 hover:shadow-xl"
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 text-right">
          <button
            className={`rounded-full p-1.5 transition-all duration-300 hover:bg-gray-800 
              ${
                isLiked(job)
                  ? "text-red-500"
                  : "text-gray-400 hover:scale-110 hover:text-red-500"
              }`}
            onClick={() => {
              if (!checkAuth()) {
                router.push(routes.SIGN_IN);
              } else {
                toggleLikedJob(job);
              }
            }}
            aria-label={
              isLiked(job) ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="relative flex-shrink-0 h-16 w-16 overflow-hidden rounded-lg border border-gray-700/50">
            <Image
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              src={job.employer_logo || FALLBACK_IMAGE}
              alt={job.employer_name || "Company logo"}
              fill
              sizes="64px"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-50 line-clamp-1">
              {job.employer_name}
            </h3>
            <span className="text-sm text-gray-400">{job.job_location}</span>
          </div>
        </div>
        <div className="flex-grow my-4 space-y-4">
          <h3 className="text-2xl font-medium text-gray-200 line-clamp-2">
            {job.job_title}
          </h3>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-blue-500/90">
              Qualifications:
            </p>
            {displayedQualifications ? (
              <>
                <ul className="flex flex-col gap-2.5" role="list">
                  {displayedQualifications.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <svg
                        className="flex-shrink-0 h-4 w-4 mt-1 text-blue-500/70"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="line-clamp-2 text-gray-300">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
                {canBeCollapsed && (
                  <button
                    onClick={handleToggleQualifications}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium 
                      text-blue-500 transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {isCollapsed ? (
                      <>
                        Show More
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        Show Less
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-400">No job requirements found</p>
            )}
          </div>
          <div className="text-sm text-gray-500">{job.job_posted_at}</div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-sm font-medium text-gray-300">
            {job.job_employment_type}
          </span>
          <a
            href={`/jobs/${job.job_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium 
              text-blue-500 transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400"
          >
            Details
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
