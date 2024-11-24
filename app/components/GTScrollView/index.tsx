import {View, Text, ScrollView} from 'react-native';
import React, {FC} from 'react';

// props of ScrollView define here
interface GTScrollProps {
  children?: any;
  contentContainerStyle?: any;
}
const GTScrollView: FC<GTScrollProps> = ({children, contentContainerStyle}) => {
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default GTScrollView;
