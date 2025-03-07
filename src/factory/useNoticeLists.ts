import { basicAxiosInstance } from '@/service/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { lastDayOfDecade } from 'date-fns';

const fetchNoticeLists = async ({
  queryKey,
  pageParam = 1
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  const [, category] = queryKey;
  const { data } = await basicAxiosInstance.get(`/notice?page=${pageParam}&size=10`);
  return data;
};

const UseNoticeLists = (category: string) => {
  const queryKey = ['NoticeLists', category];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchNoticeLists,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return allPages.length + 1;
      },
      initialPageParam: 1,
      enabled: !!category
    });

  return {
    data,
    fetchNextPage,
    hasNextPage: !!data?.pages.length,
    isFetching,
    isFetchingNextPage,
    isLoading
  };
};

export default UseNoticeLists;
