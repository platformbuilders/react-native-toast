import type { ImageSourcePropType } from 'react-native';

declare type ToastType = 'success' | 'alert' | 'warning' | 'custom';

declare type PanGestureContextType = {
  translateY: number;
}

declare type ToastConfig = {
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: {
    success?: string;
    alert?: string;
    warning?: string;
    custom?: string;
  };
  icon: {
    success: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    alert: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    warning: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    custom: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
  };
  autoHide: {
    success: boolean;
    alert: boolean;
    warning: boolean;
    custom: boolean;
  };
  showCloseButton: {
    success: boolean;
    alert: boolean;
    warning: boolean;
    custom: boolean;
  };
  showIcon?: boolean;
}

declare type ToastProps = {
  title?: string | undefined;
  message: string;
  type: ToastType;
  duration?: number;
}

declare type ToastConfigProps = {
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: {
    success?: string;
    alert?: string;
    warning?: string;
    custom?: string;
  };
  icon?: {
    success?: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    alert?: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    warning?: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    custom?: {
      icon?: ImageSourcePropType;
      height?: number;
      width?: number;
    };
  };
  autoHide?: {
    success?: boolean;
    alert?: boolean;
    warning?: boolean;
    custom?: boolean;
  };
  showCloseButton?: {
    success?: boolean;
    alert?: boolean;
    warning?: boolean;
    custom?: boolean;
  };
  showIcon?: boolean;
}

declare type ContextType = {
  showToast(data: ToastProps): void;
}

declare interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastConfigProps;
}
