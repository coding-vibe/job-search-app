import { createContext } from 'react';

import { Job } from '@/types/job';

interface LikedJobContextType {
  likedJobs: Job[];
  toggleLikedJob: (job: Job) => void;
  isLiked: (job: Job) => boolean;
  reset: () => void;
}

const LikedJobContext = createContext<LikedJobContextType>({
  likedJobs: [],
  toggleLikedJob: () => {},
  isLiked: () => false,
  reset: () => {},
});

export default LikedJobContext;
