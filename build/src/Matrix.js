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
import { Text, View } from 'react-native';
import { colors } from './styles';
import { InfoButton } from './components/InfoButton';
import { RadioButtonGroup } from './RadioButtonGroup';
export var Matrix = function (props) {
    // const [value, setValue] = useState<string>(props.value);
    var answers = props.answers, question = props.question, updateAnswers = props.updateAnswers, _a = props.disableColumnSet, disableColumnSet = _a === void 0 ? false : _a;
    var rows = question.rows, columns = question.columns, title = question.title, questionId = question.questionId, info = question.info;
    var _b = props.styles, questionTextStyle = _b.questionTextStyle, containerStyle = _b.containerStyle;
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
    var columnWidth = 100 / (columns.length + 2);
    var rowTitleWidth = columnWidth * 2;
    return (React.createElement(View, { key: "matrix-".concat(questionId), style: [
            containerStyle,
            { width: '100%', backgroundColor: '#FFF', padding: '5%' },
        ] },
        React.createElement(View, { style: { flexDirection: 'row' } },
            React.createElement(InfoButton, { iconColor: colors.ochBlue, text: info }),
            React.createElement(Text, { style: questionTextStyle }, title)),
        React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#DDD',
                borderBottomWidth: 1,
                paddingBottom: 10,
                paddingTop: 10,
                alignItems: 'flex-end',
            } },
            React.createElement(InfoButton, { iconColor: colors.white, text: info }),
            React.createElement(View, { style: {
                    width: "".concat(rowTitleWidth, "%"),
                } }),
            columns.map(function (colItem, index) {
                return (React.createElement(View, { key: "colMap-".concat(index), style: {
                        width: "".concat(columnWidth, "%"),
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    } },
                    React.createElement(Text, { style: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            // fontSize: 20,
                        } }, colItem.optionText),
                    !disableColumnSet && rows.length > 1 && (React.createElement("input", { style: {
                            zoom: 1.5,
                        }, checked: false, type: "checkbox", onChange: function () {
                            console.log('onChange -');
                            if (!props.viewMode) {
                                var a_1 = {};
                                rows.forEach(function (rowItem, _index) {
                                    console.log('Check ', { rowItem: rowItem, colItem: colItem });
                                    a_1[rowItem.id] = colItem.id;
                                });
                                updateAnswers(a_1, '107');
                                console.log('Check ');
                            }
                        } }))));
            })),
        rows.map(function (item, index) {
            var _a, _b;
            console.log('rows.map 653', {
                item: item,
                index: index,
                answers: answers,
                value: (_a = answers[item.id]) !== null && _a !== void 0 ? _a : '',
                columns: columns,
            });
            var value = ((_b = answers[item.id]) !== null && _b !== void 0 ? _b : '');
            return (React.createElement(View, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: '#DDD',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    paddingTop: 10,
                }, key: "rMap-".concat(index) },
                React.createElement(InfoButton, { iconColor: colors.ochBlue, text: item.info }),
                React.createElement(View, { style: {
                        width: "".concat(rowTitleWidth, "%"),
                    } },
                    React.createElement(Text, { style: { fontWeight: 'bold' } }, item.optionText)),
                React.createElement(RadioButtonGroup, { value: value, data: columns, columnWidth: columnWidth, editable: !props.viewMode, onPress: function (answerId) {
                        var a = {};
                        a[item.id] = answerId;
                        updateAnswers(a, '698');
                    } })));
        })));
};
//# sourceMappingURL=Matrix.js.map