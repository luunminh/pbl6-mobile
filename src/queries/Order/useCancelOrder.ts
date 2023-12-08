import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { CancelOrderPayload } from './type';
import { OrderApi } from '.';
// < return Data, Error, Payload Type, Context Types >
export function useCancelOrder(options?: UseMutationOptions<any, Error, CancelOrderPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, CancelOrderPayload>({
    mutationFn: (payload: CancelOrderPayload) => responseWrapper(OrderApi.cancelOrder, [payload]),
    ...options,
  });

  return {
    cancelOrder: mutate,
    isLoading,
  };
}
