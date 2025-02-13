import React, {useCallback, useEffect} from 'react';

import {View, useWindowDimensions} from 'react-native';
import Animated, {
  WithTimingConfig,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';
import {ANIMATION_DURATION, ANIMATION_TYPE} from '@app/variables';

const timingOutAnimationConfig: WithTimingConfig = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_TYPE,
};

const timingInAnimationConfig: WithTimingConfig = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_TYPE,
};

interface BottomPopupContainerProps {
  children: (handleClose: (onEnd?: () => void) => void) => JSX.Element;
}

export const BottomPopupContainer = ({children}: BottomPopupContainerProps) => {
  const {height: H} = useWindowDimensions();

  const fullyOpen = 0;
  const fullyClosed = H * 0.85;

  const fadeAnim = useSharedValue(fullyClosed);

  const fadeOut = useCallback(
    (endCallback?: () => void) => {
      const onEnd = () => endCallback?.();
      fadeAnim.value = withTiming(fullyClosed, timingOutAnimationConfig, () =>
        runOnJS(onEnd)(),
      );
    },
    [fullyClosed, fadeAnim],
  );

  useEffect(() => {
    fadeAnim.value = withTiming(fullyOpen, timingInAnimationConfig);
  }, [fadeAnim]);

  const bgAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(fadeAnim.value, [fullyOpen, fullyClosed], [1, 0]),
  }));

  const slideFromBottomAnimation = useAnimatedStyle(() => ({
    transform: [{translateY: fadeAnim.value}],
  }));

  return (
    <View style={page.container}>
      <Animated.View style={[page.animateView, bgAnimation]} />
      <Animated.View style={[page.animateViewFade, slideFromBottomAnimation]}>
        {children(fadeOut)}
      </Animated.View>
    </View>
  );
};

const page = createTheme({
  container: {flex: 1},
  animateView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.bg9,
  },
  animateViewFade: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
