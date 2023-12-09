import { ColorCode } from '@appConfig/theme';
import { Chip } from '@components';
import { OrderStatus } from '@queries';

export const renderOrderCardStatus = (status) => {
  switch (String(status)) {
    case OrderStatus.CONFIRMED:
      return <Chip title="Confirmed" color={ColorCode.SUCCESS} bgColor={ColorCode.SUCCESS_BG} />;
    case OrderStatus.PENDING_CONFIRM:
      return <Chip title="Pending" color={ColorCode.WARNING} bgColor={ColorCode.WARNING_BG} />;
    case OrderStatus.CANCELED:
      return <Chip title="Cancelled" color={ColorCode.DANGER} bgColor={ColorCode.DANGER_BG} />;
    default:
      return <Chip title="Confirmed" color={ColorCode.SUCCESS} bgColor={ColorCode.SUCCESS_BG} />;
  }
};
