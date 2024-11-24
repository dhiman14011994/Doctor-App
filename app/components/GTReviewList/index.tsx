import {View, Text} from 'react-native';
import React, {FC, useState} from 'react';
import styles from './styles';
import {Star_Icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';
import {getDateTime} from '../../utils/customFunction';

interface GTReviewListProps {
  item?: any;
  index?: number;
}

const GTReviewList: FC<GTReviewListProps> = ({item, index}) => {
  const newComment = item?.comment.split('');
  const [moreText, setMoreText] = useState(false);
  const textArray = ['', ...item?.comment];
  var formatted = getDateTime(item?.createdAt);

  const renderText = ({it, index}: any) => {
    if (index == 0) {
      return (
        <View style={styles.starIconContainer}>
          <Star_Icon
            width={CONSTANTS.THEME.size.s12}
            height={CONSTANTS.THEME.size.s12}
          />
          <GTLabel
            text={item.rating ? item.rating.toString() : ''}
            fontSize={CONSTANTS.THEME.size.s14}
            fontWeight="700"
            customStyle={styles.ratingStyle}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          />
        </View>
      );
    } else {
      if (!moreText && index < 112) {
        return (
          <Text
            disabled={index < 111}
            onPress={() => {
              if (index == 111) {
                setMoreText(true);
              }
            }}
            style={{
              fontSize: CONSTANTS.THEME.size.s14,
              fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
              fontWeight: index == 111 ? '800' : '400',
              color:
                index == 111
                  ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                  : CONSTANTS.THEME.colors.Dark_Gunmetal,
              lineHeight: CONSTANTS.THEME.size.s22,
            }}>
            {index < 100 ? `${it}` : index < 111 ? '.' : ' Read  more'}
          </Text>
        );
      } else if (moreText) {
        return (
          <Text
            disabled={textArray.length < index + 1}
            onPress={() => {
              if (textArray.length == index + 1) {
                setMoreText(false);
              }
            }}
            style={{
              fontSize: CONSTANTS.THEME.size.s14,
              fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
              fontWeight: textArray.length == index + 1 ? '800' : '400',
              color:
                textArray.length == index + 1
                  ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                  : CONSTANTS.THEME.colors.Dark_Gunmetal,
              lineHeight: CONSTANTS.THEME.size.s22,
            }}>
            {textArray.length == index + 1 ? ` Read less` : `${it}`}
          </Text>
        );
      }
    }
  };

  return (
    <View>
      <View style={styles.recentContainer}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={styles.desContainer}>
            {[...textArray, ''].map((it: string, index: number) =>
              renderText({it, index}),
            )}
          </View>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <GTLabel
          text={`${item?.userInfo_firstName || ''}${
            item?.userInfo_lastName ? '  ' + item?.userInfo_lastName : ''
          }`}
          fontSize={CONSTANTS.THEME.size.s12}
          fontWeight="500"
          customStyle={styles.ratingStyle}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
        <GTLabel
          text={formatted}
          fontSize={CONSTANTS.THEME.size.s12}
          fontWeight="400"
          customStyle={styles.ratingStyle}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal_Opacity}
        />
      </View>
    </View>
  );
};

export default GTReviewList;
