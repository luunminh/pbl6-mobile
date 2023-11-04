import profileApi from './profileApi';

export * from './type';
export * from './useChangePassword';
export * from './useUpdateProfile';
export * from './useRequestChangePassword';
export * from './useGetProfile';

export const ProfileApi = profileApi.create();
