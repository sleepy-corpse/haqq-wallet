import React, {useCallback} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {TransactionAddress} from '../components/transaction-address';

type TransactionAddressScreenProp = CompositeScreenProps<any, any>;

export const TransactionAddressScreen = ({
  route,
  navigation,
}: TransactionAddressScreenProp) => {
  const onDone = useCallback(
    (address: string) => {
      navigation.navigate('transactionSum', {
        from: route.params.from,
        to: address,
      });
    },
    [navigation, route],
  );

  return <TransactionAddress initial={route.params.to} onAddress={onDone} />;
};
