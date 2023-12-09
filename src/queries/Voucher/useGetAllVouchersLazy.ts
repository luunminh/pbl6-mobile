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
import { VoucherResponse } from './type';
import { VoucherApi } from '.';

const search = {
  take: 10,
  skip: 0,
};

export function useGetAllVouchersLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<VoucherResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<TableParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getCategoryOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<VoucherResponse>, Error>(
    [ApiKey.VOUCHER, 'options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<VoucherResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<VoucherResponse>>(VoucherApi.getVoucherList, [
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

  const voucherData: VoucherResponse[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateVouchers = () => queryClient.invalidateQueries([ApiKey.VOUCHER]);

  return {
    data,
    error,
    hasNext,
    isError,
    voucherData,
    loading: isFetching,
    setInputSearch,
    getCategoryOptions,
    fetchNextPage,
    setParams,
    handleInvalidateVouchers,
  };
}
