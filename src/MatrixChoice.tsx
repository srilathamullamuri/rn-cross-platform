/***********************************************************************EMCL2022
 *
 * MatrixChoice.tsx
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
import {TextStyle, ViewStyle} from 'react-native';
import {SurveyAnswerDict} from './SurveyTypes';
import {Matrix} from './Matrix';

/* just like the matrix except only one choice can be made */
export const MatrixChoice = (props: {
  question: any;
  styles: {[k: string]: ViewStyle | TextStyle};
  answers: SurveyAnswerDict;
  updateAnswers: (ansDict: SurveyAnswerDict, dbg?: string) => void;
  viewMode: boolean;
}) => {
  // const [value, setValue] = useState<string>(props.value);
  const {answers, question, styles, updateAnswers} = props;
  const {rows, columns, title, questionId} = question;
  // const {questionTextStyle, containerStyle} = props.styles;
  const [tabAnswerDict, setTabAnswerDict] = React.useState<SurveyAnswerDict>(
    {},
  );

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

  React.useEffect(() => {
    // only pass the answer that matches questionId after parsing and rebuilding.
    const a = {};
    const words = (answers[questionId] as string)?.split(':');
    if (words?.length === 2) {
      a[words[0]] = words[1];
      setTabAnswerDict(a);
    }
  }, [answers, questionId]);

  // const columnWidth = 100 / (columns.length + 2);
  // const rowTitleWidth = columnWidth * 2;

  const updateAnswersIntercept = (ansDict: SurveyAnswerDict, dbg?: string) => {
    console.log('updateAnswersIntercept', {ansDict});
    // rebuild answer as answer of the entire question
    const [key, value] = Object.entries(ansDict)?.[0];
    const a = {};
    a[questionId] = `${key}:${value}`;
    updateAnswers(a, dbg);
  };

  return (
    <Matrix
      question={question}
      answers={tabAnswerDict}
      styles={styles}
      updateAnswers={updateAnswersIntercept}
      disableColumnSet={true}
      viewMode={props.viewMode}
    />
  );
};
