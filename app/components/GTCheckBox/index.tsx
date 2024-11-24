import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Active_Check_Icon} from '../../assets';
import {styles} from './style';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';

interface GTCheckBoxProps {
  onPressHandle?: any;
  data?: any;
}

const GTCheckBox: FC<GTCheckBoxProps> = ({data, onPressHandle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.itemContainer}
      onPress={() => onPressHandle(data)}>
      <View
        style={[
          styles.checkContainer,
          {
            backgroundColor: data?.isSelected
              ? CONSTANTS.THEME.colors.PRIMARY_COLOR
              : CONSTANTS.THEME.colors.WHITE_COLOR,
          },
        ]}>
        {data?.isSelected && (
          <Active_Check_Icon
            height={CONSTANTS.THEME.size.s18}
            width={CONSTANTS.THEME.size.s18}
          />
        )}
      </View>
      <GTLabel
        text={data?.name}
        fontSize={CONSTANTS.THEME.size.s18}
        fontWeight="600"
        color={CONSTANTS.THEME.colors.Light_Primary_Gunmetal}
        customStyle={{
          marginHorizontal: '3%',
          pointerEvents: 'none',
          width: '70%',
        }}
      />
    </TouchableOpacity>
  );
};

export default GTCheckBox;
