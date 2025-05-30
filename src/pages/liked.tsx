import { ReactNode } from 'react';
import { useContext } from 'react';

import LikedJobContext from '@/contexts/LikedJobContext';
import JobCard from '@/components/JobCard';
import Head from '@/components/Head';
import Layout from '@/components/Layout';

export default function LikesPage() {
  const { likedJobs } = useContext(LikedJobContext);

  return (
    <>
      <Head title="Liked jobs" />
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-50">Liked Jobs</h1>
          {likedJobs.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedJobs.map((job) => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No liked jobs yet</p>
              <p className="mt-2 text-gray-500">Jobs you like will appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

LikesPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
