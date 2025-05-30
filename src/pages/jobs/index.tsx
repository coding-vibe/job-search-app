import { ReactNode } from 'react';

import Head from '@/components/Head';
import JobSearch from '@/components/JobSearch';
import Layout from '@/components/Layout';

export default function JobsPage() {
  return (
    <>
      <Head title="Job search" />
      <JobSearch />
    </>
  );
}

JobsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
