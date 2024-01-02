import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { ApiResponseType, Callback, responseWrapper } from '@shared';
import { TopSaleResponse } from './type';
import { ProductApi } from '.';

export function useGetProductTopSale(
  options?: UseQueryOptions<ApiResponseType<TopSaleResponse[]>, Error, TopSaleResponse[]> & {
    storeId?: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetCartList: QueryFunction<ApiResponseType<TopSaleResponse[]>> = () =>
    responseWrapper<ApiResponseType<TopSaleResponse[]>>(ProductApi.getProductTopSale, [
      options?.storeId,
    ]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<TopSaleResponse[]>, Error, TopSaleResponse[]>(
    [ApiKey.TOP_SALE, options?.storeId],
    {
      queryFn: handleGetCartList,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: true,
      ...options,
    },
  );

  useEffect(() => {
    if (data && isSuccess) {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const queryClient = useQueryClient();

  const handleInvalidateProducts = () => queryClient.invalidateQueries([ApiKey.TOP_SALE]);

  return {
    topSale: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateProducts,
  };
}
