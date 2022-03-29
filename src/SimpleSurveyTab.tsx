/***********************************************************************EMCL2022
 *
 * SimpleSurveyTab.tsx
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
import {View, Text, TextInput} from 'react-native';
import {colors} from './styles';
// import {CheckBox} from 'react-native-elements';
import {Matrix} from './Matrix';
import {MatrixChoice} from './MatrixChoice';
// import PropTypes from 'prop-types';

import {SelectionHandler, SelectionGroup} from './SelectionGroup';
import {SurveyAnswerDict, SurveyQuestion} from './SurveyTypes';
interface Props {
  surveyTab: SurveyQuestion[];
  onAnswerChanged: (ans: SurveyAnswerDict) => void;
  styles: {[k: string]: any}; // any because too many different styles
  surveyAnswer: SurveyAnswerDict; // Answers to all questions in all tabs of survey (read only)
  renderQuestionText(questionText: string): React.ReactNode;
  renderSelector: any;
  viewMode?: boolean;
}

// control details of current survey tab.
export const SimpleSurveyTab = (props: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const [selectionHandlers, setSelectionHandlers] = React.useState<any>([]);
  // current answers to questions on this tab, initialized from global set.
  const [tabAnswerDict, setTabAnswerDict] = React.useState<SurveyAnswerDict>(
    {},
  );
  const styles = props.styles;
  React.useEffect(() => {
    // extract questionIds in this tab
    console.log('questionKeys!!', {
      a: props.surveyAnswer,
      s: props.surveyTab,
      // tabAnswerDict,
    });

    const questionKeys: string[] = [];
    props.surveyTab?.forEach((q) => {
      if (q.questionType.toLocaleLowerCase() === 'matrix') {
        const qRows = q.rows || [];
        questionKeys.push(...qRows.map((qRow) => qRow.id));
      } else {
        questionKeys.push(q.questionId);
      }
    });
    console.log('questionKeys!!', {questionKeys});

    const currentAnswers: SurveyAnswerDict = {};
    if (Array.isArray(props.surveyAnswer)) {
      props.surveyAnswer.forEach((ansDict) => {
        console.log({ansDict});
        const keys = Object.keys(ansDict);
        questionKeys.forEach((q) => {
          if (keys.includes(q)) {
            currentAnswers[q] = ansDict[q];
            console.log({currentAnswers});
          }
        });
      });
    } else {
      const keys =
        (props.surveyAnswer && Object.keys(props.surveyAnswer)) || [];
      questionKeys.forEach((q) => {
        console.log('questionKeys', {q});
        if (q && keys.includes(q.toString())) {
          currentAnswers[q] = props.surveyAnswer[q];
          console.log({currentAnswers});
        }
      });
    }
    console.log('questionKeys!!', {currentAnswers});
    setTabAnswerDict(currentAnswers);
    setCurrentQuestionIndex(0);
    setSelectionHandlers([]);
  }, [props.surveyAnswer, props.surveyTab]);

  React.useEffect(() => {
    console.log('questionKeys- surveyAnswer!!', {
      surveyAnswer: props.surveyAnswer,
    });
  }, [props.surveyAnswer]);

  React.useEffect(() => {
    console.log('questionKeys- survey!!', {survey: props.surveyTab});
  }, [props.surveyTab]);

  const updateAnswers = (ans: SurveyAnswerDict, _dbg = '') => {
    console.log('updateAnswers', {ans, _dbg});
    const ansTmp: SurveyAnswerDict = {...tabAnswerDict, ...ans};
    console.log('684', {ansTmp});
    setTabAnswerDict(ansTmp); // Do I need both? probably not.
    props.onAnswerChanged(ansTmp);
  };
  // called every time a single answer changes
  const updateAnswer = (questionId, value, _dbg = '') => {
    const ansTmp: SurveyAnswerDict = {};
    ansTmp[questionId] = value;
    updateAnswers(ansTmp);
  };

  const validateSelectionGroupSettings = (questionSettings) => {
    if (!questionSettings) return;
    const {allowDeselect} = questionSettings;
    if (allowDeselect !== undefined && typeof allowDeselect !== 'boolean') {
      throw new Error(
        `allowDeselect was not passed in as a boolean for question ${currentQuestionIndex}`,
      );
    }
  };

  const renderSelectionGroup = (question) => {
    const {renderSelector, styles} = props;
    const selectionGroupContainerStyle = styles.selectionGroupContainerStyle;
    const currentAnsKey = (tabAnswerDict[question.questionId] ?? '') as string;
    const index = question.options.findIndex(
      (element) => parseInt(element.value) === parseInt(currentAnsKey),
    );
    question.questionSettings = {
      defaultSelection: index,
    };

    validateSelectionGroupSettings(question.questionSettings);

    const selectionHandlersTemp = selectionHandlers;
    if (!selectionHandlersTemp[question.questionId]) {
      if (!question.questionSettings) {
        selectionHandlersTemp[question.questionId] = new SelectionHandler({
          maxMultiSelect: 1,
          allowDeselect: true,
          defaultSelection: null,
        });
        setSelectionHandlers(selectionHandlersTemp);
      } else {
        const {allowDeselect, defaultSelection} = question.questionSettings;

        if (
          defaultSelection !== undefined &&
          typeof defaultSelection !== 'number'
        ) {
          throw new Error(
            `Default Selection not specified as an index for question ${question.questionId}`,
          );
        }

        const options: any = {};
        options.maxMultiSelect = 1;
        options.allowDeselect =
          allowDeselect === undefined || allowDeselect === true;
        options.defaultSelection =
          defaultSelection !== undefined ? defaultSelection : null;
        const selectionHandlersTemp = selectionHandlers;
        selectionHandlersTemp[question.questionId] = new SelectionHandler(
          options,
        );
        setSelectionHandlers(selectionHandlersTemp);
        if (typeof options.defaultSelection === 'number') {
          updateAnswer(
            question.questionId,
            question.options[options.defaultSelection]?.value,
            '383',
          );
        }
      }
    }

    return (
      <View style={styles.containerStyle}>
        {props.renderQuestionText
          ? props.renderQuestionText(question.questionText)
          : null}
        <SelectionGroup
          onPress={selectionHandlersTemp[question.questionId].selectionHandler}
          items={question.options}
          isSelected={selectionHandlersTemp[question.questionId].isSelected}
          renderContent={renderSelector}
          containerStyle={selectionGroupContainerStyle}
          onItemSelected={(item) => {
            updateAnswer(question.questionId, item.value, '405');
          }}
          onItemDeselected={() => {
            updateAnswer(question.questionId, null, '409');
          }}
          isDeselected={undefined}
          getAllSelectedItemIndexes={undefined}
          attributes={undefined}
          editable={!!props.viewMode}
        />
      </View>
    );
  };

  const renderMultipleSelectionGroup = (question) => {
    const {renderSelector, styles} = props;
    const selectionGroupContainerStyle = styles.selectionGroupContainerStyle;
    validateSelectionGroupSettings(question.questionSettings);
    const currentAnsKey = tabAnswerDict[question.questionId] as any;
    const index = currentAnsKey?.map((j: any) => {
        return question.options.findIndex((ele) => {
          return ele.value === j.value;
        });
      }) || [];
    question.questionSettings = {
      defaultSelection: index,
      maxMultiSelect: 3,
    };
    const selectionHandlersTemp = selectionHandlers;
    if (!selectionHandlersTemp[question.questionId]) {
      if (!question.questionSettings) {
        selectionHandlersTemp[question.questionId] = new SelectionHandler({
          maxMultiSelect: 3,
          allowDeselect: true,
          defaultSelection: null,
        });
        setSelectionHandlers(selectionHandlersTemp);
      } else {
        const {allowDeselect, defaultSelection} = question.questionSettings;

        const multiSelectMax = Number(question.questionSettings.maxMultiSelect);
        if (
          defaultSelection !== undefined &&
          !Array.isArray(defaultSelection)
        ) {
          throw new Error(
            `Default Selection not specified as an array for multiple selection question ${question.questionId}`,
          );
        }
        const options: any = {};
        options.maxMultiSelect = multiSelectMax;
        options.allowDeselect =
          allowDeselect === undefined || allowDeselect === true;
        options.defaultSelection =
          defaultSelection !== undefined ? defaultSelection : null;
        selectionHandlersTemp[question.questionId] = new SelectionHandler(
          options,
        );
        setSelectionHandlers(selectionHandlersTemp);
        if (Array.isArray(options.defaultSelection)) {
          // Set timeout is used here to avoid updateAnswer's call to set
          setTimeout(
            () =>
              updateAnswer(
                question.questionId,
                question.options.filter((element, index) =>
                  options.defaultSelection.includes(index),
                ),
                '468',
              ),
            0,
          );
        }
      }
    }

    return (
      <View style={styles.containerStyle}>
        {props.renderQuestionText
          ? props.renderQuestionText(question.questionText)
          : null}
        <SelectionGroup
          onPress={selectionHandlersTemp[question.questionId].selectionHandler}
          items={question.options}
          isSelected={selectionHandlersTemp[question.questionId].isSelected}
          getAllSelectedItemIndexes={
            selectionHandlersTemp[question.questionId].getAllSelectedItemIndexes
          }
          renderContent={renderSelector}
          containerStyle={selectionGroupContainerStyle}
          onItemSelected={(item, allSelectedItems) => {
            console.log('srilatha allSelectedItems', allSelectedItems);
            updateAnswer(question.questionId, allSelectedItems, '500');
          }}
          onItemDeselected={(item, allSelectedItems) => {
            updateAnswer(question.questionId, allSelectedItems, '508');
          }}
          isDeselected={undefined}
          attributes={undefined}
          editable={!!props.viewMode}
        />
      </View>
    );
  };

  const updateDefaultAnswer = (question) => {
    const {questionId, defaultValue} = question;
    defaultValue ??
      tabAnswerDict[questionId] ??
      (tabAnswerDict[questionId] !== defaultValue &&
        updateAnswer(questionId, defaultValue));
  };

  const showWidgetType = (question) => {
    console.log('SimpleSurveyTab - 538 ', {
      question,
    });
    const questionType = question.questionType?.toLowerCase();
    const answerString = (tabAnswerDict[question?.questionId] as string) || '';
    console.log('Styles available: ', Object.keys(styles));
    switch (questionType) {
      case 'selectiongroup':
        return renderSelectionGroup(question);
      case 'multipleselectiongroup':
        return renderMultipleSelectionGroup(question);
      case 'textinput':
        // return renderTextInputElement(question);
        updateDefaultAnswer(question); // TODO: above?
        // TODO: push into component??
        return (
          <View key={question.questionId} style={styles.questionBox}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <TextInput
              style={styles.textBox}
              onChangeText={(value) =>
                updateAnswer(question.questionId, value, '415')
              }
              underlineColorAndroid={'white'}
              placeholder={question.placeholder}
              placeholderTextColor={colors.placeHolderText}
              keyboardType={'numeric'}
              value={answerString}
              onBlur={() => console.log('blurred TDB')}
              blurOnSubmit
              returnKeyType="done"
              editable={!props.viewMode}
            />
          </View>
        );
      case 'paragraphinput':
        return (
          <View key={question.questionId} style={styles.questionBox}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <TextInput
              style={[styles.textBox, {height: 250}]}
              onChangeText={(value) =>
                updateAnswer(question.questionId, value, '415')
              }
              underlineColorAndroid={'white'}
              placeholder={question.placeholder}
              placeholderTextColor={colors.placeHolderText}
              keyboardType={'numeric'}
              value={answerString}
              onBlur={() => console.log('blurred TDB')}
              blurOnSubmit
              multiline={true}
              // numberOfLines="10"
              returnKeyType="done"
              editable={!props.viewMode}
            />
          </View>
        );
      case 'numericinput':
        return (
          <View key={question.questionId} style={styles.questionBox}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <TextInput
              style={styles.numericInput}
              onChangeText={(value) => {
                const valInt = parseInt(value, 10);
                if (Number.isInteger(valInt)) {
                  updateAnswer(question.questionId, valInt, '556');
                } else if (value === '') {
                  updateAnswer(question.questionId, '', '555');
                }
              }}
              underlineColorAndroid={'white'}
              value={answerString}
              placeholder={question.placeholder}
              placeholderTextColor={colors.placeHolderText}
              keyboardType={'numeric'}
              onBlur={() => console.log('blurred TDB')}
              blurOnSubmit
              maxLength={3}
            />
          </View>
        );
      case 'info':
        return (
          <Text style={[styles.questionBox, {minWidth: '100%'}]}>
            {question.questionText}
          </Text>
        );
      case 'matrix':
        return (
          <Matrix
            question={question}
            answers={tabAnswerDict}
            styles={{
              questionTextStyle: styles.questionTextStyle,
              containerStyle: styles.containerStyle,
            }}
            updateAnswers={updateAnswers}
            viewMode={!!props.viewMode}
          />
        );
      case 'matrixchoice':
        return (
          <MatrixChoice
            question={question}
            answers={tabAnswerDict}
            styles={{
              questionTextStyle: styles.questionTextStyle,
              containerStyle: styles.containerStyle,
            }}
            viewMode={!!props.viewMode}
            updateAnswers={updateAnswers}
          />
        );
      // case 'matrixChoice':
      //   // a matrix of answers to one question.
      //   return renderMatrixChoice();
      default:
        console.error('728 - UNKNOWN QuestionType', {questionType});
        return <View />;
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-around',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%',
      }}
      key={`sst-${props.surveyTab?.[0]?.questionId}`}>
      {props.surveyTab?.map((question) => {
        console.log('loop thru sub q 648: ', {question});
        return showWidgetType(question);
      })}
    </View>
  );
};
