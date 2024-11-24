import {View, Text, ViewStyle, ImageStyle} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import GTImage from '../GTImage';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import {EDIT_ICON} from '../../assets';
import GTButtonContainer from '../GTButtonContainer';

interface GTSettingUserInfoProps {
  container?: ViewStyle;
  imageStyle?: ImageStyle;
  userImage?: string;
  name?: string;
  mobile_no?: string;
  onEditPress?: () => void;
  onHandlePress?: () => void;
}

const GTSettingUserInfo: FC<GTSettingUserInfoProps> = ({
  container,
  imageStyle,
  userImage,
  name,
  mobile_no,
  onEditPress,
  onHandlePress,
}) => {
  return (
    <View style={{...styles.mainContainer, ...container}}>
      <View style={styles.subContainer}>
        <GTImage
          imageStyle={imageStyle}
          uri={userImage}
          resizeMode={'contain'}
        />
        <View style={styles.nameContainer}>
          <GTLabel
            text={name || 'Abc kumar'}
            fontSize={CONSTANTS.THEME.size.s18}
            fontWeight="700"
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          />
          <GTLabel
            text={mobile_no || '+91000000000'}
            fontSize={CONSTANTS.THEME.size.s14}
            fontWeight="400"
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          />
        </View>
      </View>
      <GTButtonContainer
        customStyle={styles.timeView}
        onHandlePress={onHandlePress}>
        {/* <EDIT_ICON
          width={CONSTANTS.THEME.size.s18}
          height={CONSTANTS.THEME.size.s18}
        /> */}
        <GTLabel
          text={'View'}
          fontSize={CONSTANTS.THEME.size.s14}
          fontWeight="400"
          color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
          textAlign="right"
          customStyle={{marginLeft: CONSTANTS.THEME.size.s4}}
        />
      </GTButtonContainer>
    </View>
  );
};

export default GTSettingUserInfo;
