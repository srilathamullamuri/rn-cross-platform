/***********************************************************************EMCL
 *
 * styles.js
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of EMC Software and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to EMC Software
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from EMC Software.
 *
 * @flow
 *
 * EMC Software Confidential, All Rights Reserved
 * Copyright (c) 2020, EMC Software
 *
 ***************************************************************************/

// import {StyleSheet} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {CSSProperties} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
// import {IconProps} from 'react-native-vector-icons/Icon';
// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iPhone 5s's scale
const scale = SCREEN_WIDTH / 320;
const scaleH = SCREEN_HEIGHT / 568;

export function normalize(size: number, bHeight = false) {
  const newSize = size * (bHeight ? scaleH : scale);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const screens = {
  DirectoryScreen: 'DirectoryScreen',
  ProfileScreen: 'ProfileScreen',
  EmcWebScreen: 'EmcWebScreen',
  ToolboxScreen: 'ToolboxScreen',
  SplashScreen: 'SplashScreen',
  SignInScreen: 'SignInScreen',
  SignOutScreen: 'SignOutScreen',
  HubInviteScreen: 'HubInviteScreen',
  HubActivateScreen: 'HubActivateScreen',
  PatientListScreen: 'PatientListScreen',
  NewHubScreen: 'NewHubScreen',
  AppointmentsScreen: 'AppointmentsScreen',
  SignPdfScreen: 'SignPdfScreen',
  WatchScreen: 'WatchScreen',
  MemberScreen: 'MemberScreen',
  NotificationHistoryScreen: 'NotificationHistoryScreen',
  DocManagerScreen: 'IntakeScreen',
  DME: 'DME',
  AskDeb: 'Ask Al',
  VideoChat: 'VideoChatScreen',
  Help: 'Help',
  QRScreen: 'QRScreen',
  HubInviteListScreen: 'HubInviteListScreen',
  SurveyScreen: 'SurveyScreen',
};

const colors = {
  red: '#FC4349',
  green: '#8CC63F',
  //   orange: '#ffa500',

  white: '#ffffff',
  lighter: '#F1F5FC',
  light: '#dee4e7',
  dark: '#777777',
  darker: '#213249',
  black: '#000000',

  background: '#ffffff',
  border: '#ced4da',
  placeHolderText: '#555555',
  error: '#FC4349',
  alert: '#FC4349',
  valid: '#009900',
  textBlack: '#000000',

  base: '#445878',
  primary: '#799AE0',
  pink: '#FF87C3',
  grey: '#9dafc8',
  darkGrey: '#202020',
  darkBlue: '#1B4581',
  cash: '#FF87C3',
  // nzSecurities: '#799AE0',
  property: '#92CDCF',
  // nzEquities: '#8CC63F',
  // ausEquities: '#DECD58',
  // globalEquities: '#FFAA4A',
  // altStrategies: '#FC4349',
  // globalDebtSecurities: '#213249',
  // from toolbox
  turquoise: '#1abc9c',
  // emerald: '#2ecc71',
  peterRiver: '#3498db',
  // amethyst: '#9b59b6',
  // wetAsphalt: '#34495e',
  greenSea: '#16a085',
  nephritis: '#27ae60',
  belizeHole: '#2980b9',
  wisteria: '#8e44ad',
  // midnightBlue: '#2c3e50',
  sunFlower: '#f1c40f',
  // carrot: '#e67e22',
  // alizarin: '#e74c3c',
  // clouds: '#ecf0f1',
  // concrete: '#95a5a6',
  orange: '#f39c12',
  pumpkin: '#d35400',
  // pomegranate: '#c0392b',
  silver: '#bdc3c7',
  asbestos: '#7f8c8d',

  ochActivityIndicator: '#f09b88',

  ochBlue: '#237aff', // #4073bf
  ochBG: '#579AFF',
  //Triadic Colors of #3578e5
  ochBlueTri2: '#e53578',
  ochBlueTri3: '#78e535',
  // Analogous Colors of #3578e5
  ochBlueA1: '#4a35e5',
  ochBlueA2: '#35d0e5',
  // Monochromatic Colors of #3578e5',
  ochBlueM3: '#1754b6',
  ochBlueM2: '#1a5ecd',
  ochBlueM1: '#1e69e2',
  // ochBlueM4: '#3578e5',
  ochBlueP1: '#4c87e8',
  ochBlueP2: '#6296eb',
  ochBlueP3: '#79a5ee',
  // Complementary Color
  ochBlueComp: '#e5a235',
  ochRedBG: '#ec71a0',
  buttonText: '#000000',
  buttonBorder: '#c5c5cf',
};
interface IStyles {
  container: ViewStyle;
  toolboxGrid: CSSProperties;
  toolboxItemBoxInt: CSSProperties;
  toolboxItemBox: CSSProperties;
  toolboxItemName: CSSProperties;
  updateItemBox: CSSProperties;
  updateItemName: CSSProperties;
  splashScreenContainer: CSSProperties;
  signinBtnContainer: ViewStyle;
  fullScreenContainer: CSSProperties;
  signinBtnItems: CSSProperties;
  signinBtnIntro: TextStyle;
  btnText: TextStyle;
  leftBigText: TextStyle;
  fillerSpace: TextStyle;
  signinAlertText: TextStyle;
  signinText: TextStyle;
  noticeText: TextStyle;
  signinBtn: CSSProperties;
  signinBtnInact: CSSProperties;
  iconStyle: CSSProperties;
  iconStyleList: CSSProperties;
  tileIconStyle: CSSProperties;
  iconStyleBadge: ViewStyle;
  iconStyleBadgeText: TextStyle;
  backButton: CSSProperties;
  spinningQRCode: CSSProperties;
  inputContainer: CSSProperties;
  textInput: CSSProperties;
  textInput2: TextStyle;
  hFlex: ViewStyle;
  flexRow: ViewStyle;
  label: TextStyle;
  smallLabel: TextStyle;
  vFlexContainer: ViewStyle;
  flex1: ViewStyle;
  w100s: ViewStyle;
  activityIndicatorStyle: ViewStyle;
  embeddedWeb: CSSProperties;
  imageMessage: CSSProperties;
  imagePDF: CSSProperties;
  dcStyle: CSSProperties;
  dcStyleWidth: CSSProperties;
  headerIcon: CSSProperties;
  genericPushButton: CSSProperties;
  genericPushButtonReverse: CSSProperties;
  genericPushButtonVS: ViewStyle;
  genericPushButtonVSReverse: ViewStyle;
  headerRightStyle: ViewStyle;
  customModelStyles: any;
  docCustomModelStyles: any;
  ochWorkWindow: any;
  ochBanner: any;
  ochWorkWindowCenter: any;
  formText: TextStyle;
}

const styles: IStyles = {
  customModelStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  docCustomModelStyles: {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: '10%',
      // marginRight: '-50%',
      transform: 'translate(-50%, -70%)',
    },
  },
  activityIndicatorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  embeddedWeb: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // height: "1000@vs",
    // width: "1000@ms",
  },
  flex1: {
    flex: 1,
  },
  w100s: {
    width: '100%',
    // width: '100@s',
  },
  toolboxGrid: {
    marginTop: 10,
    flex: 1,
  },
  toolboxItemBoxInt: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
  toolboxItemBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    // padding: '10@ms',
    // height: '150@vs',
  },
  toolboxItemName: {
    fontSize: 17,
    // color: '#fff',
    // fontWeight: '900',
    height: '40@vs',
    // margin: 10,
    marginLeft: 10,
    marginRight: 3,
    marginTop: 0,
    marginBottom: 10,
    // xxFontFamily: 'ChalkboardSE-Bold',
    // xxFontFamily: 'Avenir-BlackOblique', // TODO: remove fonts in V2 - expected opinions to oscillate for now
    // xxFontFamily: 'Copperplate-Bold',
    // fontFamily: 'DamascusBold',
    fontFamily: 'Futura',
    //  xx   fontFamily: 'Georgia-Bold',
    // fontFamily: 'GillSans-Bold',
    // fontFamily: 'Kailasa-Bold',
    // fontFamily: 'Menlo-Bold',
    // fontFamily: 'Optima-Bold',
    // fontFamily: 'Verdana-Bold',

    color: 'black',
    alignContent: 'center',
    // marginBottom: 1,
  },
  updateItemBox: {
    height: '80@vs',
    backgroundColor: colors.orange,
  },
  updateItemName: {
    color: colors.white,
  },
  iconStyleList: {
    width: '30@ms',
    height: '34@vs',
    // margin: '5@ms',
    fontSize: 30,
  },
  vFlexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100@vs',
    display: 'flex',
    flexDirection: 'column',
    // color: '#fff',
  },
  splashScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darker,
    minHeight: '100@vs',
    display: 'flex',
    flexDirection: 'column',
    // color: '#fff',
  },
  noticeText: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    marginLeft: 20,
  },
  signinBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genericPushButton: {
    backgroundColor: colors.ochBlue,
    margin: 5,
  },
  genericPushButtonReverse: {
    backgroundColor: colors.ochBlueA2,
    margin: 5,
  },
  genericPushButtonVS: {
    backgroundColor: colors.ochBlue,
    margin: 5,
  },
  genericPushButtonVSReverse: {
    backgroundColor: colors.ochBlue,
    margin: 5,
  },
  fullScreenContainer: {
    // like signinBtnContainer but use full screen
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    // minHeight: '100%',
  },
  signinBtnItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinBtnIntro: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 24,
    bottom: 30,
    textAlign: 'center',
  },
  btnText: {
    // same as signinBtnIntro w/o margin
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 24,
    textAlign: 'center',
  },
  leftBigText: {
    // same as signinBtnIntro w/o margin
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 24,
    textAlign: 'left',
    margin: 10,
  },
  fillerSpace: {
    alignItems: 'center',
    flexGrow: 12,
    flex: 0,
  },
  signinAlertText: {
    fontWeight: 'bold',
    color: colors.alert,
    fontSize: 18,
    textAlign: 'center',
  },
  signinText: {
    color: colors.black,
    fontSize: 18,
    textAlign: 'center',
  },
  signinBtn: {
    textAlign: 'center',
    color: colors.white,
    margin: 5,
  },
  signinBtnInact: {
    textAlign: 'center',
    color: colors.white,
    opacity: 0.5,
  },
  iconStyle: {
    width: '34@ms',
    height: '34@vs',
    margin: '5@ms',
    fontSize: 20,
  },
  tileIconStyle: {
    width: '55@ms',
    height: '55@vs',
    margin: 0,
  },
  iconStyleBadge: {
    // On React Native < 0.57 overflow outside of parent will not work on Android,
    // see https://git.io/fhLJ8
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: '12@ms',
    height: '12@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyleBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    height: '44@vs',
    width: '44@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinningQRCode: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    height: 50,
    width: '100%',
    minWidth: '100%',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    color: colors.darker,
  },
  textInput2: {
    width: '100%',
    minWidth: '100%',
    alignItems: 'center',
    fontSize: 25,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: colors.darker,
    backgroundColor: colors.white,
  },
  hFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  smallLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageMessage: {
    width: '300px',
    height: '300px',
    marginLeft: '20px',
  },
  imagePDF: {
    width: '95vw',
    height: '95vh',
    marginLeft: '10px',
  },
  dcStyle: {
    maxHeight: '630@vs',
    width: '320@s',
    padding: '2%',
    // paddingBottom: 105,
  },
  dcStyleWidth: {
    width: '320@s',
    // paddingBottom: 105,
  },
  headerIcon: {
    borderRadius: 20,
    padding: 0,
    backgroundColor: colors.ochBlue,
    margin: 0,
  },
  headerRightStyle: {
    flexDirection: 'row',
    margin: 1,
  },
  ochWorkWindow: {
    // height: '540@vs',
    // width: '350@s',
    // width: '100%',
    width: '95vw',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'flex-start',
  },
  ochWorkWindowCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  ochBanner: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // width: '90%',
    backgroundColor: colors.grey,

    marginHorizontal: 0,
    marginVertical: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    // minWidth: '100%',
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  formText: {
    fontSize: normalize(21),
    color: colors.black,
  },
};

const sounds = {
  beep: 'beep',
  gong: 'gong',
  Radar: 'Radar',
  Beacon: 'Beacon',
};

export {colors, styles, screens, sounds};
