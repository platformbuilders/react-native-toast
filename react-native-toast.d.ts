declare module "@platformbuilders/react-native-toast" {
  export interface ToastProviderProps {
    children: React.ReactNode;
    config?: ToastConfigProps;
  }

  export type ToastType = 'success' | 'alert' | 'warning' | 'custom';

  export type ContextType = {
    showToast(data: ToastProps): void;
  };

  export type ToastProps = {
    title?: string | undefined;
    message: string;
    type: ToastType;
    duration?: number;
  };

  export type PanGestureContextType = {
    translateY: number;
  };

  export type ToastConfig = {
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
  };

  export function useToast(): ContextType;

  export function ToastProvider({ children, config }: ToastProviderProps): React.JSX.Element
}
