import { axiosInstance } from '@/service/axiosInstance';
import { IBuildingProductProfitDetail } from '@/types/Product/BuildingProductType';
import { useQuery, QueryFunctionContext } from '@tanstack/react-query';

const fetchBuildingProductProfitDetail = async (context: QueryFunctionContext) => {
  const product_id = context.queryKey[1] as string;
  const { data } = await axiosInstance.get(`/detail/building/base/${product_id}`);
  return data;
};

export const getBuildingProductProfitDetail = (product_id: string) => {
  const queryKey = ['BuildingProductProfitDetail', product_id];

  const { data, ...queryProps } = useQuery<IBuildingProductProfitDetail>({
    queryKey,
    queryFn: fetchBuildingProductProfitDetail
  });

  return {
    data,
    ...queryProps
  };
};
