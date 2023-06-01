import React, { FC, useEffect, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent } from 'react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CloseButton,
  CloseText,
  Container,
  Icon,
  Message,
  TextContainer,
  Title,
} from './styles';

export type ToastType = 'success' | 'alert' | 'warning' | 'custom';

type ToastConfig = {
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

export type ToastProps = {
  title?: string | undefined;
  message: string;
  type: ToastType;
  duration?: number;
};

type Props = {
  children?: React.ReactNode;
  data: ToastProps;
  config: ToastConfig;
};

type PanGestureContextType = {
  translateY: number;
};

/**
 *
 * @typedef {ToastProps} - Parâmetros do toast
 *
 * @example
 * const { showToast } = useToast();
 * showToast({
 * title: 'Sucesso',
 * message: 'Toast de notificação de sucesso',
 * type: 'success',
 *});
 */
export const Toast: FC<Props> = ({ data, config }) => {
  const insets = useSafeAreaInsets();

  const [toastHeight, setToastHeight] = useState(0);
  const [toast, setToast] = useState<ToastProps>({
    title: undefined,
    message: '',
    type: 'success',
  });

  const showCloseButton = config.showCloseButton[data.type];
  const disabledAutoHide = config.autoHide[data.type];
  const disabledGesture = !disabledAutoHide;
  const hasTitle = !!data.title;

  const handleBackgroundColor = () => {
    const success = '#22bb33';
    const alert = '#f0ad4e';
    const warning = '#bb2124';
    const custom = '#000';

    if (data.type === 'success')
      return config?.backgroundColor?.success || success;
    if (data.type === 'alert') return config?.backgroundColor?.alert || alert;
    if (data.type === 'warning')
      return config?.backgroundColor?.warning || warning;
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
    alert: () => ({
      height: config?.icon?.alert?.height,
      width: config?.icon?.alert?.width,
      icon: config?.icon?.alert?.icon,
    }),
    warning: () => ({
      height: config?.icon?.warning?.height,
      width: config?.icon?.warning?.width,
      icon: config?.icon?.warning?.icon,
    }),
    custom: () => ({
      height: config?.icon?.custom?.height,
      width: config?.icon?.custom?.width,
      icon: config?.icon?.custom?.icon,
    }),
  };

  const showIcon = !!icon[toast.type]()?.icon;

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

  const resetToastValues = () => {
    setToast({
      title: undefined,
      message: '',
      type: 'success',
    });
  };

  const dismissToast = () => {
    const callback = () => resetToastValues();

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
      const timeout = setTimeout(() => dismissToast(), data.duration);
      return () => clearTimeout(timeout);
    }

    return () => {};
  };

  const handleAnimation = () => {
    showToast();

    handleDismiss();
  };

  useEffect(() => {
    if (!!toast.message) handleAnimation();
  }, [toast.message, toastHeight]);

  useEffect(() => {
    if (!!data.message?.length) {
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

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Container
        onLayout={handleViewLayout}
        backgroundColor={handleBackgroundColor()}
        paddingTop={insets.top}
        hasTitle={hasTitle}
        style={toastAnimatedStyle}
      >
        {showIcon && (
          <Icon
            source={icon[toast.type]().icon!}
            width={icon[toast.type]().width}
            height={icon[toast.type]().height}
          />
        )}
        <TextContainer>
          {!!data.title && (
            <Title
              fontFamily={config?.fontFamily}
              textColor={config?.textColor}
            >
              {data.title}
            </Title>
          )}
          <Message
            fontFamily={config?.fontFamily}
            textColor={config?.textColor}
          >
            {data?.message}
          </Message>
        </TextContainer>
        {showCloseButton && (
          <CloseButton onPress={dismissToast}>
            <CloseText
              fontFamily={config?.fontFamily}
              textColor={config?.textColor}
            >
              Fechar
            </CloseText>
          </CloseButton>
        )}
      </Container>
    </PanGestureHandler>
  );
};