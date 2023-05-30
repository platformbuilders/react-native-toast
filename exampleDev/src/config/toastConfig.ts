import {ToastConfigProps} from '@platformbuilders/react-native-toast/ToastProvider';

import check from '../assets/check.png';

export const toastConfig: ToastConfigProps = {
  backgroundColor: {
    custom: '#000',
  },
  icon: {
    custom: {
      icon: check,
      height: 22,
      width: 22,
    },
  },
  autoHide: {
    custom: false,
  },
  showCloseButton: {
    custom: true,
  },
  showIcon: true,

}
