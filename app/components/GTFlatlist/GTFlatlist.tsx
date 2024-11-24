import {View, Animated, FlatList} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import ListEmptyComponent from '../ListEmptyComponent/ListEmptyComponent';

interface GTFlatlistProps {
  flatListref: any;
  data?: any;
  scrollX?: any;
  setCurrentIndex?: any;
  renderItem?: any;
  scrollEnabled?: boolean;
  bounces?: boolean;
}

const GTFlatlist: FC<GTFlatlistProps> = ({
  flatListref,
  data,
  scrollX,
  setCurrentIndex,
  renderItem,
  scrollEnabled = true,
  bounces = true,
}) => {
  const ListEmpty = () => {
    return (
      <ListEmptyComponent
        customViewStyle={{width: CONSTANTS.THEME.size.WIDTH}}
      />
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={scrollEnabled}
        ref={flatListref}
        bounces={bounces}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
            listener: (event: any) => {
              setCurrentIndex(
                Math.round(
                  event.nativeEvent.contentOffset.x /
                    CONSTANTS.THEME.size.WIDTH,
                ),
              );
            },
          },
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => (index + 1).toString()}
        ListEmptyComponent={ListEmpty}
      />
    </View>
  );
};

export default GTFlatlist;
