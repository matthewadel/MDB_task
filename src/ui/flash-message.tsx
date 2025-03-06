import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage, { hideMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'react-native-size-matters';

import { FlashMessagesType, IFlashMsg } from '@/types';
import { COLORS, ICONS, Text, TouchableOpacity, VectorIcons } from '@/ui';

const FlashMessageProvider = () => {
  const renderMessagesComponent = (msg: any) => <FlashMsg msg={msg} />;
  return (
    <FlashMessage
      duration={4000}
      animationDuration={500}
      autoHide={true}
      hideOnPress={true}
      position="top"
      MessageComponent={renderMessagesComponent}
    />
  );
};

const FlashMsg = (props: IFlashMsg) => {
  let msg = props.msg;

  const onPressMessage = () => {
    if (msg && msg.message && msg.message.onPress)
      props.msg.message.onPress?.();
    hideMessage();
  };

  let backgroundColor =
    msg.message.type === FlashMessagesType.WARNING
      ? 'orange'
      : msg.message.type === FlashMessagesType.DANGER
        ? '#f00'
        : '#25D366';

  let iconName =
    msg.message.type === FlashMessagesType.WARNING
      ? 'exclamationcircleo'
      : msg.message.type === FlashMessagesType.DANGER
        ? 'closecircleo'
        : 'checkcircleo';

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor }}>
      <TouchableOpacity
        style={{ backgroundColor, ...styles.containerStyle }}
        onPress={onPressMessage}
      >
        <VectorIcons
          icon={ICONS.AntDesign}
          name={iconName}
          size={s(16)}
          color={COLORS.White}
        />

        <Text numberOfLines={0} style={styles.msgText}>
          {msg.message.message}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { FlashMessageProvider, FlashMsg };

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: s(10),
  },
  msgText: {
    color: COLORS.White,
    fontSize: s(16),
    textAlign: 'left',
    paddingHorizontal: s(8),
    marginVertical: s(8),
  },
});
