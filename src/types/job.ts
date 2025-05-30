export interface Job {
  job_id: string;
  job_title: string;
  job_description: string;
  employer_name: string;
  employer_logo: string | null;
  job_employment_type: string;
  job_location: string;
  job_apply_link: string;
  job_highlights: { Qualifications: string[] };
  job_posted_at: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
}
