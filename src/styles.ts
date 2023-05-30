import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const fontDefault = Platform.OS === 'android' ? 'Roboto' : 'Helvetica';
const fontWeight = Platform.OS === 'android' ? 'bold' : 500;
const handlePaddingTop = (hasTitle: boolean) => (hasTitle ? 12 : 18);

interface ContainerProps {
  backgroundColor: string;
  paddingTop: number;
  hasTitle: boolean;
}

interface TextProps {
  fontFamily?: string;
  textColor?: string;
}

interface IconProps {
  width?: number;
  height?: number;
}

export const Container = styled(Animated.View)<ContainerProps>`
  flex-direction: row;
  position: absolute;
  top: 0;
  z-index: 100;
  elevation: 10;

  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding-top: ${({ paddingTop, hasTitle }) =>
    paddingTop + handlePaddingTop(hasTitle)}px;
  padding-left: 16px;
`;

export const TextContainer = styled.View`
  flex: 1;
  padding-right: 14px;
`;

export const Title = styled.Text<TextProps>`
  font-size: 16px;
  font-weight: ${fontWeight};
  margin-bottom: 12px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
`;

export const Message = styled.Text<TextProps>`
  font-size: 15px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
  margin-bottom: 10px;
`;

export const Icon = styled.Image<IconProps>`
  height: ${({ height }) => height ?? 24}px;
  width: ${({ width }) => width ?? 24}px;
  margin-right: 16px;
`;

export const CloseButton = styled.Pressable.attrs({
  hitSlop: {
    top: 14,
    bottom: 14,
    right: 14,
    left: 14,
  },
})`
  align-self: center;
  padding-right: 16px;
`;

export const CloseText = styled.Text<TextProps>`
  font-size: 13px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
`;
