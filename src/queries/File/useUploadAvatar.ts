import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { FileApi, UploadFilePayload, UploadAvatarResponse } from '.';
import { ApiResponseType, responseWrapper } from '@shared';

// < return Data, Error, Payload Type, Context Types >
export function useUploadAvatar(
  options?: UseMutationOptions<ApiResponseType<UploadAvatarResponse>, Error, UploadFilePayload>,
) {
  const { mutate, isLoading, isSuccess } = useMutation<
    ApiResponseType<UploadAvatarResponse>,
    Error,
    UploadFilePayload
  >({
    mutationFn: async (payload: UploadFilePayload) => {
      return responseWrapper(FileApi.uploadAvatar, [payload]);
    },
    ...options,
  });

  return {
    uploadAvatar: mutate,
    isLoading,
    isSuccess,
  };
}
