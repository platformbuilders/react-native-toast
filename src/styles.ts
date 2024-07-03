import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const fontDefault = Platform.OS === 'android' ? 'Roboto' : 'Helvetica';
const fontWeight = Platform.OS === 'android' ? 'bold' : 500;

interface ContainerProps {
  backgroundColor: string;
}

interface TextProps {
  fontFamily?: string;
  textColor?: string;
  size?: number;
}

interface IconProps {
  width?: number;
  height?: number;
}

export const Container = styled(Animated.View)<ContainerProps>`
  width: 95%;
  min-height: 100px;
  position: absolute;
  top: 20px;
  z-index: 100;
  elevation: 10;

  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: row;
  padding: 8px;
  border-radius: 10px;
  align-self: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  padding-right: 8px;
  padding-left: 8px;
`;

export const Title = styled.Text<TextProps>`
  font-size: ${({ size }) => size ?? 20}px;
  font-weight: ${fontWeight};
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
  margin-bottom: 12px;
`;

export const Message = styled.Text<TextProps>`
  font-size: ${({ size }) => size ?? 18}px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
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
  max-width: 120px;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const CloseText = styled.Text<TextProps>`
  font-size: 18px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
`;
