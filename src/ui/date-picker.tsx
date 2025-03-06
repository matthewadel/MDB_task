import React, { useImperativeHandle, useState } from 'react';
import { Modal, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
// import Modal from 'react-native-modal';
import { s } from 'react-native-size-matters';

import { COLORS, ShadowStyle, TouchableOpacity, View } from '@/ui';

interface DatePickerProps {
  onPress: Function;
  selectedDate?: string;
  maximumDate?: Date;
}

export const DatePicker = React.forwardRef((props: DatePickerProps, ref) => {
  const [showModal, setShowModal] = useState(false);
  const { width: WIDTH } = useWindowDimensions();

  const [selectedDate, setSelectedDate] = useState(
    (props?.selectedDate && new Date(props?.selectedDate)) || new Date(),
  );

  const closeModal = () => setShowModal(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setShowModal(true),
    }),
    [],
  );

  return (
    // <Modal
    //   isVisible={showModal}
    //   onBackdropPress={closeModal}
    //   onBackButtonPress={closeModal}
    //   useNativeDriver
    //   onModalWillHide={closeModal}
    //   propagateSwipe={true}
    //   animationIn="slideInUp"
    //   animationOut="slideOutDown"
    //   swipeDirection={'down'}
    // >
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeModal}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              closeModal();
              props.onPress(selectedDate);
            }}
          >
            OK
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton} onPress={closeModal}>
            Cancel
          </TouchableOpacity>
        </View>

        {Platform.OS === 'ios' ? (
          <RNDatePicker
            maximumDate={props?.maximumDate}
            locale="en"
            modal
            open
            date={selectedDate}
            onConfirm={(date) => {
              props.onPress(date);
              setSelectedDate(date);
              closeModal();
            }}
            onCancel={() => {
              closeModal();
            }}
            mode="date"
            style={{ width: WIDTH, ...styles.datePicker }}
          />
        ) : (
          <RNDatePicker
            maximumDate={props?.maximumDate}
            locale="en"
            date={selectedDate}
            // textColor="#000"
            onDateChange={(dateOfbirth) => setSelectedDate(dateOfbirth)}
            mode="date"
            style={{ width: WIDTH, ...styles.datePicker }}
          />
        )}
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalStyle: {
    justifyContent: 'flex-end',
  },
  header: {
    zIndex: 100,
    width: '100%',
    paddingHorizontal: '3%',
    height: s(35),
    borderBottomWidth: 1,
    backgroundColor: COLORS.White,
    borderColor: COLORS.Dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...ShadowStyle,
  },
  headerButton: {
    height: '100%',
    paddingHorizontal: s(15),
  },
  datePicker: {
    backgroundColor: COLORS.White,
    margin: 0,
    padding: 0,
  },
});
