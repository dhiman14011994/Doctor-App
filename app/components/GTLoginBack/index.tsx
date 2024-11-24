import {View, Text} from 'react-native';
import React, {FC} from 'react';
import GTButtonContainer from '../GTButtonContainer';
import {Left_Back_icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';
import styles from './styles';

// props of buttons define here
interface GTLoginBackProps {
  onHandlePress?: () => void;
}

const GTLoginBack: FC<GTLoginBackProps> = ({onHandlePress}) => {
  return (
    <GTButtonContainer
      customStyle={styles.container}
      onHandlePress={onHandlePress}>
      <Left_Back_icon
        width={CONSTANTS.THEME.size.s16}
        height={CONSTANTS.THEME.size.s16}
      />
      <GTLabel
        text={CONSTANTS.TEXT.BACK}
        color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        fontSize={CONSTANTS.THEME.size.s16}
        fontWeight="600"
        customStyle={styles.textStyle}
      />
    </GTButtonContainer>
  );
};

export default GTLoginBack;
