import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Head from '@/components/Head';
import Layout from '@/components/Layout';

const IMAGE_DIMENSIONS = {
  height: 346,
  width: 894,
};

export default function Page500() {
  return (
    <>
      <Head title="Error occurred" />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <Image
            alt="not found page image"
            height={IMAGE_DIMENSIONS.height}
            priority
            width={IMAGE_DIMENSIONS.width}
            src="/500.png"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-50 mb-6 text-center">
          Oops! Something went wrong...
        </h1>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400 focus-visible:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}

Page500.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
