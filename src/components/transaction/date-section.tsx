import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import {
  COLORS,
  DatePicker,
  ShadowStyle,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import { formatDate } from '@/utils';

interface IDateSection {
  date?: string;
}

const DateSection = forwardRef((props: IDateSection, ref) => {
  const DatePickerRef = useRef<{ openModal: () => void }>(null);
  const [date, setDate] = useState(props.date);

  useImperativeHandle(
    ref,
    () => ({
      getDate: () => date,
    }),
    [date],
  );

  return (
    <Fragment>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>Date</Text>
        <TouchableOpacity
          onPress={() => DatePickerRef.current?.openModal()}
          style={styles.dateButton}
          textStyle={{
            color: date ? COLORS.Dark : COLORS.PlaceholderTextColor,
          }}
        >
          {`${date || 'Choose Date'}`}
        </TouchableOpacity>
      </View>

      <DatePicker
        maximumDate={new Date()}
        onPress={(inputDate: Date) => setDate(formatDate(inputDate))}
        ref={DatePickerRef}
      />
    </Fragment>
  );
});

export { DateSection };

const styles = StyleSheet.create({
  containerStyle: { justifyContent: 'space-evenly', alignItems: 'center' },
  dateButton: {
    paddingHorizontal: s(8),
    fontSize: s(14),
    alignItems: 'left',
    justifyContent: 'center',
    height: vs(35),
    marginTop: vs(8),
    borderRadius: s(6),
    width: '100%',
    ...ShadowStyle,
  },
  dateTitle: { fontWeight: 'bold' },
  dateContainer: { width: '100%', marginTop: vs(20) },
});
