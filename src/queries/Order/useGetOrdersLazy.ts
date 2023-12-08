import {
  PaginationResponseType,
  TableParams,
  isEmpty,
  responseWrapper,
  useDebounce,
} from '@shared';
import { useMemo, useState } from 'react';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { ApiKey } from '@queries/keys';
import { GetOrdersResponse } from './type';
import { OrderApi } from '.';

const search = {
  take: 10,
  skip: 0,
};

export function useGetOrdersLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<GetOrdersResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<TableParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getOrderOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<GetOrdersResponse>, Error>(
    [ApiKey.STORE, 'options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<GetOrdersResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<GetOrdersResponse>>(OrderApi.getOrders, [
        { ...pageParam, ...params, search: inputSearch },
      ]);
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        if (lastPage.data?.length < 10) return undefined;
        return {
          take: 10,
          skip: allPages.length * 10,
        };
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!params,
      ...options,
    },
  );

  const orderData: GetOrdersResponse[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateOrders = () => queryClient.invalidateQueries([ApiKey.STORE]);

  return {
    data,
    orderData,
    error,
    hasNext,
    isError,
    loading: isFetching,
    setInputSearch,
    getOrderOptions,
    fetchNextPage,
    setParams,
    handleInvalidateOrders,
  };
}
