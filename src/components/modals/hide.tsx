import React, {useEffect} from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

import {Color} from '@app/colors';
import {
  IS_ANDROID,
  LIGHT_BG_1,
  LIGHT_GRAPHIC_GREEN_2,
  LIGHT_TEXT_BASE_3,
} from '@app/variables';

import {Icon, Text} from '../ui';

export const HideModal = () => {
  useEffect(() => {
    if (IS_ANDROID) {
      StatusBar.setBackgroundColor(LIGHT_GRAPHIC_GREEN_2);
      return () => StatusBar.setBackgroundColor(LIGHT_BG_1);
    }
  }, []);
  return (
    <View style={page.container}>
      <Icon i120 name="logo" color={Color.graphicBase3} />
      <Text t2 style={page.text}>
        ISLM Wallet
      </Text>
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
  text: {
    color: LIGHT_TEXT_BASE_3,
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 24,
  },
});
