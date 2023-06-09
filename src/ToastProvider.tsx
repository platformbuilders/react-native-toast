import React, { createContext, useContext, useEffect, useState } from 'react';
import { Toast, ToastConfigProps, ToastProps, ToastType } from './Toast';
import ToastManager from './ToastManager';

export interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastConfigProps;
}

export type ContextType = {
  showError(message: string, title?: string, duration?: number): void;
  showSuccess(message: string, title?: string, duration?: number): void;
  showWarning(message: string, title?: string, duration?: number): void;
  showCustom(message: string, title?: string, duration?: number): void;
};

const ToastContext = createContext<ContextType>({
  showError: () => {},
  showSuccess: () => {},
  showWarning: () => {},
  showCustom: () => {},
});

export const ToastProvider = ({ children, config }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps>({
    title: undefined,
    message: '',
    type: 'success',
    duration: 0,
  });

  const hasMessage =
    toast.message !== '' ||
    toast.message !== null ||
    toast.message !== undefined;

  const defaultToastValues = {
    toastType: 'success',
    duration: 3000,
  };

  const showToast = async (toast: ToastProps) => {
    setToast({
      title: toast.title,
      type: toast.type || (defaultToastValues.toastType as ToastType),
      duration: toast.duration || defaultToastValues.duration,
      message: toast.message,
    });
  };

  const showWarning = (message: string, title?: string, duration?: number) => {
    setToast({
      title,
      message,
      duration,
      type: 'warning',
    });
  };

  const showSuccess = (message: string, title?: string, duration?: number) => {
    setToast({
      title,
      message,
      duration,
      type: 'success',
    });
  };

  const showError = (message: string, title?: string, duration?: number) => {
    setToast({
      title,
      message,
      duration,
      type: 'error',
    });
  };

  const showCustom = (message: string, title?: string, duration?: number) => {
    setToast({
      title,
      message,
      duration,
      type: 'custom',
    });
  };

  useEffect(() => {
    ToastManager.register(showToast);
  }, []);

  return (
    <ToastContext.Provider
      value={{ showWarning, showSuccess, showError, showCustom }}
    >
      {hasMessage && (
        <Toast
          data={{
            title: toast.title,
            message: toast.message,
            type: toast.type,
            duration: toast.duration,
          }}
          config={{
            fontFamily: config?.fontFamily,
            textColor: config?.textColor,
            backgroundColor: {
              success: config?.backgroundColor?.success,
              warning: config?.backgroundColor?.warning,
              error: config?.backgroundColor?.error,
              custom: config?.backgroundColor?.custom,
            },
            autoHide: {
              success: config?.autoHide?.success ?? true,
              warning: config?.autoHide?.warning ?? true,
              error: config?.autoHide?.error ?? true,
              custom: config?.autoHide?.custom ?? true,
            },
            icon: {
              success: {
                icon: config?.icon?.success?.icon,
                width: config?.icon?.success?.width,
                height: config?.icon?.success?.height,
              },
              error: {
                icon: config?.icon?.error?.icon,
                width: config?.icon?.error?.width,
                height: config?.icon?.error?.height,
              },
              warning: {
                icon: config?.icon?.warning?.icon,
                width: config?.icon?.warning?.width,
                height: config?.icon?.warning?.height,
              },
              custom: {
                icon: config?.icon?.custom?.icon,
                width: config?.icon?.custom?.width,
                height: config?.icon?.custom?.height,
              },
            },
            showCloseButton: {
              success: config?.showCloseButton?.success ?? false,
              warning: config?.showCloseButton?.warning ?? false,
              error: config?.showCloseButton?.error ?? false,
              custom: config?.showCloseButton?.custom ?? false,
            },
            showIcon: config?.showIcon,
          }}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
