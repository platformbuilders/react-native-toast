import React, { createContext, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Toast, ToastProps } from '.';

export type ToastConfigProps = {
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
};

type ContextType = {
  showToast(data: ToastProps): void;
};

interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastConfigProps;
}

const ToastContext = createContext<ContextType>({
  showToast: () => {},
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
      type: toast.type || defaultToastValues.toastType,
      duration: toast.duration || defaultToastValues.duration,
      message: toast.message,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
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
              alert: config?.backgroundColor?.alert,
              warning: config?.backgroundColor?.warning,
              custom: config?.backgroundColor?.custom,
            },
            autoHide: {
              success: config?.autoHide?.success ?? true,
              alert: config?.autoHide?.alert ?? true,
              warning: config?.autoHide?.warning ?? true,
              custom: config?.autoHide?.custom ?? true,
            },
            icon: {
              success: {
                icon: config?.icon?.success?.icon,
                width: config?.icon?.success?.width,
                height: config?.icon?.success?.height,
              },
              warning: {
                icon: config?.icon?.warning?.icon,
                width: config?.icon?.warning?.width,
                height: config?.icon?.warning?.height,
              },
              alert: {
                icon: config?.icon?.alert?.icon,
                width: config?.icon?.alert?.width,
                height: config?.icon?.alert?.height,
              },
              custom: {
                icon: config?.icon?.custom?.icon,
                width: config?.icon?.custom?.width,
                height: config?.icon?.custom?.height,
              },
            },
            showCloseButton: {
              success: config?.showCloseButton?.success ?? false,
              alert: config?.showCloseButton?.alert ?? false,
              warning: config?.showCloseButton?.warning ?? false,
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
