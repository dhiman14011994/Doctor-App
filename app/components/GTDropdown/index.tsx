import React, {FC} from 'react';
import {View, TouchableOpacity, ViewStyle, Image} from 'react-native';
import {Arrow_Down_Icon, Arrow_Up_Icon, DOWN_ARROW} from '../../assets';
import {styles} from './style';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import GTCheckBox from '../GTCheckBox';

interface GTDropdownProps {
  label?: string;
  selected?: string;
  isExpand?: boolean;
  onPressExpand?: () => void;
  onPressHandle?: (item?: any) => void;
  data?: any;
  customStyle?: ViewStyle;
}

const GTDropdown: FC<GTDropdownProps> = ({
  label,
  isExpand,
  selected,
  onPressExpand,
  onPressHandle,
  data,
  customStyle,
}) => {
  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <GTCheckBox
        key={index}
        data={item}
        onPressHandle={(item: any) => {
          //@ts-ignore
          onPressHandle(item);
        }}
      />
    );
  };

  return (
    <View style={[styles.cardView, customStyle]}>
      <GTLabel
        text={label}
        fontSize={CONSTANTS.THEME.size.s14}
        fontWeight="600"
        customStyle={styles.textStyle}
        color={CONSTANTS.THEME.colors.Dark_Gunmetal}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.expandStyle,
          {
            borderColor: isExpand
              ? CONSTANTS.THEME.colors.PRIMARY_COLOR
              : CONSTANTS.THEME.colors.LIGHT_WHITE,
            backgroundColor: isExpand
              ? CONSTANTS.THEME.colors.SELECTED_DROPDOWN
              : CONSTANTS.THEME.colors.WHITE_COLOR,
          },
        ]}
        onPress={onPressExpand}>
        <GTLabel
          text={selected}
          fontSize={CONSTANTS.THEME.size.s16}
          fontWeight="400"
          color={CONSTANTS.THEME.colors.Light_Primary_Gunmetal}
          customStyle={{width: '80%'}}
        />
        <TouchableOpacity
          onPress={onPressExpand}
          style={{transform: [{rotate: !isExpand ? '0deg' : '180deg'}]}}>
          <Image
            source={DOWN_ARROW}
            style={{
              width: CONSTANTS.THEME.size.s18,
              height: CONSTANTS.THEME.size.s18,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isExpand && (
        <View style={styles.expandContainer}>
          <FlashList
            data={data || []}
            estimatedItemSize={CONSTANTS.THEME.size.WIDTH}
            renderItem={renderItem}
            nestedScrollEnabled={true}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default GTDropdown;
