/***********************************************************************EMCL2022
 *
 * Matrix.tsx
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

import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';

import {colors} from './styles';
import {InfoButton} from './components/InfoButton';
import {RadioButtonGroup} from './RadioButtonGroup';
import {SurveyAnswerDict} from './SurveyTypes';

export const Matrix = (props: {
  question: any;
  styles: {[k: string]: ViewStyle | TextStyle};
  answers: SurveyAnswerDict;
  updateAnswers: (ansDict: SurveyAnswerDict, dbg?: string) => void;
  disableColumnSet?: boolean;
  viewMode: boolean;
}) => {
  // const [value, setValue] = useState<string>(props.value);
  const {answers, question, updateAnswers, disableColumnSet = false} = props;
  const {rows, columns, title, questionId, info} = question;
  const {questionTextStyle, containerStyle} = props.styles;

  React.useEffect(() => {
    console.log('selectedRenderMatrix', question);
    console.log('selectedRenderMatrix 608', {
      rows,
      columns,
      title,
      questionId,
      // tabAnswerDict,
    });
    console.log('etg622', {answers});
  }, [answers, columns, props, question, questionId, rows, title]);

  const columnWidth = 100 / (columns.length + 2);
  const rowTitleWidth = columnWidth * 2;

  return (
    <View
      key={`matrix-${questionId}`}
      style={[
        containerStyle,
        {width: '100%', backgroundColor: '#FFF', padding: '5%'},
      ]}>
      <View style={{flexDirection: 'row'}}>
        <InfoButton iconColor={colors.ochBlue} text={info} />
        <Text style={questionTextStyle}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#DDD',
          borderBottomWidth: 1,
          paddingBottom: 10,
          paddingTop: 10,
          alignItems: 'flex-end',
        }}>
        <InfoButton iconColor={colors.white} text={info} />
        <View
          style={{
            width: `${rowTitleWidth}%`,
          }}></View>
        {columns.map((colItem, index) => {
          return (
            <View
              key={`colMap-${index}`}
              style={{
                width: `${columnWidth}%`,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  // fontSize: 20,
                }}>
                {colItem.optionText}
              </Text>
              {!disableColumnSet && rows.length > 1 && (
                <input
                  style={{
                    zoom: 1.5,
                  }}
                  checked={false}
                  type="checkbox"
                  onChange={() => {
                    console.log('onChange -');
                    if (!props.viewMode) {
                      const a: SurveyAnswerDict = {};
                      rows.forEach((rowItem, _index) => {
                        console.log('Check ', {rowItem, colItem});
                        a[rowItem.id] = colItem.id;
                      });
                      updateAnswers(a, '107');
                      console.log('Check ');
                    }
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
      {rows.map((item, index) => {
        console.log('rows.map 653', {
          item,
          index,
          answers,
          value: answers[item.id] ?? '',
          columns,
        });
        const value: string = (answers[item.id] ?? '') as string;
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#DDD',
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 10,
            }}
            key={`rMap-${index}`}>
            <InfoButton iconColor={colors.ochBlue} text={item.info} />
            <View
              style={{
                width: `${rowTitleWidth}%`,
              }}>
              <Text style={{fontWeight: 'bold'}}>{item.optionText}</Text>
            </View>
            <RadioButtonGroup
              value={value}
              data={columns}
              columnWidth={columnWidth}
              editable={!props.viewMode}
              onPress={(answerId) => {
                const a: SurveyAnswerDict = {};
                a[item.id] = answerId;
                updateAnswers(a, '698');
              }}></RadioButtonGroup>
          </View>
        );
      })}
    </View>
  );
};
