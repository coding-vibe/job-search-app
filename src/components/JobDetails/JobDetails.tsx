import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { fetchJobDetails } from "@/api/jobsAPI";
import Head from "@/components/Head";
import FALLBACK_IMAGE from "@/constants/fallbackImage";
import { Job } from "@/types/job";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR<Job>(id ? ["jobs", id] : null, () =>
    fetchJobDetails(id as string)
  );

  return (
    <>
      <Head title={data?.job_title || "Job details"} />
      <section className="min-h-screen bg-gray-900">
        <div className="bg-gray-800/50 py-12 w-full border-b border-gray-700/50">
          <div className="container mx-auto flex items-center justify-center px-4 text-center md:px-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl">
                {data?.job_title}
              </h1>
              <div className="inline-flex items-center gap-4">
                <p className="text-gray-400">at</p>
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    className="object-cover"
                    src={data?.employer_logo || FALLBACK_IMAGE}
                    alt={data?.employer_name || "Company logo"}
                    fill
                    sizes="64px"
                  />
                </div>
                <span className="text-xl font-bold text-gray-50">
                  {data?.employer_name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto grid gap-8 px-4 py-8 md:px-6 lg:grid-cols-4 lg:gap-12">
          <div className="rounded-xl border border-gray-700/50 bg-gray-900 p-6 space-y-6 lg:col-start-1 lg:row-start-1">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-500">Location</h3>
              <p className="text-gray-300">{data?.job_location}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-500">
                Salary Range
              </h3>
              <p className="text-gray-300">
                {data?.job_min_salary}$ - {data?.job_max_salary}$
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-500">Posted</h3>
              <p className="text-gray-300">{data?.job_posted_at}</p>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <Link
                href={data?.job_apply_link || "#"}
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                Apply for this job
              </Link>
            </div>
          </div>
          <div className="space-y-8 lg:col-start-2 lg:col-span-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-gray-200">
                  About the Role
                </h2>
                <p className="text-gray-400">{data?.job_employment_type}</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-500">
                    Description
                  </h3>
                  <p className="text-gray-300 text-lg/relaxed">
                    {data?.job_description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-500">
                    Requirements
                  </h3>
                  {data?.job_highlights?.Qualifications ? (
                    <ul className="flex flex-col gap-2" role="list">
                      {data.job_highlights.Qualifications.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start min-h-[24px] gap-2"
                        >
                          <svg
                            className="flex-shrink-0 h-4 w-4 mt-0.5 text-gray-400"
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
                          <span className="text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300">No job requirements found</p>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-gray-900 p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter text-gray-200">
                  About {data?.employer_name}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      className="object-cover"
                      src={data?.employer_logo || FALLBACK_IMAGE}
                      alt={data?.employer_name || "Company logo"}
                      fill
                      sizes="64px"
                    />
                  </div>
                  <Link
                    href={data?.job_apply_link || "#"}
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="rounded-lg border border-gray-700/50 bg-gray-900 px-6 py-3 text-gray-300 shadow-lg">
              Loading job details...
            </div>
          </div>
        )}
        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="rounded-lg border border-red-900/50 bg-gray-900 px-6 py-3 text-red-400 shadow-lg">
              Error loading job details. Please try again.
            </div>
          </div>
        )}
      </section>
    </>
  );
}
