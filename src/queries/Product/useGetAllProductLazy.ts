import {
  PaginationResponseType,
  TableParams,
  isEmpty,
  responseWrapper,
  useDebounce,
} from '@shared';
import { useMemo, useState } from 'react';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ProductResponse } from './type';
import { ApiKey } from '@queries/keys';
import { ProductApi } from '.';

const search = {
  take: 10,
  skip: 0,
};

export function useGetAllProductLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<ProductResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<TableParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getProductOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<ProductResponse>, Error>(
    [ApiKey.PRODUCT, 'options', debounceSearch, { type: 'lazy' }, params],
    (props): Promise<PaginationResponseType<ProductResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<ProductResponse>>(ProductApi.getProductList, [
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
      enabled: !isEmpty(params),
      ...options,
    },
  );

  const productData: ProductResponse[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce((state, page, _pageIdx) => [...state, ...page.data], []);
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateCategories = () => queryClient.invalidateQueries([ApiKey.PRODUCT]);

  return {
    data,
    productData,
    error,
    hasNext,
    isError,
    loading: isFetching,
    setInputSearch,
    getProductOptions,
    fetchNextPage,
    setParams,
    handleInvalidateCategories,
  };
}
