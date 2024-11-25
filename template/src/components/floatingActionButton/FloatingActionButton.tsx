import { View, Text, Animated, TouchableWithoutFeedback, PixelRatio } from 'react-native';
import React, { useContext } from 'react';
import useScalingMetrics from '@config/useScalingMetrics';
import ThemeContext from '@config/ThemeContext';
import { ComponentsConstants, FabBorderRadius, FabSize } from '@constants';
import Icon from '@components/icon';
import { GlobalThemedStyles } from '@themes/globalStyles';

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { dp } = useScalingMetrics();

  const { theme } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles();

  const { marginFromScreen } = ComponentsConstants.fab;

  const {
    icon,
    onPress,
    zIndex,
    style,
    onLayout,
    iconColor = theme.colors.text,
    borderRadius = FabBorderRadius.auto,
    size = dp(FabSize.normal),
    backgroundColor = theme.colors.primary,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        onLayout={onLayout}
        style={[
          style,
          globalStyles.columnCenter,
          {
            position: 'absolute',
            zIndex,
            bottom: 0,
            right: 0,
            margin: dp(marginFromScreen),
            height: dp(size),
            width: dp(size),
            backgroundColor,
            borderRadius,
            padding: 2,
            shadowColor: theme.colors.inverted.main,
            shadowOffset: {
              height: 1,
              width: 1,
            },
            shadowRadius: 3,
            shadowOpacity: 0.5,
            elevation: 4,
          },
        ]}
      >
        <Icon
          {...icon}
          style={{ color: iconColor, fontSize: dp(40), transform: [] }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FloatingActionButton;
