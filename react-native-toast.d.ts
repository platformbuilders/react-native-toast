declare module "@platformbuilders/react-native-toast" {
  export interface ToastProviderProps {
    children: React.ReactNode;
    config?: ToastConfigProps;
  }

  export type ToastType = import('./src/Toast').ToastType;

  export type ContextType = import('./src/ToastProvider').ContextType;

  export type ToastProps = import('./src/Toast').ToastProps;

  export type PanGestureContextType = import('./src/Toast').PanGestureContextType;

  export type ToastConfig = import('./src/Toast').ToastConfig;

  export function useToast(): ContextType;
}
