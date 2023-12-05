import { ApiResponseType, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductResponse } from './type';
import { ApiKey } from '@queries/keys';
import { ProductApi } from '.';

export function useGetProductById(
  options?: UseQueryOptions<ApiResponseType<ProductResponse>, Error, ProductResponse> & {
    id?: string;
  },
) {
  const {
    data: productData,
    error,
    isError,
    isFetching: isLoadingProduct,
    refetch: onGetProduct,
  } = useQuery<ApiResponseType<ProductResponse>, Error, ProductResponse>(
    [ApiKey.PRODUCT, { id: options?.id }],
    {
      queryFn: (query) => {
        const [_, ...params] = query.queryKey;
        return responseWrapper<ApiResponseType<ProductResponse>>(ProductApi.getProductById, params);
      },
      enabled: !!options?.id,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateProduct = (id: string) =>
    queryClient.invalidateQueries([ApiKey.PRODUCT, { id }]);

  return {
    productData,
    error,
    isError,
    isLoadingProduct,
    onGetProduct,
    handleInvalidateProduct,
  };
}
