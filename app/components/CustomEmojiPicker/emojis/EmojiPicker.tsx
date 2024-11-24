import React, {useState, memo, useCallback, useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import categories from '../data/categories';

import {fontResize} from '../../../utils/fontResize';
import {emojisByCategory} from '../data/emojis';
import Emoji from './Emoji';
import shortnameToUnicode from '../helpers/shortnameToUnicode';
import CONSTANTS from '../../../utils/constants';

const EmojiPicker = ({selectedEmoji}: any) => {
  const layout = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const routes = categories?.tabs?.map(tab => ({
    key: tab.category,
    title: tab.tabLabel,
  }));

  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <View
        style={{
          width: CONSTANTS.THEME.size.WIDTH * 0.11,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.tab,
            {
              fontSize: fontResize(22),
              opacity: currentIndex === index ? 1 : 0.5,
            },
          ]}
          onPress={() => setCurrentIndex(index)}>
          {item?.title || ''}
        </Text>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return <View style={styles.lineView} />;
  };

  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        data={routes}
        renderItem={renderItem}
      />
      {ListFooterComponent()}
      <ScrollView contentContainerStyle={styles.scrollEmoji}>
        {emojisByCategory[routes[currentIndex].key].map(
          (item: any, index: any) => {
            return (
              <Emoji
                key={index.toString()}
                item={item}
                onPress={() => selectedEmoji(shortnameToUnicode[`:${item}:`])}
              />
            );
          },
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: fontResize(45),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  scrollEmoji: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 80,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  lineView: {
    width: CONSTANTS.THEME.size.WIDTH,
    height: 1,
    backgroundColor: CONSTANTS.THEME.colors.Dark_Gunmetal,
  },
});

export default memo(EmojiPicker);
// export default EmojiPicker;
