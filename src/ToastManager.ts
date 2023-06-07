import { ToastProps } from './Toast';

type ToastInstance = {
  showToast: (options: ToastProps) => void;
};

interface IToastManager {
  instance: ToastInstance;
  register(showToast: (options: ToastProps) => void): void;
  showError(message: string, title?: string, duration?: number): void;
  showSuccess(message: string, title?: string, duration?: number): void;
  showWarning(message: string, title?: string, duration?: number): void;
  showCustom(message: string, title?: string, duration?: number): void;
}

class ToastManager implements IToastManager {
  instance: ToastInstance = {
    showToast: () => {},
  };

  register(showToast: (options: ToastProps) => void) {
    this.instance.showToast = showToast;
  }

  showError(message: string, title?: string, duration?: number) {
    this.instance.showToast({
      title,
      message,
      duration,
      type: 'alert',
    });
  }

  showSuccess(message: string, title?: string, duration?: number) {
    this.instance.showToast({
      title,
      message,
      duration,
      type: 'success',
    });
  }

  showWarning(message: string, title?: string, duration?: number) {
    this.instance.showToast({
      title,
      message,
      duration,
      type: 'warning',
    });
  }

  showCustom(message: string, title?: string, duration?: number) {
    this.instance.showToast({
      title,
      message,
      duration,
      type: 'custom',
    });
  }
}

export default new ToastManager();
