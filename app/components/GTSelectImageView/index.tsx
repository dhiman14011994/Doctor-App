import {TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import GTButtonContainer from '../GTButtonContainer';
import {X_CLOSE_ICON} from '../../assets';
import GTButton from '../GTButton';

interface GTSelectImageViewProps {
  onClosePress?: () => void;
  onHandlePress?: () => void;
  name?: string;
  type?: any;
  profileText?: string;
  onSelectImageType?: any;
  galleryText?: string;
  cameraText?: string;
  cancelText?: string;
}

const GTSelectImageView: FC<GTSelectImageViewProps> = ({
  profileText,
  onClosePress,
  name,
  type,
  onHandlePress,
  onSelectImageType,
  galleryText,
  cameraText,
  cancelText,
}) => {
  return (
    <View style={{...styles.container}}>
      <GTButtonContainer
        customStyle={styles.closeContainer}
        onHandlePress={onClosePress}>
        <X_CLOSE_ICON
          width={CONSTANTS.THEME.size.s18}
          height={CONSTANTS.THEME.size.s18}
        />
      </GTButtonContainer>
      <View style={{...styles.mainContainer}}>
        <GTLabel
          text={profileText}
          fontSize={CONSTANTS.THEME.size.s16}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          customStyle={{alignSelf: 'center'}}
        />
        <TouchableOpacity
          onPress={() => onSelectImageType('gallery')}
          activeOpacity={0.8}
          style={{
            paddingVertical: CONSTANTS.THEME.size.s8,
            width: '100%',
            marginTop: CONSTANTS.THEME.size.s8,
          }}>
          <GTLabel
            text={galleryText}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontSize={CONSTANTS.THEME.size.s14}
          />
        </TouchableOpacity>
        {/* <LDivider /> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectImageType('camera')}
          style={{paddingVertical: CONSTANTS.THEME.size.s8, width: '100%'}}>
          <GTLabel
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            text={cameraText}
            fontSize={CONSTANTS.THEME.size.s16}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onClosePress}>
          <GTLabel
            text={cancelText}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontSize={CONSTANTS.THEME.size.s16}
            customStyle={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GTSelectImageView;
