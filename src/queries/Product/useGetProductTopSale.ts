import { ApiKey } from '@queries/keys';
import { isEmpty, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ProductApi, TopSaleResponse, TopSellsParams } from '.';

export function useGetTopSells(options?: UseQueryOptions<TopSaleResponse[], Error>) {
  const [params, setParams] = useState<TopSellsParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetTopSells,
  } = useQuery<TopSaleResponse[], Error>([ApiKey.TOP_SALE, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return responseWrapper<TopSaleResponse[]>(ProductApi.getProductTopSale, [params]);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateTopSellsList = () => queryClient.invalidateQueries([ApiKey.TOP_SALE]);

  return {
    topSells: data,
    params,
    error,
    isError,
    isFetching,
    onGetTopSells,
    setParams,
    handleInvalidateTopSellsList,
  };
}
