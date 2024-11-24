import {View, Text, Image} from 'react-native';
import React, {FC, useState} from 'react';
import styles from './styles';
import {BlogImage, HeaderIcon} from '../../assets';
import GTLabel from '../GTLabel/index';
import CONSTANTS from '../../utils/constants';
import moment from 'moment';

interface GTBloagProps {
  scrollX?: any;
  index: number;
  item?: any;
}

const width = CONSTANTS.THEME.size.WIDTH * 0.8;
const GTBlogItem: FC<GTBloagProps> = ({scrollX, index, item}) => {
  const [moreText, setMoreText] = useState(false);
  var textDes = item?.description || '';
  var textArray = textDes.split('');

  const renderText = ({it, index}: any) => {
    if (!moreText && index < 62) {
      return (
        <Text
          key={(index + 1).toString()}
          disabled={index < 61}
          onPress={() => {
            if (index == 61) {
              setMoreText(true);
            }
          }}
          style={{
            fontSize: CONSTANTS.THEME.size.s14,
            fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
            fontWeight: index == 61 ? '800' : '400',
            color:
              index == 61
                ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                : CONSTANTS.THEME.colors.Dark_Gunmetal,
            lineHeight: CONSTANTS.THEME.size.s22,
          }}>
          {index < 60 ? `${it}` : index < 61 ? '.' : ' Read  more'}
        </Text>
      );
    } else if (moreText) {
      return (
        <Text
          key={(index + 1).toString()}
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
  };
  return (
    <View
      style={[
        styles.container,
        {
          marginLeft: index == 0 ? CONSTANTS.THEME.size.WIDTH * 0.05 : 0,
          marginRight: CONSTANTS.THEME.size.WIDTH * 0.05,
        },
      ]}>
      <Image
        style={styles.imageContainer}
        source={
          item?.image
            ? {uri: Array.isArray(item?.image) ? item?.image[0] : item?.image}
            : BlogImage
        }
      />
      <View style={styles.mainContainer}>
        <GTLabel
          text={item?.title || 'Donec vel mi eu lorem ornare suscipit'}
          fontWeight="700"
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s16}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
        />
        <View style={styles.desContainer}>
          {[...textArray, ''].map((it: string, index: number) =>
            renderText({it, index}),
          )}
        </View>
        {/* <GTLabel
          fontWeight="400"
          color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          fontSize={CONSTANTS.THEME.size.s12}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
          text={
            item?.description ||
            'Luas dan nyaman. meski belum berani kemana-mana karena kondisi pandemi. hanya menilmati kamar dan sarapan. pelayanannya ramah.'
          }
        /> */}
        <View style={styles.subContainer}>
          <View style={styles.iconConstainer}>
            <HeaderIcon
              width={CONSTANTS.THEME.size.s30}
              height={CONSTANTS.THEME.size.s30}
            />
            <View>
              <GTLabel
                text={CONSTANTS.TEXT.MIND_TALKS}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                fontSize={CONSTANTS.THEME.size.s14}
                customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
                fontFamily={CONSTANTS.THEME.typography.fontFamily.Black}
              />
              <GTLabel
                text={CONSTANTS.TEXT.YOUR_PATH}
                color={CONSTANTS.THEME.colors.Light_Gray}
                fontSize={CONSTANTS.THEME.size.s10}
                // customStyle={{lineHeight: CONSTANTS.THEME.size.s34}}
              />
            </View>
          </View>
          <GTLabel
            text={
              item?.updatedAt
                ? moment(item?.updatedAt).format('DD-MM-YYYY')
                : '30-06-2024'
            }
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            color={CONSTANTS.THEME.colors.Light_Gunmetal}
          />
        </View>
      </View>
    </View>
  );
};

export default GTBlogItem;
