import {View, Text, Modal, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';

interface GTModalProps {
  visible?: boolean;
  onClose?: () => void;
  animationType?: any;
  children?: any;
  container?: ViewStyle;
}

const GTModal: FC<GTModalProps> = ({
  visible,
  onClose,
  animationType = 'slide',
  children,
  container,
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType={animationType}>
      <View style={{...styles.container, ...container}}>{children}</View>
    </Modal>
  );
};

export default GTModal;
