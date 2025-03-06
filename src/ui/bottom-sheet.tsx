import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';

interface BottomSheetProps {
  children: React.ReactNode;
}

const BottomSheet = forwardRef<RNBottomSheet, BottomSheetProps>(
  (props, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => [1, '35%'], []);

    const renderBackdrop = useCallback(
      (inputProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...inputProps}
          // disappearsOnIndex={1}
          // appearsOnIndex={2}
          pressBehavior={'close'}
        />
      ),
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        present: () => bottomSheetModalRef.current?.present(),
        dismiss: () => bottomSheetModalRef.current?.dismiss(),
        snapToIndex: (index: number) =>
          bottomSheetModalRef.current?.snapToIndex(index),
        snapToPosition: (position: string | number) =>
          bottomSheetModalRef.current?.snapToPosition(position),
        expand: () => bottomSheetModalRef.current?.expand(),
        close: () => bottomSheetModalRef.current?.close(),
        collapse: () => bottomSheetModalRef.current?.collapse(),
        forceClose: () => bottomSheetModalRef.current?.forceClose(),
      }),
      [],
    );
    return (
      <RNBottomSheet
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
      >
        <BottomSheetView style={styles.contentContainer}>
          {props.children}
        </BottomSheetView>
      </RNBottomSheet>
    );
  },
);

export { BottomSheet };

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
