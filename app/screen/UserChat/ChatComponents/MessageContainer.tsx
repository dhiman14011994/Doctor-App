import {
  Avatar,
  Bubble,
  Day,
  Message,
  MessageImage,
  MessageText,
} from 'react-native-gifted-chat';
import CONSTANTS from '../../../utils/constants';
import {View, Platform, Image, TouchableOpacity} from 'react-native';
import GTLabel from '../../../components/GTLabel';
import moment from 'moment';
import GTButtonContainer from '../../../components/GTButtonContainer';
import GTImage from '../../../components/GTImage';
import {
  BLUE_MIC_ICON,
  BLUE_READ_TICK,
  GRAY_READ_TICK,
  INDICATOR_ICON,
  PDF_ICON,
  PLAY,
  SOUND_WAVE,
} from '../../../assets';
import styles from './styles';
import {compareTodayDate, compareTwoDate} from '../../../utils/customFunction';

import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export const renderAvatar = (props: any) => (
  <Avatar
    {...props}
    containerStyle={{left: styles.avterLeft, right: {}}}
    imageStyle={{left: styles.avatarImageLeft, right: {}}}
  />
);

export const renderMessage = (props: any) => (
  <View>
    <Message
      {...props}
      // renderDay={() => <Text>Date</Text>}
      containerStyle={{
        left: {backgroundColor: 'lime'},
        right: {backgroundColor: 'gold'},
      }}
    />
  </View>
);
export const renderMessageText = (props: any) => {
  let date = new Date(props.currentMessage.createdAt);
  var newData = `${
    date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  }:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;

  return (
    <View>
      <MessageText
        {...props}
        textStyle={{
          left: {color: CONSTANTS.THEME.colors.Dark_Gunmetal},
          right: {color: CONSTANTS.THEME.colors.Dark_Gunmetal},
        }}
        linkStyle={{
          left: {color: CONSTANTS.THEME.colors.PRIMARY_COLOR},
          right: {color: CONSTANTS.THEME.colors.PRIMARY_COLOR},
        }}
        customTextStyle={styles.customTextStyle}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <GTLabel
          customStyle={{
            marginRight: 5,
            lineHeight: CONSTANTS.THEME.size.s22,
          }}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s12}
          text={newData}
        />
        {props?.position == 'right' &&
          (props.currentMessage.isRead ? (
            <BLUE_READ_TICK
              height={CONSTANTS.THEME.size.s18}
              width={CONSTANTS.THEME.size.s18}
            />
          ) : (
            <GRAY_READ_TICK
              height={CONSTANTS.THEME.size.s18}
              width={CONSTANTS.THEME.size.s18}
            />
          ))}
      </View>
    </View>
  );
};

export const renderDay = (props: any) => {
  const isDateView = compareTwoDate({
    startDate: props?.currentMessage?.createdAt,
    endDate:
      props?.previousMessage?.createdAt || props?.currentMessage?.createdAt,
  });

  if (!isDateView || props?.previousMessage?.createdAt == undefined) {
    return (
      <GTLabel
        text={compareTodayDate(props.currentMessage.createdAt)}
        color={'gray'}
        fontWeight="bold"
        textAlign="center"
        customStyle={{marginVertical: CONSTANTS.THEME.size.s10}}
        fontSize={CONSTANTS.THEME.size.s14}
      />
    );
  } else {
    <View />;
  }
};

const displayImage = (url: any) => {
  function getUrlExtension() {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const extension = getUrlExtension();
  console.log('extension', extension);

  // Feel free to change main path according to your requirements.
  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };
  RNFS.downloadFile(options)
    .promise.then(() => {
      console.log('localFile', localFile);
      FileViewer.open(localFile, {showOpenWithDialog: true})
        .then(() => {})
        .catch(err => {
          console.log('err', err);
        });
    })
    .then(() => {
      // success
    })
    .catch(error => {
      // error
    });
};

export const renderMessageImage = (props: any) => {
  let date = new Date(props.currentMessage.createdAt);
  var newData = `${
    date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  }:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
  return (
    <GTButtonContainer
      onHandlePress={() => displayImage(props.currentMessage.image || '')}
      customStyle={{
        width: CONSTANTS.THEME.size.WIDTH * 0.75,
        height: CONSTANTS.THEME.size.HEIGHT * 0.45,
        overflow: 'hidden',
      }}>
      <GTImage
        uri={props.currentMessage.image}
        imageStyle={{
          width: CONSTANTS.THEME.size.WIDTH * 0.75,
          height: CONSTANTS.THEME.size.HEIGHT * 0.45,
          borderRadius: CONSTANTS.THEME.size.WIDTH * 0.05,
          overflow: 'hidden',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 15,
          flexDirection: 'row',
        }}>
        <GTLabel
          customStyle={{
            textAlign: 'right',
          }}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          text={newData}
        />
        {props.position == 'right' &&
          (props.currentMessage.isRead ? (
            <BLUE_READ_TICK
              height={CONSTANTS.THEME.size.s20}
              width={CONSTANTS.THEME.size.s20}
            />
          ) : (
            <GRAY_READ_TICK
              height={CONSTANTS.THEME.size.s20}
              width={CONSTANTS.THEME.size.s20}
            />
          ))}
      </View>
    </GTButtonContainer>
  );
};

export const renderBubble = (props: any) => {
  if (props?.currentMessage?.document) {
    let date = new Date(props.currentMessage.createdAt);
    var newData = `${
      date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    }:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
    const fileType = props.currentMessage.document
      .split(/[#?]/)[0]
      .split('.')
      .pop()
      .trim();
    return (
      <GTButtonContainer
        customStyle={{
          height: 130,
          width: 100,
          marginBottom: 20,
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        onHandlePress={() => {
          displayImage(props.currentMessage.document || '');
          // setFileVisible(true);
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          <Image
            style={{width: 100, height: 100}}
            resizeMode="contain"
            source={
              fileType == 'pdf'
                ? require('../../../assets/images/PdfIcon.png')
                : require('../../../assets/images/doc.png')
            }
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            right: 15,
            flexDirection: 'row',
          }}>
          <GTLabel
            customStyle={{
              textAlign: 'right',
            }}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            text={newData}
          />
          {props?.position == 'right' && props.currentMessage.isRead ? (
            <BLUE_READ_TICK
              height={CONSTANTS.THEME.size.s20}
              width={CONSTANTS.THEME.size.s20}
            />
          ) : (
            <GRAY_READ_TICK
              height={CONSTANTS.THEME.size.s20}
              width={CONSTANTS.THEME.size.s20}
            />
          )}
        </View>
      </GTButtonContainer>
    );
  }
  return (
    <Bubble
      {...props}
      renderTime={() => <View />}
      wrapperStyle={{
        left: {
          backgroundColor: CONSTANTS.THEME.colors.CHAT_SECONDARY_COLOR,
          marginBottom: 20,
        },
        right: {
          marginBottom: 20,
          backgroundColor: CONSTANTS.THEME.colors.CHAT_PRIMARY_COLOR,
          marginRight: 10,
        },
      }}
      tickStyle={{}}
    />
  );
};
