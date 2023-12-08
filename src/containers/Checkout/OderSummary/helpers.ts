import { VoucherResponse, VoucherType } from '@queries';
import { isEmpty } from '@shared';

export const getDiscount = (voucher: VoucherResponse, subTotal: number): number => {
  if (!isEmpty(voucher)) {
    if (voucher.type === VoucherType.FIXED) {
      return voucher.discountValue;
    } else {
      return (voucher.discountValue * subTotal) / 100;
    }
  } else {
    return 0;
  }
};
