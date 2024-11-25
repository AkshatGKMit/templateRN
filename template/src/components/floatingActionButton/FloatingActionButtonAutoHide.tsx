import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  LayoutChangeEvent,
  Pressable,
  TouchableWithoutFeedback,
  PixelRatio,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from '@components/icon';
import {
  ComponentsConstants,
  defaultLayout,
  FabAppearance,
  FabBorderRadius,
  FabSize,
  IconFamily,
} from '@constants';
import { Animation } from '@utility/helpers';
import ThemeContext from '@config/ThemeContext';
import FloatingActionButton from './FloatingActionButton';
import useScalingMetrics from '@config/useScalingMetrics';

const FloatingActionButtonAutoHide = (props: FloatingActionButtonAutoHideProps) => {
  const { dp } = useScalingMetrics();

  const { theme } = useContext(ThemeContext);
  const layoutDimensionsRef = useRef<ObjectLayout>(defaultLayout);

  const animateFAB = Animation.newValue(0);

  const { visible, visibleDuration = 500 } = props;

  const _onLayoutChange = useCallback((e: LayoutChangeEvent) => {
    const { height: h, width: w, x, y } = e.nativeEvent.layout;

    const newLayout = {
      height: Math.floor(h),
      width: Math.floor(w),
      top: Math.floor(y),
      left: Math.floor(x),
      bottom: Math.floor(y + h),
      right: Math.floor(x + w),
    };

    layoutDimensionsRef.current = newLayout;
  }, []);

  const animate = () => {
    Animation.timing(animateFAB, visible ? 0 : 1, visibleDuration).start();
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        animate();
      }, 3000);
    } else {
      animate();
    }
  }, []);

  const { marginFromScreen } = ComponentsConstants.fab;

  return (
    <FloatingActionButton
      {...props}
      onLayout={_onLayoutChange}
      style={{
        transform: [
          // {
          //   translateX: animateFAB.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [0, dp(marginFromScreen) + layoutDimensionsRef.current.width],
          //   }),
          // },
          {
            rotate: animateFAB.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    />
  );
};

export default FloatingActionButtonAutoHide;
