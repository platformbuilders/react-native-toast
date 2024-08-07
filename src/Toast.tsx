/* eslint-disable sonarjs/cognitive-complexity */
import React, { FC, useEffect, useState } from 'react';
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  CloseButton,
  CloseText,
  Container,
  Icon,
  Message,
  TextContainer,
  Title,
} from './styles';

export type PanGestureContextType = {
  translateY: number;
};

export type ToastType = 'success' | 'warning' | 'error' | 'custom';

export type OptionsToast = {
  success?: string;
  warning?: string;
  error?: string;
  custom?: string;
};

export type ToastProps = {
  title?: string | undefined;
  message: string;
  type: ToastType;
  duration?: number;
};

export type ToastConfig = {
  containerStyle?: ViewStyle;
  fontFamily?: string;
  textColor?: OptionsToast | string;
  titleSize?: number;
  messageSize?: number;
  closeButtonText: string;
  backgroundColor?: OptionsToast;
  customIcon: {
    success?: React.ReactElement;
    warning?: React.ReactElement;
    error?: React.ReactElement;
    custom?: React.ReactElement;
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

export type ToastConfigProps = {
  containerStyle?: ViewStyle;
  fontFamily?: string;
  textColor?: OptionsToast | string;
  titleSize?: number;
  messageSize?: number;
  closeButtonText?: string;
  backgroundColor?: OptionsToast;
  customIcon?: {
    success?: React.ReactElement;
    warning?: React.ReactElement;
    error?: React.ReactElement;
    custom?: React.ReactElement;
  };
  icon?: {
    success?: {
      icon: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    warning?: {
      icon: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    error?: {
      icon: ImageSourcePropType;
      height?: number;
      width?: number;
    };
    custom?: {
      icon: ImageSourcePropType;
      height?: number;
      width?: number;
    };
  };
  autoHide?: {
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    custom?: boolean;
  };
  showCloseButton?: {
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    custom?: boolean;
  };
  showIcon?: boolean;
};

type Props = {
  children?: React.ReactNode;
  data: ToastProps;
  config: ToastConfig;
};

export const Toast: FC<Props> = ({ data, config }) => {
  const [toastHeight, setToastHeight] = useState(0);

  const [toast, setToast] = useState<ToastProps>({
    title: undefined,
    message: '',
    type: 'success',
  });

  const isValidToast = !!toast.message?.trim() || toast.title?.trim();

  const showCloseButton = config.showCloseButton[data.type];
  const disabledAutoHide = config.autoHide[data.type];
  const disabledGesture = !disabledAutoHide;

  const handleBackgroundColor = () => {
    const success = '#33c659';
    const warning = '#f0ad4e';
    const error = '#ff726b';
    const custom = '#4794ff';

    if (data.type === 'success')
      return config?.backgroundColor?.success || success;
    if (data.type === 'warning')
      return config?.backgroundColor?.warning || warning;
    if (data.type === 'error') return config?.backgroundColor?.error || error;
    if (data.type === 'custom')
      return config?.backgroundColor?.custom || custom;
    return config?.backgroundColor?.success || success;
  };

  const icon = {
    success: () => ({
      height: config?.icon?.success?.height,
      width: config?.icon?.success?.width,
      icon: config?.icon?.success?.icon,
    }),
    warning: () => ({
      height: config?.icon?.warning?.height,
      width: config?.icon?.warning?.width,
      icon: config?.icon?.warning?.icon,
    }),
    error: () => ({
      height: config?.icon?.error?.height,
      width: config?.icon?.error?.width,
      icon: config?.icon?.error?.icon,
    }),
    custom: () => ({
      height: config?.icon?.custom?.height,
      width: config?.icon?.custom?.width,
      icon: config?.icon?.custom?.icon,
    }),
  };

  const showIcon = !!config?.showIcon && !!icon[toast.type]()?.icon;

  const handleViewLayout = (event: LayoutChangeEvent) => {
    setToastHeight(event.nativeEvent.layout.height);
  };

  const transitionY = useSharedValue(0);

  const toastAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: transitionY.value }],
  }));

  useEffect(() => {
    if (toastHeight !== 0) {
      transitionY.value = -toastHeight;
    }
  }, [toastHeight]);

  let timeout: ReturnType<typeof setTimeout>;

  const resetTimeout = () => clearTimeout(timeout);

  const resetToastValues = () => {
    setToast({
      title: undefined,
      message: '',
      type: 'success',
    });
  };

  const dismissToast = () => {
    const callback = () => {
      resetToastValues();
      resetTimeout();
    };

    transitionY.value = withTiming(
      -toastHeight,
      {
        duration: 250,
        easing: Easing.out(Easing.ease),
      },
      (isFinished) => isFinished && runOnJS(callback)(),
    );
  };

  const showToast = () => {
    transitionY.value = withSpring(0, {
      damping: 20,
      stiffness: 120,
    });
  };

  const handleDismiss = () => {
    if (disabledAutoHide) {
      timeout = setTimeout(() => dismissToast(), data.duration);
      return () => resetTimeout();
    }

    return () => {};
  };

  const handleAnimation = () => {
    showToast();
    handleDismiss();
  };

  useEffect(() => {
    if (isValidToast) handleAnimation();
  }, [toast.message, toast.title, toastHeight]);

  useEffect(() => {
    if (data.message || data.title) {
      setToast({
        title: data.title,
        message: data.message,
        type: data.type,
      });
    }
  }, [data]);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContextType
  >({
    onStart: (_, context) => {
      context.translateY = transitionY.value;
    },
    onActive: (event, context) => {
      const clamp = (value: number, lowerBound: number, upperBound: number) => {
        return Math.min(Math.max(lowerBound, value), upperBound);
      };

      if (disabledGesture) return;

      transitionY.value = clamp(
        event.translationY + context.translateY,
        -toastHeight,
        0,
      );
    },
    onEnd: () => {
      if (disabledGesture) return;
      runOnJS(dismissToast)();
    },
  });

  return isValidToast ? (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Container
        onLayout={handleViewLayout}
        backgroundColor={handleBackgroundColor()}
        style={[config.containerStyle, toastAnimatedStyle]}
      >
        {showIcon && icon[toast.type]().icon && (
          <Icon
            source={icon[toast.type]().icon!}
            width={icon[toast.type]().width}
            height={icon[toast.type]().height}
          />
        )}

        {config?.showIcon &&
          !!config?.customIcon[toast.type] &&
          config?.customIcon[toast.type]}

        <TextContainer>
          {!!data.title?.trim() && (
            <Title
              fontFamily={config?.fontFamily}
              textColor={
                typeof config?.textColor === 'string'
                  ? config?.textColor
                  : config?.textColor?.[data.type]
              }
              size={config?.titleSize}
            >
              {data.title?.trim()}
            </Title>
          )}

          {data.message?.trim() && (
            <Message
              fontFamily={config?.fontFamily}
              textColor={
                typeof config?.textColor === 'string'
                  ? config?.textColor
                  : config?.textColor?.[data.type]
              }
              size={config?.messageSize}
            >
              {data.message?.trim()}
            </Message>
          )}
        </TextContainer>

        {showCloseButton && (
          <CloseButton onPress={dismissToast}>
            <CloseText
              fontFamily={config?.fontFamily}
              textColor={
                typeof config?.textColor === 'string'
                  ? config?.textColor
                  : config?.textColor?.[data.type]
              }
            >
              {config.closeButtonText?.trim()}
            </CloseText>
          </CloseButton>
        )}
      </Container>
    </PanGestureHandler>
  ) : null;
};
