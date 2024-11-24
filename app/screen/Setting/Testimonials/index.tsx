import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import CONSTANTS from '../../../utils/constants';
import GTHeader from '../../../components/GTHeader';
import {White_Left_Icon} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import GTReviewList from '../../../components/GTReviewList';
import GTLabel from '../../../components/GTLabel';
import {useLazyGetTestimonialsApiQuery} from '../../../redux/home-api-slice';

const Testimonials = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [
    getTestimonialsApi,
    {data: testimonialData, isLoading: testimonialsLoading},
  ] = useLazyGetTestimonialsApiQuery();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none', height: 0},
      tabBarVisible: false,
    });

    return () =>
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [isFocus]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  // }, [isFocus]);

  useEffect(() => {
    getTestimonialData();
  }, []);

  const getTestimonialData = () => {
    getTestimonialsApi('')
      .unwrap()
      .then(res => {})
      .catch(err => {
        console.log('testimonals api error', JSON.stringify(err));
      });
  };

  const hearderContainerView = () => {
    return (
      <>
        {Platform.OS == 'android' ? (
          <GTLinearGradientView>
            <StatusBar
              translucent={true}
              backgroundColor={CONSTANTS.THEME.colors.TRANSPARENT}
            />
          </GTLinearGradientView>
        ) : (
          <GTLinearGradientView
            container={{
              height: insets.top,
              backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
            }}
          />
        )}
        <GTLinearGradientView
          container={{
            height:
              insets.top < 35
                ? insets.top
                : Platform.OS == 'android'
                ? insets.top
                : 35,
            backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
          }}
        />
        <GTHeader
          text={'Testimonials'}
          leftIcon={
            <White_Left_Icon
              width={CONSTANTS.THEME.size.s20}
              height={CONSTANTS.THEME.size.s20}
            />
          }
          customStyle={styles.headerContainer}
          textStyle={{textAlign: 'left'}}
          onHandleLeftPress={() => {
            navigation.goBack();
          }}
        />
      </>
    );
  };
  const renderLineView = () => {
    return (
      <View style={styles.lineContainer}>
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
      </View>
    );
  };

  const renderTestimonialItem = ({item, index}: any) => {
    return (
      <View>
        {index != 0 && renderLineView()}
        <GTReviewList key={index.toString()} index={index} item={item} />
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <GTLabel
          text={`No Data Found`}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
      </View>
    );
  };
  const ListFooterComponent = () => {
    return <View style={{height: CONSTANTS.THEME.size.HEIGHT * 0.1}} />;
  };

  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <View style={styles.subContainer}>
        <FlatList
          data={testimonialData?.data || []}
          bounces={false}
          //@ts-ignore
          renderItem={renderTestimonialItem}
          keyExtractor={(item, index) => (index + 1).toString()}
          ListEmptyComponent={ListEmptyComponent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </View>
  );
};

export default Testimonials;
