import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CONSTANTS from '../../../utils/constants';
import styles from './styles';
import {
  MESSAGE_GREEN_ICON,
  White_Left_Icon,
  WITHDRAWAL_ICON,
} from '../../../assets';
import GTHeader from '../../../components/GTHeader';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTLabel from '../../../components/GTLabel';
import GTButton from '../../../components/GTButton';
import GTWithDrawalItem from '../../../components/GTWithDrawalItem';
import GTWithdrawerAmount from '../../../components/GTWithdrawerAmount';
import GTModal from '../../../components/GTModal';
import {useNavigation} from '@react-navigation/native';
import ListEmptyComponent from '../../../components/ListEmptyComponent/ListEmptyComponent';
import {
  useLazyGetAllPartnerTransactionQuery,
  useWithdrawRequestByPartnerMutation,
} from '../../../redux/payment-api-slice';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const Wallet = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isRequest, SetIsRequest] = useState(false);
  const [amount, setAmount] = useState('');
  const [withDrewalType, setWithDrewalType] = useState('');
  const userInfo = useSelector((state: any) => state?.appState.userInfo);
  const [getAllPartnerTransactionApi, {data, isLoading}] =
    useLazyGetAllPartnerTransactionQuery();
  const [
    withdrawRequestByPartnerApi,
    {dataWithdraw, isLoading: isLoadingAmount},
  ] = useWithdrawRequestByPartnerMutation();
  useEffect(() => {
    getAllPartnerTransaction();
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

  const getAllPartnerTransaction = () => {
    let data = {id: userInfo?._id};
    getAllPartnerTransactionApi(data)
      .unwrap()
      .then((res: any) => {})
      .catch(e => {
        console.log('getAllPartnerTransaction all Type', e);
      });
  };

  const withdrawRequestByPartner = () => {
    let data = {amount: amount};
    withdrawRequestByPartnerApi(data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text2: 'Withdraw request send successfully',
        });
      })
      .catch(e => {
        console.log('withdrawRequestByPartner all Type', e);
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
          text={CONSTANTS.TEXT.WALLET_TRANSACTIONS}
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
        <GTLinearGradientView
          container={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: CONSTANTS.THEME.size.s10,
          }}>
          <GTLabel
            text={`${Math.round(userInfo?.wallet)}`}
            fontSize={CONSTANTS.THEME.size.s32}
            color={CONSTANTS.THEME.colors.WHITE[100]}
            fontWeight="700"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s40}}
          />
          <GTLabel
            text={CONSTANTS.TEXT.AVAILABLE_BALANCE}
            fontSize={CONSTANTS.THEME.size.s14}
            color={CONSTANTS.THEME.colors.WHITE[80]}
            fontWeight="400"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
          />
        </GTLinearGradientView>
      </>
    );
  };

  const renderItem = ({item, index}: any) => {
    const dateTime = moment(item?.createdAt).format('DD MMM YYYY  h:mm a');
    return (
      <GTWithDrawalItem
        name={`${item?.userId?.firstName}${
          item?.userId?.lastName ? ' ' + item?.userId?.lastName : ''
        }`}
        isWithDrawer={item.isPaid}
        dateTime={dateTime}
        price={item?.amount}
        duration={item?.duration || ''}
        walletId={item?.orderId}
        container={{marginTop: index == 0 ? '2%' : 0}}
        index={index}
      />
    );
  };

  const ListFooterComponent = () => {
    return <View style={{height: CONSTANTS.THEME.size.HEIGHT * 0.2}} />;
  };

  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <FlatList
        data={data?.data || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => (index + 1).toString()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      <View
        style={{
          ...styles.bottomContainer,
          bottom: insets.bottom,
        }}>
        <GTButton
          text={CONSTANTS.TEXT.SAVE_DETAILS}
          color={CONSTANTS.THEME.colors.WHITE_COLOR}
          backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
          customStyle={styles.continueButton}
          onHandlePress={() => {
            SetIsRequest(true);
          }}
          fontSize={CONSTANTS.THEME.size.s16}
        />
      </View>
      <GTModal visible={isRequest}>
        <GTWithdrawerAmount
          onHandlePress={() => {
            SetIsRequest(false);
            withdrawRequestByPartner();
          }}
          amount={amount}
          availableAmount={userInfo?.wallet}
          setAmount={setAmount}
          withDrewalType={withDrewalType}
          setWithDrewalType={setWithDrewalType}
          onClosePress={() => {
            SetIsRequest(false);
          }}
          name={''}
        />
      </GTModal>
    </View>
  );
};

export default Wallet;
