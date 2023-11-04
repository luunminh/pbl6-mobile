import { ImagePickerAsset } from 'expo-image-picker/build/ImagePicker.types';

export interface UploadFilePayload {
  file: File;
}

export type UploadAvatarResponse = {
  url: string;
};
