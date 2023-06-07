import ToastManagerInstance from './ToastManager';

const showSuccess = ToastManagerInstance.showSuccess;
const showError = ToastManagerInstance.showError;
const showCustom = ToastManagerInstance.showError;
const showWarning = ToastManagerInstance.showWarning;

export * from './Toast';
export * from './ToastProvider';

export { showSuccess, showError, showCustom, showWarning };
