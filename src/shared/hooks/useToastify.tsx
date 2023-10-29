import { ColorCode } from '@appConfig/theme';
import { useToast } from 'native-base';
import { Box, Text } from 'native-base';

function useToastify() {
  const toast = useToast();

  const showSuccess = (msg: string) => {
    toast.show({
      render: (): React.ReactNode => {
        return (
          <Box p={4} bgColor={ColorCode.SUCCESS} borderRadius={12}>
            <Text fontWeight={700} color={ColorCode.WHITE}>
              {msg}
            </Text>
          </Box>
        );
      },
    });
  };

  const showError = (msg: string) => {
    toast.show({
      render: (): React.ReactNode => {
        return (
          <Box p={4} bgColor={ColorCode.DANGER} borderRadius={12}>
            <Text fontWeight={700} color={ColorCode.WHITE}>
              {msg}
            </Text>
          </Box>
        );
      },
    });
  };

  const showInfo = (msg: string) => {
    toast.show({
      render: (): React.ReactNode => {
        return (
          <Box p={4} bgColor={ColorCode.INFO} borderRadius={12}>
            <Text fontWeight={700} color={ColorCode.WHITE}>
              {msg}
            </Text>
          </Box>
        );
      },
    });
  };

  return { showSuccess, showInfo, showError };
}

export default useToastify;
