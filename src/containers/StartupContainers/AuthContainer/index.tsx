import { UserRole } from '@queries';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { setAuthenticated, setCurrentRole, setProfile } from '@redux/auth/authSlice';
import { IRootState } from '@redux/store';
import { AuthService } from '@shared';
import { useToastify } from '@shared/hooks';
import { Box, useToast } from 'native-base';
import { connect, useDispatch } from 'react-redux';
const AuthContainer: React.FC<Props> = ({
  isAuthenticated,
  onSetAuth,
  onSetCurrentRole,
  onSetProfile,
}) => {
  const dispatch = useDispatch();
  const { showError } = useToastify();

  const { profile } = useGetProfile({
    onSuccessCallback: (data) => {
      dispatch(setProfile(profile));
      dispatch(setAuthenticated(true));
      dispatch(
        onSetCurrentRole(profile.userRoles.find((role) => role.roleId === UserRole.USER)?.roleId),
      );
    },
    onErrorCallback: (error) => {
      isAuthenticated !== null && showError('Fail to login, please try again!');
      clearAuth();
    },
  });

  const clearAuth = () => {
    dispatch(setAuthenticated(false));
    dispatch(onSetCurrentRole(null));
    dispatch(setProfile(null));
    AuthService.clearToken();
  };

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
  onSetCurrentRole: setCurrentRole,
  onSetProfile: setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
