import type { MainNews } from '@/types/homeComponentsType';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetcheRecentlyIssues = async () => {
  const { data } = await axios.get(`https://api.moaguide.com/content/news/`);
  return data;
};

export const getRecentlyIssues = () => {
  const queryKey = ['RecentlyIssues'];

  const { data, ...queryProps } = useQuery<MainNews[]>({
    queryKey,
    queryFn: fetcheRecentlyIssues
  });

  return {
    data,
    ...queryProps
  };
};
