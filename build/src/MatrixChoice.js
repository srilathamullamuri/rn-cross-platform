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
import { Matrix } from './Matrix';
/* just like the matrix except only one choice can be made */
export var MatrixChoice = function (props) {
    // const [value, setValue] = useState<string>(props.value);
    var answers = props.answers, question = props.question, styles = props.styles, updateAnswers = props.updateAnswers;
    var rows = question.rows, columns = question.columns, title = question.title, questionId = question.questionId;
    // const {questionTextStyle, containerStyle} = props.styles;
    var _a = React.useState({}), tabAnswerDict = _a[0], setTabAnswerDict = _a[1];
    React.useEffect(function () {
        console.log('selectedRenderMatrix', question);
        console.log('selectedRenderMatrix 608', {
            rows: rows,
            columns: columns,
            title: title,
            questionId: questionId,
            // tabAnswerDict,
        });
        console.log('etg622', { answers: answers });
    }, [answers, columns, props, question, questionId, rows, title]);
    React.useEffect(function () {
        var _a;
        // only pass the answer that matches questionId after parsing and rebuilding.
        var a = {};
        var words = (_a = answers[questionId]) === null || _a === void 0 ? void 0 : _a.split(':');
        if ((words === null || words === void 0 ? void 0 : words.length) === 2) {
            a[words[0]] = words[1];
            setTabAnswerDict(a);
        }
    }, [answers, questionId]);
    // const columnWidth = 100 / (columns.length + 2);
    // const rowTitleWidth = columnWidth * 2;
    var updateAnswersIntercept = function (ansDict, dbg) {
        var _a;
        console.log('updateAnswersIntercept', { ansDict: ansDict });
        // rebuild answer as answer of the entire question
        var _b = (_a = Object.entries(ansDict)) === null || _a === void 0 ? void 0 : _a[0], key = _b[0], value = _b[1];
        var a = {};
        a[questionId] = "".concat(key, ":").concat(value);
        updateAnswers(a, dbg);
    };
    return (React.createElement(Matrix, { question: question, answers: tabAnswerDict, styles: styles, updateAnswers: updateAnswersIntercept, disableColumnSet: true, viewMode: props.viewMode }));
};
//# sourceMappingURL=MatrixChoice.js.map