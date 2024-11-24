import {View, Text, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTButtonContainer from '../GTButtonContainer';
import GTLabel from '../GTLabel';
import {Right_Back_Icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import styles from './styles';

interface GTSettingMenuProps {
  leftImage?: any;
  name?: string;
  onPress?: () => void;
  container?: ViewStyle;
  subContainer?: ViewStyle;
}

const GTSettingMenu: FC<GTSettingMenuProps> = ({
  leftImage,
  name,
  onPress,
  container,
  subContainer,
}) => {
  return (
    <View style={{...styles.mainContainer, ...container}}>
      <GTButtonContainer
        customStyle={{...styles.subContainer, ...subContainer}}
        onHandlePress={onPress}>
        <View style={styles.mediaContainer}>
          {leftImage}
          <GTLabel
            text={name}
            fontSize={CONSTANTS.THEME.size.s14}
            fontWeight="600"
            customStyle={{
              lineHeight: CONSTANTS.THEME.size.s22,
              marginLeft: CONSTANTS.THEME.size.s12,
            }}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          />
        </View>
        <Right_Back_Icon
          width={CONSTANTS.THEME.size.s14}
          height={CONSTANTS.THEME.size.s14}
        />
      </GTButtonContainer>
    </View>
  );
};

export default GTSettingMenu;
