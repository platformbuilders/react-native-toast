declare module "@platformbuilders/react-native-toast" {
  export interface ToastProviderProps {
    children: React.ReactNode;
    config?: ToastConfigProps;
  }

  export type ToastType = 'success' | 'warning' | 'error' | 'custom';

  export type ContextType = {
    showError(message: string, title?: string, duration?: number): void;
    showSuccess(message: string, title?: string, duration?: number): void;
    showWarning(message: string, title?: string, duration?: number): void;
    showCustom(message: string, title?: string, duration?: number): void;
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
      warning?: string;
      error?: string;
      custom?: string;
    };
    icon: {
      success: {
        icon?: ImageSourcePropType;
        height?: number;
        width?: number;
      };
      warning: {
        icon?: ImageSourcePropType;
        height?: number;
        width?: number;
      };
      error: {
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
      warning: boolean;
      error: boolean;
      custom: boolean;
    };
    showCloseButton: {
      success: boolean;
      warning: boolean;
      error: boolean;
      custom: boolean;
    };
    showIcon?: boolean;
  };

  export function useToast(): ContextType;

  export function ToastProvider({ children, config }: ToastProviderProps): React.JSX.Element

  export function showError(message: string, title?: string, duration?: number): void;
  export function showSuccess(message: string, title?: string, duration?: number): void;
  export function showWarning(message: string, title?: string, duration?: number): void;
  export function showCustom(message: string, title?: string, duration?: number): void;
}
