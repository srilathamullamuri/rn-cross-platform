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
import { __assign } from "tslib";
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from './styles';
// import {CheckBox} from 'react-native-elements';
import { Matrix } from './Matrix';
import { MatrixChoice } from './MatrixChoice';
// import PropTypes from 'prop-types';
import { SelectionHandler, SelectionGroup } from './SelectionGroup';
// control details of current survey tab.
export var SimpleSurveyTab = function (props) {
    var _a, _b, _c;
    var _d = React.useState(0), currentQuestionIndex = _d[0], setCurrentQuestionIndex = _d[1];
    var _e = React.useState([]), selectionHandlers = _e[0], setSelectionHandlers = _e[1];
    // current answers to questions on this tab, initialized from global set.
    var _f = React.useState({}), tabAnswerDict = _f[0], setTabAnswerDict = _f[1];
    var styles = props.styles;
    React.useEffect(function () {
        var _a;
        // extract questionIds in this tab
        console.log('questionKeys!!', {
            a: props.surveyAnswer,
            s: props.surveyTab,
            // tabAnswerDict,
        });
        var questionKeys = [];
        (_a = props.surveyTab) === null || _a === void 0 ? void 0 : _a.forEach(function (q) {
            if (q.questionType.toLocaleLowerCase() === 'matrix') {
                var qRows = q.rows || [];
                questionKeys.push.apply(questionKeys, qRows.map(function (qRow) { return qRow.id; }));
            }
            else {
                questionKeys.push(q.questionId);
            }
        });
        console.log('questionKeys!!', { questionKeys: questionKeys });
        var currentAnswers = {};
        if (Array.isArray(props.surveyAnswer)) {
            props.surveyAnswer.forEach(function (ansDict) {
                console.log({ ansDict: ansDict });
                var keys = Object.keys(ansDict);
                questionKeys.forEach(function (q) {
                    if (keys.includes(q)) {
                        currentAnswers[q] = ansDict[q];
                        console.log({ currentAnswers: currentAnswers });
                    }
                });
            });
        }
        else {
            var keys_1 = (props.surveyAnswer && Object.keys(props.surveyAnswer)) || [];
            questionKeys.forEach(function (q) {
                console.log('questionKeys', { q: q });
                if (q && keys_1.includes(q.toString())) {
                    currentAnswers[q] = props.surveyAnswer[q];
                    console.log({ currentAnswers: currentAnswers });
                }
            });
        }
        console.log('questionKeys!!', { currentAnswers: currentAnswers });
        setTabAnswerDict(currentAnswers);
        setCurrentQuestionIndex(0);
        setSelectionHandlers([]);
    }, [props.surveyAnswer, props.surveyTab]);
    React.useEffect(function () {
        console.log('questionKeys- surveyAnswer!!', {
            surveyAnswer: props.surveyAnswer,
        });
    }, [props.surveyAnswer]);
    React.useEffect(function () {
        console.log('questionKeys- survey!!', { survey: props.surveyTab });
    }, [props.surveyTab]);
    var updateAnswers = function (ans, _dbg) {
        if (_dbg === void 0) { _dbg = ''; }
        console.log('updateAnswers', { ans: ans, _dbg: _dbg });
        var ansTmp = __assign(__assign({}, tabAnswerDict), ans);
        console.log('684', { ansTmp: ansTmp });
        setTabAnswerDict(ansTmp); // Do I need both? probably not.
        props.onAnswerChanged(ansTmp);
    };
    // called every time a single answer changes
    var updateAnswer = function (questionId, value, _dbg) {
        if (_dbg === void 0) { _dbg = ''; }
        var ansTmp = {};
        ansTmp[questionId] = value;
        updateAnswers(ansTmp);
    };
    var validateSelectionGroupSettings = function (questionSettings) {
        if (!questionSettings)
            return;
        var allowDeselect = questionSettings.allowDeselect;
        if (allowDeselect !== undefined && typeof allowDeselect !== 'boolean') {
            throw new Error("allowDeselect was not passed in as a boolean for question ".concat(currentQuestionIndex));
        }
    };
    var renderSelectionGroup = function (question) {
        var _a, _b;
        var renderSelector = props.renderSelector, styles = props.styles;
        var selectionGroupContainerStyle = styles.selectionGroupContainerStyle;
        var currentAnsKey = ((_a = tabAnswerDict[question.questionId]) !== null && _a !== void 0 ? _a : '');
        var index = question.options.findIndex(function (element) { return parseInt(element.value) === parseInt(currentAnsKey); });
        question.questionSettings = {
            defaultSelection: index,
        };
        validateSelectionGroupSettings(question.questionSettings);
        var selectionHandlersTemp = selectionHandlers;
        if (!selectionHandlersTemp[question.questionId]) {
            if (!question.questionSettings) {
                selectionHandlersTemp[question.questionId] = new SelectionHandler({
                    maxMultiSelect: 1,
                    allowDeselect: true,
                    defaultSelection: null,
                });
                setSelectionHandlers(selectionHandlersTemp);
            }
            else {
                var _c = question.questionSettings, allowDeselect = _c.allowDeselect, defaultSelection = _c.defaultSelection;
                if (defaultSelection !== undefined &&
                    typeof defaultSelection !== 'number') {
                    throw new Error("Default Selection not specified as an index for question ".concat(question.questionId));
                }
                var options = {};
                options.maxMultiSelect = 1;
                options.allowDeselect =
                    allowDeselect === undefined || allowDeselect === true;
                options.defaultSelection =
                    defaultSelection !== undefined ? defaultSelection : null;
                var selectionHandlersTemp_1 = selectionHandlers;
                selectionHandlersTemp_1[question.questionId] = new SelectionHandler(options);
                setSelectionHandlers(selectionHandlersTemp_1);
                if (typeof options.defaultSelection === 'number') {
                    updateAnswer(question.questionId, (_b = question.options[options.defaultSelection]) === null || _b === void 0 ? void 0 : _b.value, '383');
                }
            }
        }
        return (React.createElement(View, { style: styles.containerStyle },
            props.renderQuestionText
                ? props.renderQuestionText(question.questionText)
                : null,
            React.createElement(SelectionGroup, { onPress: selectionHandlersTemp[question.questionId].selectionHandler, items: question.options, isSelected: selectionHandlersTemp[question.questionId].isSelected, renderContent: renderSelector, containerStyle: selectionGroupContainerStyle, onItemSelected: function (item) {
                    updateAnswer(question.questionId, item.value, '405');
                }, onItemDeselected: function () {
                    updateAnswer(question.questionId, null, '409');
                }, isDeselected: undefined, getAllSelectedItemIndexes: undefined, attributes: undefined, editable: !!props.viewMode })));
    };
    var renderMultipleSelectionGroup = function (question) {
        var renderSelector = props.renderSelector, styles = props.styles;
        var selectionGroupContainerStyle = styles.selectionGroupContainerStyle;
        validateSelectionGroupSettings(question.questionSettings);
        var currentAnsKey = tabAnswerDict[question.questionId];
        var index = (currentAnsKey === null || currentAnsKey === void 0 ? void 0 : currentAnsKey.map(function (j) {
            return question.options.findIndex(function (ele) {
                return ele.value === j.value;
            });
        })) || [];
        question.questionSettings = {
            defaultSelection: index,
            maxMultiSelect: 3,
        };
        var selectionHandlersTemp = selectionHandlers;
        if (!selectionHandlersTemp[question.questionId]) {
            if (!question.questionSettings) {
                selectionHandlersTemp[question.questionId] = new SelectionHandler({
                    maxMultiSelect: 3,
                    allowDeselect: true,
                    defaultSelection: null,
                });
                setSelectionHandlers(selectionHandlersTemp);
            }
            else {
                var _a = question.questionSettings, allowDeselect = _a.allowDeselect, defaultSelection = _a.defaultSelection;
                var multiSelectMax = Number(question.questionSettings.maxMultiSelect);
                if (defaultSelection !== undefined &&
                    !Array.isArray(defaultSelection)) {
                    throw new Error("Default Selection not specified as an array for multiple selection question ".concat(question.questionId));
                }
                var options_1 = {};
                options_1.maxMultiSelect = multiSelectMax;
                options_1.allowDeselect =
                    allowDeselect === undefined || allowDeselect === true;
                options_1.defaultSelection =
                    defaultSelection !== undefined ? defaultSelection : null;
                selectionHandlersTemp[question.questionId] = new SelectionHandler(options_1);
                setSelectionHandlers(selectionHandlersTemp);
                if (Array.isArray(options_1.defaultSelection)) {
                    // Set timeout is used here to avoid updateAnswer's call to set
                    setTimeout(function () {
                        return updateAnswer(question.questionId, question.options.filter(function (element, index) {
                            return options_1.defaultSelection.includes(index);
                        }), '468');
                    }, 0);
                }
            }
        }
        return (React.createElement(View, { style: styles.containerStyle },
            props.renderQuestionText
                ? props.renderQuestionText(question.questionText)
                : null,
            React.createElement(SelectionGroup, { onPress: selectionHandlersTemp[question.questionId].selectionHandler, items: question.options, isSelected: selectionHandlersTemp[question.questionId].isSelected, getAllSelectedItemIndexes: selectionHandlersTemp[question.questionId].getAllSelectedItemIndexes, renderContent: renderSelector, containerStyle: selectionGroupContainerStyle, onItemSelected: function (item, allSelectedItems) {
                    console.log('srilatha allSelectedItems', allSelectedItems);
                    updateAnswer(question.questionId, allSelectedItems, '500');
                }, onItemDeselected: function (item, allSelectedItems) {
                    updateAnswer(question.questionId, allSelectedItems, '508');
                }, isDeselected: undefined, attributes: undefined, editable: !!props.viewMode })));
    };
    var updateDefaultAnswer = function (question) {
        var _a;
        var questionId = question.questionId, defaultValue = question.defaultValue;
        (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : tabAnswerDict[questionId]) !== null && _a !== void 0 ? _a : (tabAnswerDict[questionId] !== defaultValue &&
            updateAnswer(questionId, defaultValue));
    };
    var showWidgetType = function (question) {
        var _a;
        console.log('SimpleSurveyTab - 538 ', {
            question: question,
        });
        var questionType = (_a = question.questionType) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        var answerString = tabAnswerDict[question === null || question === void 0 ? void 0 : question.questionId] || '';
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
                return (React.createElement(View, { key: question.questionId, style: styles.questionBox },
                    React.createElement(Text, { style: styles.questionText }, question.questionText),
                    React.createElement(TextInput, { style: styles.textBox, onChangeText: function (value) {
                            return updateAnswer(question.questionId, value, '415');
                        }, underlineColorAndroid: 'white', placeholder: question.placeholder, placeholderTextColor: colors.placeHolderText, keyboardType: 'numeric', value: answerString, onBlur: function () { return console.log('blurred TDB'); }, blurOnSubmit: true, returnKeyType: "done", editable: !props.viewMode })));
            case 'paragraphinput':
                return (React.createElement(View, { key: question.questionId, style: styles.questionBox },
                    React.createElement(Text, { style: styles.questionText }, question.questionText),
                    React.createElement(TextInput, { style: [styles.textBox, { height: 250 }], onChangeText: function (value) {
                            return updateAnswer(question.questionId, value, '415');
                        }, underlineColorAndroid: 'white', placeholder: question.placeholder, placeholderTextColor: colors.placeHolderText, keyboardType: 'numeric', value: answerString, onBlur: function () { return console.log('blurred TDB'); }, blurOnSubmit: true, multiline: true, 
                        // numberOfLines="10"
                        returnKeyType: "done", editable: !props.viewMode })));
            case 'numericinput':
                return (React.createElement(View, { key: question.questionId, style: styles.questionBox },
                    React.createElement(Text, { style: styles.questionText }, question.questionText),
                    React.createElement(TextInput, { style: styles.numericInput, onChangeText: function (value) {
                            var valInt = parseInt(value, 10);
                            if (Number.isInteger(valInt)) {
                                updateAnswer(question.questionId, valInt, '556');
                            }
                            else if (value === '') {
                                updateAnswer(question.questionId, '', '555');
                            }
                        }, underlineColorAndroid: 'white', value: answerString, placeholder: question.placeholder, placeholderTextColor: colors.placeHolderText, keyboardType: 'numeric', onBlur: function () { return console.log('blurred TDB'); }, blurOnSubmit: true, maxLength: 3 })));
            case 'info':
                return (React.createElement(Text, { style: [styles.questionBox, { minWidth: '100%' }] }, question.questionText));
            case 'matrix':
                return (React.createElement(Matrix, { question: question, answers: tabAnswerDict, styles: {
                        questionTextStyle: styles.questionTextStyle,
                        containerStyle: styles.containerStyle,
                    }, updateAnswers: updateAnswers, viewMode: !!props.viewMode }));
            case 'matrixchoice':
                return (React.createElement(MatrixChoice, { question: question, answers: tabAnswerDict, styles: {
                        questionTextStyle: styles.questionTextStyle,
                        containerStyle: styles.containerStyle,
                    }, viewMode: !!props.viewMode, updateAnswers: updateAnswers }));
            // case 'matrixChoice':
            //   // a matrix of answers to one question.
            //   return renderMatrixChoice();
            default:
                console.error('728 - UNKNOWN QuestionType', { questionType: questionType });
                return React.createElement(View, null);
        }
    };
    return (React.createElement(View, { style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-around',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            width: '100%',
        }, key: "sst-".concat((_b = (_a = props.surveyTab) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.questionId) }, (_c = props.surveyTab) === null || _c === void 0 ? void 0 : _c.map(function (question) {
        console.log('loop thru sub q 648: ', { question: question });
        return showWidgetType(question);
    })));
};
//# sourceMappingURL=SimpleSurveyTab.js.map