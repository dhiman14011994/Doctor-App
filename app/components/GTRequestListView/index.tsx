import {View, Text, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTLabel from '../GTLabel';
import styles from './styles';
import CONSTANTS from '../../utils/constants';
import GTButton from '../GTButton';

interface GTRequestListViewProps {
  name?: string;
  onHandlePress?: () => void;
  container?: ViewStyle;
  onHandleRejectPress?: () => void;
  type?: any;
}

const GTRequestListView: FC<GTRequestListViewProps> = ({
  name,
  onHandlePress,
  container,
  onHandleRejectPress,
  type,
}) => {
  return (
    <View style={{...styles.detailContainer, ...container}}>
      <View style={styles.nameContainer}>
        <GTLabel
          text={name}
          fontSize={CONSTANTS.THEME.size.s16}
          fontWeight="700"
          customStyle={styles.textStyle}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
        <GTLabel
          text={type || 'Chat'}
          fontSize={CONSTANTS.THEME.size.s12}
          fontWeight="600"
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          customStyle={{textTransform: 'capitalize'}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GTButton
          //@ts-ignore
          onHandlePress={onHandlePress}
          text={CONSTANTS.TEXT.ACCEPT}
          color={CONSTANTS.THEME.colors.WHITE_COLOR}
          customStyle={styles.buttonStyle}
          // leftStyle={{marginRight: CONSTANTS.THEME.size.s4}}
          backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
        />
        <GTButton
          //@ts-ignore
          onHandlePress={onHandleRejectPress}
          text={CONSTANTS.TEXT.REJECT}
          color={CONSTANTS.THEME.colors.ORANGE}
          customStyle={styles.rejectButtonStyle}
          leftStyle={{marginRight: CONSTANTS.THEME.size.s4}}
          backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
        />
      </View>
    </View>
  );
};

export default GTRequestListView;
