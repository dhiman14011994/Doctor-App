import {View, Text, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTLabel from '../GTLabel';
import {MESSAGE_GREEN_ICON, WITHDRAWAL_ICON} from '../../assets';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLinearGradientView from '../GTLinearGradientView';

interface GTWithDrawalItemProps {
  name?: string;
  isWithDrawer?: boolean;
  duration?: string;
  dateTime?: string;
  price?: string;
  walletId?: string;
  container?: ViewStyle;
  index?: number;
}

const GTWithDrawalItem: FC<GTWithDrawalItemProps> = ({
  name,
  isWithDrawer,
  duration,
  dateTime,
  price,
  walletId,
  container,
  index,
}) => {
  const renderLineView = () => {
    return (
      <View style={styles.lineContainer}>
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
      </View>
    );
  };
  return (
    <View>
      {index != 0 && renderLineView()}
      <View style={{...styles.container, ...container}}>
        <View style={styles.subContainer}>
          {isWithDrawer ? (
            <WITHDRAWAL_ICON
              width={CONSTANTS.THEME.size.s32}
              height={CONSTANTS.THEME.size.s32}
            />
          ) : (
            <MESSAGE_GREEN_ICON
              width={CONSTANTS.THEME.size.s32}
              height={CONSTANTS.THEME.size.s32}
            />
          )}
          <View style={styles.detailsStyle}>
            <GTLabel
              fontSize={CONSTANTS.THEME.size.s14}
              fontWeight="600"
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              text={name}
            />
            {duration && (
              <GTLabel
                text={`Duration: ${duration}`}
                fontSize={CONSTANTS.THEME.size.s12}
                fontWeight="400"
                customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              />
            )}
            <GTLabel
              text={dateTime}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
              customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            />
          </View>
        </View>
        <View>
          <GTLabel
            text={price}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
            textAlign="right"
            color={
              isWithDrawer
                ? CONSTANTS.THEME.colors.RED
                : CONSTANTS.THEME.colors.GREEN
            }
          />
          <GTLabel
            text={walletId}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            textAlign="right"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          />
        </View>
      </View>
    </View>
  );
};

export default GTWithDrawalItem;
