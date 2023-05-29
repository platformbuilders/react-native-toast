import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { moderateScale } from '@platformbuilders/helpers/native';

const fontDefault = Platform.OS === 'android' ? 'Roboto' : 'Helvetica';
const fontWeight = Platform.OS === 'android' ? 'bold' : 500;

interface ContainerProps {
  backgroundColor: string;
  paddingTop: number;
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
  padding-top: ${({ paddingTop }) => paddingTop + moderateScale(4)}px;
  padding-left: ${moderateScale(14)}px;
`;

export const TextContainer = styled.View`
  flex: 1;
  padding-right: ${moderateScale(12)}px;
`;

export const Title = styled.Text<TextProps>`
  font-size: ${moderateScale(16)}px;
  font-weight: ${fontWeight};
  margin-bottom: ${moderateScale(10)}px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
`;

export const Message = styled.Text<TextProps>`
  font-size: ${moderateScale(14)}px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
  margin-bottom: ${moderateScale(10)}px;
`;

export const Icon = styled.Image<IconProps>`
  height: ${({ height }) => height ?? moderateScale(25)}px;
  width: ${({ width }) => width ?? moderateScale(25)}px;
  margin-right: ${moderateScale(14)}px;
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
  padding-right: ${moderateScale(16)}px;
`;

export const CloseText = styled.Text<TextProps>`
  font-size: ${moderateScale(12)}px;
  font-family: ${({ fontFamily }) => fontFamily ?? fontDefault};
  color: ${({ textColor }) => textColor ?? '#fff'};
`;
