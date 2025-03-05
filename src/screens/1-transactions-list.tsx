import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Image, NoData, ScreenContainer } from '@/ui';

const TransactionList = () => {
  return (
    <ScreenContainer screenHeaderProps={{ title: 'Transaction List' }}>
      <NoData />
      <Image
        openImage
        style={{ height: 300 }}
        source={{
          uri: 'https://onetreeplanted.org/cdn/shop/articles/nature_facts_1788x.jpg?v=1705008496',
        }}
      />

      <AntDesign name="stepforward" style={{ borderWidth: 2 }} />
    </ScreenContainer>
  );
};

export { TransactionList };
