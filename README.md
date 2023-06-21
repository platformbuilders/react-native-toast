![check](https://github.com/platformbuilders/react-native-toast/actions/workflows/check.yml/badge.svg)
[![MIT][license-badge]][license]

[license-badge]: https://img.shields.io/dub/l/vibe-d.svg
[license]: https://raw.githubusercontent.com/platformbuilders/react-native-toast/master/LICENSE.md

# @platformbuilders/react-native-toast

## Install

```
yarn add @platformbuilders/react-native-toast
```

## Usage

### Configure Provider

```typescript
import { ToastProvider } from '@platformbuilders/react-native-toast';
import { iconSuccess, iconWarning, iconError, iconCustom } from '~/assets/images';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const { ui } = useStores();

  const toastConfig = {
    backgroundColor: {
      success: ui?.theme?.success.main as unknown as string,
      info: ui?.theme?.info.main as unknown as string,
      warning: ui?.theme?.warning.main as unknown as string,
      danger: ui?.theme?.danger.main as unknown as string,
    },
    icon?: {
      success?: {
        icon?: iconSuccess,
        height?: 24,
        width?: 24,
      },
      warning?: {
        icon?: iconWarning,
        height?: 24,
        width?: 24,
      },
      error?: {
        icon?: iconError,
        height?: 24,
        width?: 24,
      },
      custom?: {
        icon?: iconCustom,
        height?: 24,
        width?: 24,
      },
    },
    autoHide: {
      custom: false,
    },
    showCloseButton: {
      custom: true,
    },
    showIcon: true,
  };

  return (<ToastProvider config={toastConfig}>{children}<ToastProvider>);
};
```

### Usage with Hook useToast

```typescript
import { useEffect } from 'react';
import { useToast } from '@platformbuilders/react-native-toast';

const FunctionalComponent = () => {
  const { showSuccess } = useToast();

  useEffect(() => {
    showSuccess('Example message', 'Example Title', duration: 4000);
  }, []);

  return null;
};
```

### Outside Functional Component

```typescript
import { showSuccess } from '@platformbuilders/react-native-toast';
import { ERRORS } from '~/utils';

export const onExpiredToken = (): void => {
  showError(ERRORS.SESSION_EXPIRED);
};
```
