import {Image, View} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import GTButtonContainer from '../GTButtonContainer';
import {HeaderIcon, THANK_YOU, X_CLOSE_ICON} from '../../assets';
import GTButton from '../GTButton';
import GTImage from '../GTImage';

interface GTOnlineProps {
  onClosePress?: () => void;
  noButtonPress?: () => void;
  yesButtonPress?: () => void;
  isLogin?: boolean;
  isLive?: boolean;
}

const GTOnline: FC<GTOnlineProps> = ({
  onClosePress,
  noButtonPress,
  yesButtonPress,
  isLogin,
  isLive,
}) => {
  return (
    <View style={{...styles.container}}>
      {isLogin ? (
        <View style={{...styles.mainContainer}}>
          <GTLabel
            text={isLive ? CONSTANTS.TEXT.GO_OFFLINE : CONSTANTS.TEXT.GO_ONLINE}
            fontSize={CONSTANTS.THEME.size.s22}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontWeight={'700'}
            customStyle={{lineHeight: CONSTANTS.THEME.size.s32}}
          />
          <GTLabel
            text={
              isLive ? CONSTANTS.TEXT.DO_HAVE_OFFLINE : CONSTANTS.TEXT.DO_HAVE
            }
            fontSize={CONSTANTS.THEME.size.s14}
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            fontWeight={'400'}
            customStyle={{
              lineHeight: CONSTANTS.THEME.size.s22,
              marginBottom: CONSTANTS.THEME.size.s22,
            }}
            textAlign="center"
          />

          <View style={styles.buttonViewStyle}>
            <GTButton
              text={CONSTANTS.TEXT.NO}
              backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
              color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
              fontSize={CONSTANTS.THEME.size.s16}
              fontWeight={'600'}
              customStyle={{...styles.buttonContainer}}
              onHandlePress={noButtonPress}
            />
            <GTButton
              text={CONSTANTS.TEXT.YES}
              backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
              color={CONSTANTS.THEME.colors.WHITE_COLOR}
              fontSize={CONSTANTS.THEME.size.s16}
              fontWeight={'600'}
              customStyle={{...styles.buttonContainer}}
              onHandlePress={yesButtonPress}
            />
          </View>
        </View>
      ) : (
        <View style={{...styles.mainContainer}}>
          <View style={styles.constainer}>
            <HeaderIcon
              width={CONSTANTS.THEME.size.s30}
              height={CONSTANTS.THEME.size.s30}
            />
            <View>
              <GTLabel
                text={CONSTANTS.TEXT.MIND_TALKS}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                fontSize={CONSTANTS.THEME.size.s16}
                customStyle={{lineHeight: CONSTANTS.THEME.size.s24}}
                fontFamily={CONSTANTS.THEME.typography.fontFamily.Black}
              />
              <GTLabel
                text={CONSTANTS.TEXT.YOUR_PATH}
                color={CONSTANTS.THEME.colors.Light_Gray}
                fontSize={CONSTANTS.THEME.size.s8}
                // customStyle={{lineHeight: CONSTANTS.THEME.size.s34}}
              />
            </View>
          </View>
          <Image
            source={THANK_YOU}
            resizeMode="contain"
            style={styles.thankuImage}
          />
          <GTLabel
            text={CONSTANTS.TEXT.THANK_YOU_SUBMITTING}
            fontSize={CONSTANTS.THEME.size.s16}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontWeight={'400'}
            textAlign="center"
            customStyle={{
              marginVertical: CONSTANTS.THEME.size.s4,
              marginHorizontal: CONSTANTS.THEME.size.s10,
            }}
          />
        </View>
      )}

      <GTButtonContainer
        customStyle={styles.closeContainer}
        onHandlePress={onClosePress}>
        <X_CLOSE_ICON
          width={CONSTANTS.THEME.size.s18}
          height={CONSTANTS.THEME.size.s18}
        />
      </GTButtonContainer>
    </View>
  );
};

export default GTOnline;
