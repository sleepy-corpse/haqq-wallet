import React, {useEffect} from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

import {
  IS_ANDROID,
  LIGHT_BG_1,
  LIGHT_GRAPHIC_GREEN_2,
  LIGHT_TEXT_BASE_3,
} from '@app/variables';

import {Text, Waiting} from '../ui';

export type LoadingModalProps = {
  text?: string;
};
export const LoadingModal = ({text}: LoadingModalProps) => {
  useEffect(() => {
    if (IS_ANDROID) {
      StatusBar.setBackgroundColor(LIGHT_GRAPHIC_GREEN_2);
      return () => StatusBar.setBackgroundColor(LIGHT_BG_1);
    }
  }, []);
  return (
    <View style={page.container}>
      <Waiting style={page.waiting} />
      {text && (
        <Text t4 style={page.text}>
          {text}
        </Text>
      )}
    </View>
  );
};

const page = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: LIGHT_GRAPHIC_GREEN_2,
  },
  text: {color: LIGHT_TEXT_BASE_3, width: 230, textAlign: 'center'},
  waiting: {marginBottom: 40},
});
