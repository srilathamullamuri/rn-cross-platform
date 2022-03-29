/***********************************************************************EMCL2022
 *
 * SurveyWidget.tsx
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
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet as StyleSheet} from 'react-native-size-matters';

import {SurveyAnswerDict} from './SurveyTypes';
import {SimpleSurveyTab} from './SimpleSurveyTab';
import {colors} from './styles';
import {InfoButton} from './components/InfoButton';

interface IRowProps {
  surveyTab: any;
  surveyAnswer: SurveyAnswerDict;
  sendSurveyRes: (item: any, status: string) => void;
  onAnswer: (item: any) => void;
  viewMode?: boolean;
}

// this is the question set for a single tab displayed in one view
export const SurveyWidget = (props: IRowProps) => {
  const [surveyAnswer, setSurveyAns] = React.useState<SurveyAnswerDict>(
    props.surveyAnswer,
  );
  const [, setUnsavedAnswers] = React.useState<SurveyAnswerDict>({});
  React.useEffect(() => {
    setSurveyAns(props.surveyAnswer);
  }, [props.surveyAnswer]);

  const renderButton = (data, index, isSelected, onPress) => {
    return (
      <View
       key={`selection_button_view_${index}`}
       style={[
        stylesLocal.container,
         {
           display:'flex',
         backgroundColor: '#FFF', 
         padding: '5%',
         paddingBottom: 10,
         paddingTop: 5,
         flex: 1,
         flexDirection: 'row',
        overflow:'visible',
        },
       ]}>
       <View><TouchableOpacity
          key={index}
          onPress={onPress}
          style={[
            {
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight:10,
              marginLeft: 10,
            },
          ]}>
          {isSelected ? (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }}
            />
          ) : null}
        </TouchableOpacity></View>
        <View key={`selection_button_view2_${index}`} style={{flexDirection: 'row', width: '50%', 
        paddingBottom:10,
        borderBottomColor: '#DDD',
         borderBottomWidth: 1
         }}>
         <Text key={`selection_button_text_${index}`} style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>{data.optionText}</Text>
       </View>
     </View>
    );
  };

  const renderQuestionText = (questionText) => {
    return (
      <View style={[
        stylesLocal.container,
         {width: '100%', backgroundColor: '#FFF', paddingLeft: '5%', flexDirection: 'row'},
       ]}>
        <InfoButton key={`selection_button_InfoButton`} iconColor={colors.ochBlue} text={questionText} />
        <Text style={stylesLocal.questionTextStyle}>{questionText}</Text>
      </View>
    );
  };

  // const surveyStatus = (answers) => {
  //   let status = 'Started';
  //   console.log(props);
  //   const countOfQuestions = props.surveyTab.reduce((sum, item) => {
  //     console.log(item);
  //     let addend = 1;
  //     switch (item.questionType) {
  //       case 'matrix':
  //         addend = item.rows.length;
  //         break;
  //       default:
  //     }
  //     return sum + addend;
  //   }, 0);

  //   if (countOfQuestions === Object.keys(answers).length) {
  //     status = 'Complete';
  //   }
  //   return status;
  // };

  // const onSurveyFinished = (answers) => {
  //   setSurveyAns([]);
  //   const status = surveyStatus(answers);
  //   props.sendSurveyRes(answers, status);
  //   // props.next();
  // };

  /**
   * manage survey widget answers changed.
   * store in local variable until saved or discarded.
   * @param answers
   */
  const onAns = (answers) => {
    setUnsavedAnswers(answers);
    props.onAnswer(answers);
  };

  return (
    <View style={stylesLocal.rowContainer}>
      <View style={[stylesLocal.row, {width: '100%'}]}>
        <SimpleSurveyTab
          surveyTab={props.surveyTab}
          surveyAnswer={surveyAnswer}
          onAnswerChanged={onAns}
          styles={stylesLocal}
          renderQuestionText={renderQuestionText}
          renderSelector={renderButton}
          viewMode={props.viewMode}
        />
        {/* <!---  tab navigation belongs here. no - a layer higher! /> */}
      </View>
    </View>
  );
};

// TODO: Move NORTH Out of package
const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    width:'82vw',
    padding: 10,
  },
  rowContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    // marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionBox: {
    backgroundColor: colors.lighter,
    margin: 5,
    padding: 10,
    fontSize: 20,
    flex: 1,
    minWidth: '400px',
  },
  questionText: {
    marginBottom: 0,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  questionTextStyle: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  textPBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'green',
    borderRadius: 10,

    height: 300,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  navButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export const SURVEY_STATUS = {
  todo: 'Todo',
  started: 'Started',
  completed: 'Completed',
};

export default SurveyWidget;
