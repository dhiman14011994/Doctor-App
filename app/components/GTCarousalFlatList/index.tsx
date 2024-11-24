import {View, Text, Animated as RNAnimated, FlatList} from 'react-native';
import React, {FC} from 'react';

import GTBlogItem from '../GTBlogItem';
import PagingDotContainer from '../PagingDotContainer';
import CONSTANTS from '../../utils/constants';
import GTHomeVideoBanner from '../GTHomeVideoBanner';
import ListEmptyComponent from '../ListEmptyComponent/ListEmptyComponent';

interface GTCarousalFlatListProps {
  data?: any;
  renderItem?: any;
  isBlog?: boolean;
}

const GTCarousalFlatList: FC<GTCarousalFlatListProps> = ({data, isBlog}) => {
  const scrollY = new RNAnimated.Value(0);
  let position = RNAnimated.divide(scrollY, CONSTANTS.THEME.size.WIDTH - 64);

  const renderItem = ({item, index}: any) => {
    if (isBlog) {
      return <GTBlogItem item={item} index={index} />;
    } else {
      return <GTHomeVideoBanner index={index} />;
    }
  };
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        // onScroll={onScrollHandler}
        data={data}
        keyExtractor={(item, index) => (index + 1).toString()}
        // pagingEnabled={true}
        renderItem={renderItem}
        onScroll={RNAnimated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
            listener: (event: any) => {},
          },
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
      <View style={{marginTop: '2%'}}>
        <PagingDotContainer
          elements={data}
          position={position}
          dotColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
        />
      </View>
    </View>
  );
};

export default GTCarousalFlatList;
