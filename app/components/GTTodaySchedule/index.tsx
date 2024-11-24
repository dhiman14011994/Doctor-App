import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {
  BLUE_CLOCK_ICON,
  CERTIFICATION_ICON,
  GREEN_CLOCK_ICON,
  THREE_BLACK_DOT_ICON,
} from '../../assets';
import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';
import styles from './styles';
import GTImage from '../GTImage';
import GTButtonContainer from '../GTButtonContainer';

interface GTTodayScheduleProps {
  isWaitting?: boolean;
  time?: string;
  title?: string;
  userImage?: string;
  name?: string;
  price?: number;
  isJoinMeeting?: boolean;
  container?: any;
  onPress?: any;
}

const GTTodaySchedule: FC<GTTodayScheduleProps> = ({
  isWaitting,
  time,
  title,
  userImage,
  name,
  isJoinMeeting,
  price,
  container,
  onPress,
}) => {
  return (
    <View style={{...styles.container, ...container}}>
      <View style={styles.timeContainer}>
        <View
          style={{
            ...styles.subContainer,
            backgroundColor: isWaitting ? '#EDFDF8' : '#F0F5FF',
            paddingHorizontal: CONSTANTS.THEME.size.s12,
            paddingVertical: CONSTANTS.THEME.size.s6,
            borderRadius: CONSTANTS.THEME.size.s12,
          }}>
          {isWaitting ? (
            <GREEN_CLOCK_ICON
              width={CONSTANTS.THEME.size.s12}
              height={CONSTANTS.THEME.size.s12}
            />
          ) : (
            <BLUE_CLOCK_ICON
              width={CONSTANTS.THEME.size.s12}
              height={CONSTANTS.THEME.size.s12}
            />
          )}
          <GTLabel
            text={time}
            fontSize={CONSTANTS.THEME.size.s14}
            color={
              isWaitting
                ? CONSTANTS.THEME.colors.GREEN
                : CONSTANTS.THEME.colors.PRIMARY_COLOR
            }
            customStyle={{marginLeft: CONSTANTS.THEME.size.s12}}
          />
        </View>
        {/* <THREE_BLACK_DOT_ICON
          width={CONSTANTS.THEME.size.s14}
          height={CONSTANTS.THEME.size.s4}
        /> */}
      </View>
      <GTLabel
        text={title}
        fontSize={CONSTANTS.THEME.size.s16}
        fontWeight="700"
        color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        customStyle={{width: '100%', marginVertical: CONSTANTS.THEME.size.s12}}
      />
      <View style={styles.timeContainer}>
        <View style={styles.subContainer}>
          <GTImage imageStyle={styles.userImageStyle} />
          <GTLabel
            text={name}
            fontSize={CONSTANTS.THEME.size.s14}
            fontWeight="600"
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            customStyle={{marginHorizontal: CONSTANTS.THEME.size.s6}}
          />
          <CERTIFICATION_ICON
            width={CONSTANTS.THEME.size.s14}
            height={CONSTANTS.THEME.size.s14}
          />
        </View>
        <GTLabel
          text={`₹${price}/min`}
          fontSize={CONSTANTS.THEME.size.s14}
          fontWeight="700"
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
      </View>
      {isJoinMeeting && (
        <GTButtonContainer
          onHandlePress={onPress}
          customStyle={styles.joinButton}>
          <GTLabel
            text={'Join Meeting'}
            color={CONSTANTS.THEME.colors.WHITE_COLOR}
            fontSize={CONSTANTS.THEME.size.s14}
            fontWeight="600"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s14}}
          />
        </GTButtonContainer>
      )}
    </View>
  );
};

export default GTTodaySchedule;
