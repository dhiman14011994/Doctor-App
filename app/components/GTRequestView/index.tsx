import {View} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import GTButtonContainer from '../GTButtonContainer';
import {X_CLOSE_ICON} from '../../assets';
import GTButton from '../GTButton';

interface GTRequestViewProps {
  onClosePress?: () => void;
  onHandlePress?: () => void;
  name?: string;
  type?: any;
  onHandleRejectPress?: () => void;
  data?: any;
}

const GTRequestView: FC<GTRequestViewProps> = ({
  onClosePress,
  name,
  type,
  onHandlePress,
  onHandleRejectPress,
  data,
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
          text={CONSTANTS.TEXT.NEW_REQUEST_ARRIVED}
          fontSize={CONSTANTS.THEME.size.s22}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontWeight={'700'}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s32}}
        />
        <GTLabel
          text={name || 'Abc xyz'}
          fontSize={CONSTANTS.THEME.size.s16}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontWeight={'700'}
          customStyle={{
            lineHeight: CONSTANTS.THEME.size.s22,
            marginTop: CONSTANTS.THEME.size.s22,
          }}
        />
        <GTLabel
          text={type || 'Chat'}
          fontSize={CONSTANTS.THEME.size.s14}
          color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          fontWeight={'400'}
          customStyle={{
            lineHeight: CONSTANTS.THEME.size.s22,
            marginBottom: CONSTANTS.THEME.size.s22,
            textTransform: 'capitalize',
          }}
          textAlign="center"
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: 20,
          }}>
          <GTButton
            onHandlePress={onHandleRejectPress}
            text={CONSTANTS.TEXT.REJECT}
            backgroundColor={CONSTANTS.THEME.colors.RED}
            color={CONSTANTS.THEME.colors.WHITE_COLOR}
            fontSize={CONSTANTS.THEME.size.s16}
            fontWeight={'600'}
            customStyle={{...styles.buttonRejectContainer}}
          />
          <GTButton
            onHandlePress={onHandlePress}
            text={CONSTANTS.TEXT.ACCEPT}
            backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            color={CONSTANTS.THEME.colors.WHITE_COLOR}
            fontSize={CONSTANTS.THEME.size.s16}
            fontWeight={'600'}
            customStyle={{...styles.buttonContainer}}
          />
        </View>
      </View>
    </View>
  );
};

export default GTRequestView;
