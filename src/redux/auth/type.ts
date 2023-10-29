import { UserProfileType, UserRole } from '@queries';
import { boolean } from 'yup';

export interface IAuthState {
  isAuthenticated?: boolean;
  user: UserProfileType;
  currentRole: UserRole;
  isLoggingOut: boolean;
}

export const initialState: IAuthState = {
  isAuthenticated: null,
  user: null,
  currentRole: null,
  isLoggingOut: false,
};
