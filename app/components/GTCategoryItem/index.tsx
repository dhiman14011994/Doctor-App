import {TextStyle, ViewStyle, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';
import GTImage from '../GTImage';
import {Finance_Icon} from '../../assets';

interface GTCategoryItemProps {
  uri?: any;
  imageItemStyle?: any;
  resizeMode?: any;
  text?: string;
  fontSize?: any;
  textColor?: string;
  textStyle?: TextStyle;
  container?: ViewStyle;
  onPress?: () => void;
}

const GTCategoryItem: FC<GTCategoryItemProps> = ({
  uri,
  imageItemStyle,
  resizeMode,
  text,
  fontSize,
  textColor = CONSTANTS.THEME.colors.Dark_Gunmetal,
  textStyle,
  container,
  onPress,
}) => {
  return (
    <TouchableOpacity style={container} onPress={onPress}>
      {/* <GTImage uri={uri} imageStyle={imageItemStyle} resizeMode={resizeMode} /> */}
      <Finance_Icon width={25} height={25} />
      <GTLabel
        text={text}
        color={textColor}
        customStyle={{...textStyle, marginLeft: 10}}
      />
    </TouchableOpacity>
  );
};

export default GTCategoryItem;
