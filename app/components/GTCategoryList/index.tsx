import {View, ViewStyle, FlatList} from 'react-native';
import React, {FC} from 'react';

import style from './style';
import CONSTANTS from '../../utils/constants';
import GTCategoryItem from '../GTCategoryItem';
import GTItemHeader from '../GTItemHeader';

interface GTCategoryListProps {
  rightText?: string;
  title?: string;
  data?: any;
  isFewItemShow?: boolean;
  numberOfItem?: number;
  numColumns?: number;
  estimatedItemSize?: number;
  container?: ViewStyle;
  listContainer?: ViewStyle;
  itemContainer?: ViewStyle;
  onPress?: any;
  rightTextOnPress?: () => void;
}

const GTCategoryList: FC<GTCategoryListProps> = ({
  rightText,
  title,
  data,
  isFewItemShow,
  numberOfItem = 6,
  numColumns = 3,
  container,
  listContainer,
  itemContainer,
  onPress,
  rightTextOnPress,
}) => {
  const renderItem = ({item, index}: any) => {
    if (isFewItemShow) {
      if (numberOfItem > index) {
        return (
          <GTCategoryItem
            onPress={() => {
              onPress(item);
            }}
            key={(index + 1).toString()}
            text={item?.name}
            container={{
              ...itemContainer,
              marginRight:
                index == 2 || index == 5
                  ? 0
                  : CONSTANTS.THEME.size.WIDTH * 0.032,
              // marginTop: index > 2 ? 0 : CONSTANTS.THEME.size.HEIGHT * 0.05,
              ...style.itemContainer,
            }}
            textColor={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            uri={item?.image}
            imageItemStyle={style.imageStyle}
            fontSize={CONSTANTS.THEME.size.s14}
          />
        );
      }
    } else {
      return (
        <GTCategoryItem
          text={item?.title}
          container={{
            ...itemContainer,
            // marginTop: index > 2 ? 0 : CONSTANTS.THEME.size.HEIGHT * 0.03,
            ...style.itemContainer,
          }}
          uri={item?.uri}
          textColor={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          imageItemStyle={style.imageStyle}
          fontSize={CONSTANTS.THEME.size.s14}
          onPress={() => {
            onPress(item);
          }}
        />
      );
    }
  };
  return (
    <View style={[style.mainContainer, container]}>
      <GTItemHeader
        title={title}
        rightText={rightText}
        containerStyle={style.headerStyle}
        rightTextOnPress={rightTextOnPress}
      />
      <View style={[style.listContainer, listContainer]}>
        {data.map((item: any, index: any) => renderItem({item, index}))}
        {/* <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={numColumns}
          data={data}
          //@ts-ignore
          renderItem={renderItem}
        /> */}
      </View>
    </View>
  );
};

export default GTCategoryList;
