/***********************************************************************EMCL2022
 *
 * SurveyListScreen.tsx
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
 * Copyright (c) 2022, EMC Software
 *
 ***************************************************************************/

import * as React from 'react';
import {View, Text} from 'react-native';
import ReactTooltip from 'react-tooltip';
// import {ScaledSheet as StyleSheet} from 'react-native-size-matters';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table, TableWrapper, Row, Cell} from './components/Table';
import {ModalFile} from './components/ModalFile';
import {styles} from './styles';

// import styled from 'styled-components';
// import {useTable} from 'react-table';

export interface Props {
  list: any;
  showSurveyDetails: (item: any, surveyAnswerItem?: any) => void;
  showSurveyAnswerHistory: (item: any) => void;
  showPdf: (id: number) => void;
  reviseSurvey: (id: number) => void;
  modalFileUrl: string | undefined;
  // startNewResponse: (item: any) => void;
}

// eslint-disable-next-line react/prop-types
export const SurveyListScreen = (props: Props) => {
  const {modalFileUrl} = props;
  const headers = ['Assessment', 'Version', 'Actions'];
  const answerHeaders = ['Assessment Date', 'Status', 'Edit / View'];

  console.log('srilatha list', props?.list);

  return (
    <View style={localStyles.container}>
      {modalFileUrl && (
        <ModalFile
          url={modalFileUrl}
          onXClick={() => false}
          styles={{
            modStyle: styles.docCustomModelStyles,
            jpgStyle: styles.imagePDF,
          }}
          viewFileType="pdf"
        />
      )}
      <Table
        borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
        style={{width: '100%'}}>
        <Row
          data={headers}
          style={localStyles.head}
          textStyle={localStyles.text}
        />
        {props?.list?.map((item, i) => {
          return (
            <View style={{borderColor: '#c8e1ff', borderWidth: 1}} key={i}>
              <TableWrapper key={i} style={localStyles.row}>
                <Cell data={item.name} />
                <Cell data={item.version} />
                <Cell>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'center',
                    }}>
                    {item.answerSetId && item.final && (
                      <div data-tip={'View'}>
                        <ReactTooltip />
                        <FontAwesomeIcon
                          icon="eye"
                          color={colors.ochBlue}
                          onClick={() =>
                            props.showSurveyDetails(item, {
                              id: item.answerSetId,
                              bFinal: item.final,
                            })
                          }
                          style={localStyles.marginSides}
                        />
                      </div>
                    )}
                    {item.answerSetId && !item.final && (
                      <div data-tip={'Edit'}>
                        <ReactTooltip />
                        <FontAwesomeIcon
                          icon="edit"
                          color={colors.ochBlue}
                          onClick={() =>
                            props.showSurveyDetails(item, {
                              id: item.answerSetId,
                              bFinal: item.final,
                            })
                          }
                          style={localStyles.marginSides}
                        />
                      </div>
                    )}
                    <div data-tip={'History'}>
                      <ReactTooltip />
                      <FontAwesomeIcon
                        icon="history"
                        color={colors.ochBlue}
                        onClick={() => props.showSurveyAnswerHistory(item)}
                        style={localStyles.marginSides}
                      />
                    </div>
                    {item.answerSetId && item.final && (
                      <div data-tip={'Revise'}>
                        <ReactTooltip />
                        <FontAwesomeIcon
                          icon="tools"
                          color={colors.ochBlue}
                          style={localStyles.marginSides}
                          onClick={() => props.reviseSurvey(item.answerSetId)}
                        />
                      </div>
                    )}
                    {item.answerSetId && (
                      <div data-tip={'Report'}>
                        <ReactTooltip />
                        <FontAwesomeIcon
                          icon="file-pdf"
                          color={colors.ochBlue}
                          onClick={() => props.showPdf(item.answerSetId)}
                          style={localStyles.marginSides}
                        />
                      </div>
                    )}
                    {((item.answerSetId && item.final) ||
                      item.answerSetId === undefined) && (
                      <div data-tip={'New'}>
                        <ReactTooltip />
                        {((item.answerSetId && item.final) ||
                          item.answerSetId === undefined) && (
                          <FontAwesomeIcon
                            icon="plus-circle"
                            color={colors.ochBlue}
                            onClick={() => props.showSurveyDetails(item)}
                            style={localStyles.marginSides}
                          />
                        )}
                      </div>
                    )}
                  </View>
                </Cell>
              </TableWrapper>
              {item.surveyAnswerSet?.length > 0 && (
                <View style={{padding: '1%'}}>
                  <Table
                    borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
                    style={{width: '100%'}}>
                    <Row
                      data={answerHeaders}
                      style={localStyles.head}
                      textStyle={localStyles.text}
                    />
                    {item.surveyAnswerSet
                      ?.sort((a, b) => {
                        const aa: any = new Date(a.revision);
                        const bb: any = new Date(b.revision);
                        return aa - bb;
                      })
                      .reverse()
                      .map((surveyAnswerItem, i_) => {
                        const theDate = new Date(surveyAnswerItem.revision);
                        return (
                          <TableWrapper key={i_} style={localStyles.row}>
                            <Cell data={theDate.toLocaleString('en-US')} />
                            <Cell data={surveyAnswerItem.status} />
                            <Cell>
                              <View
                                style={{
                                  flex: 2,
                                  flexDirection: 'row',
                                  padding: 10,
                                  justifyContent: 'center',
                                }}>
                                {!surveyAnswerItem.bFinal && (
                                  <div data-tip={'Edit'}>
                                    <ReactTooltip />
                                    <FontAwesomeIcon
                                      icon="edit"
                                      color={colors.ochBlue}
                                      onClick={() =>
                                        props.showSurveyDetails(
                                          item,
                                          surveyAnswerItem,
                                        )
                                      }
                                      style={localStyles.marginSides}
                                    />
                                  </div>
                                )}  
                                {surveyAnswerItem.bFinal && (
                                  <div data-tip={'View'}>
                                    <ReactTooltip />
                                    <FontAwesomeIcon
                                      icon="eye"
                                      color={colors.ochBlue}
                                      onClick={() =>
                                        props.showSurveyDetails(
                                          item,
                                          surveyAnswerItem,
                                        )
                                      }
                                      style={localStyles.marginSides}
                                    />
                                  </div>
                                )}
                                {surveyAnswerItem.bFinal && (
                                  <div data-tip={'Revise'}>
                                    <ReactTooltip />
                                    <FontAwesomeIcon
                                      icon="tools"
                                      color={colors.ochBlue}
                                      style={localStyles.marginSides}
                                      onClick={() => props.reviseSurvey(surveyAnswerItem.id)}
                                    />
                                  </div>
                                )}
                                <div data-tip={'Report'}>
                                  <ReactTooltip />
                                  <FontAwesomeIcon
                                    icon="file-pdf"
                                    color={colors.ochBlue}
                                    onClick={() => props.showPdf(surveyAnswerItem.id)}
                                    style={localStyles.marginSides}
                                  />
                                </div>
                              </View>
                            </Cell>
                          </TableWrapper>
                        );
                      })}
                  </Table>
                </View>
              )}
              {item.surveyAnswerSet?.length <= 0 && (
                <View>
                  <Text style={{alignSelf: 'center'}}>No Document History</Text>
                </View>
              )}
            </View>
          );
        })}
      </Table>
    </View>
  );
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

const localStyles = {
  container: {
    flex: 1,
    padding: 10,
    width: '80vw',
  },
  tableColumnClockInOutTimes: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
    borderWidth: 1,
  },
  tableRow: {
    flex: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  tableContainer: {
    borderRadius: 5,
    flex: 1,
    marginTop: 0,
    padding: 10,
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textLineItem: {
    color: 'black',
  },
  marginSides: {
    marginLeft: 10,
    marginRight: 10,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
};

export default SurveyListScreen;
