import {View, Text, ImageStyle} from 'react-native';
import React, {FC} from 'react';
import GTImage from '../GTImage';
import GTLabel from '../GTLabel';
// import {Bag_Icon, Star_Icon, VerifyIcon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTButtonContainer from '../GTButtonContainer';

interface GTUserListViewProps {
  username?: string;
  uri?: any;
  imageStyle?: ImageStyle;
}

const GTUserListView: FC<GTUserListViewProps> = ({
  uri,
  imageStyle,
  username = 'Martha Nelson',
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.topContainer,
        }}>
        <View style={styles.nameDetailsContainer}>
          <GTImage uri={uri} imageStyle={imageStyle} />
          <View style={styles.userStyle}>
            <View style={styles.nameContainer}>
              <GTLabel
                text={username}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              />
              {/* <VerifyIcon
                width={CONSTANTS.THEME.size.s14}
                height={CONSTANTS.THEME.size.s14}
              /> */}
            </View>
            <View
              style={{
                ...styles.nameContainer,
                marginTop: CONSTANTS.THEME.size.s6,
              }}>
              {/* <Bag_Icon
                width={CONSTANTS.THEME.size.s14}
                height={CONSTANTS.THEME.size.s14}
              /> */}
              <GTLabel
                color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                text={'18 Years'}
              />
            </View>
            <View style={styles.nameContainer}>
              <View
                style={{
                  ...styles.nameContainer,
                  borderRightWidth: 1,
                  borderRightColor: CONSTANTS.THEME.colors.RED,
                  marginVertical: CONSTANTS.THEME.size.s6,
                }}>
                {/* <Star_Icon
                  width={CONSTANTS.THEME.size.s14}
                  height={CONSTANTS.THEME.size.s14}
                /> */}
                <GTLabel
                  text={'4.5'}
                  color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                  customStyle={{marginHorizontal: 5}}
                />
              </View>
              <GTLabel
                text={'1280 orders'}
                color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                customStyle={{marginLeft: 5}}
              />
            </View>
          </View>
        </View>
        <GTLabel text="18/min" color={CONSTANTS.THEME.colors.Dark_Gunmetal} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.languageContainer}>
            <GTLabel
              text={'Hindi'}
              fontSize={CONSTANTS.THEME.size.s14}
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
            />
          </View>
          <View style={styles.languageContainer}>
            <GTLabel
              text={'English'}
              fontSize={CONSTANTS.THEME.size.s14}
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
            />
          </View>
          <View style={styles.languageContainer}>
            <GTLabel
              text={'Telugu'}
              fontSize={CONSTANTS.THEME.size.s14}
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
            />
          </View>
        </View>
        <GTButtonContainer customStyle={styles.chatButton}>
          <GTLabel text={'Chat'} color={CONSTANTS.THEME.colors.PRIMARY_COLOR} />
        </GTButtonContainer>
      </View>
    </View>
  );
};

export default GTUserListView;
