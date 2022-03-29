/***********************************************************************EMCL2022
 *
 * SurveyDetailScreen.tsx
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
import * as React from 'react';
import { View, Text } from 'react-native';
// import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import SurveyWidget from './SurveyWidget';
import { colors, styles } from './styles';
import { Gauge } from './Gauge';
import { SurveyBottomNavBar } from './SurveyBottomNavBar';
import { SurveyTabList } from './SurveyTabList';
import { ModalFile } from './components/ModalFile';
// Layout of survey screen - banner, navigation and questions.
export var SurveyDetailScreen = function (props) {
    var _a, _b, _c, _d;
    // this is the entire survey definition
    var _e = React.useState([]), survey = _e[0], setSurvey = _e[1];
    var _f = React.useState([]), surveyTree = _f[0], setSurveyTree = _f[1];
    var _g = React.useState(), surveyAnswer = _g[0], setSurveyAnswer = _g[1];
    var _h = React.useState(props.surveyAnswerSet), surveyAnswerSet = _h[0], setSurveyAnswerSet = _h[1];
    var _j = React.useState({}), unsavedAnswers = _j[0], setUnsavedAnswers = _j[1];
    var _k = React.useState([]), sortedDisplay = _k[0], setSortedDisplay = _k[1];
    var _l = React.useState(0), selectedTabIdx = _l[0], setSelectedTabIdx = _l[1];
    // leaving these 6 warnings in place for now - will need to use shortly
    // const [showQuestions, setShowQuestions] = React.useState<boolean>(
    //   props.showQuestions,
    // );
    // const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
    var props_survey = props.survey, props_selectedSurvey = props.selectedSurvey;
    var _m = React.useState(false), canSave = _m[0], setCanSave = _m[1];
    var _o = React.useState(false), showPdf = _o[0], setShowPdf = _o[1];
    var modalFileUrl = props.modalFileUrl;
    React.useEffect(function () {
        // determine if first run,  survey state will be empty
        var isFirstRun = survey.length === 0;
        console.log('etg74 - ', { isFirstRun: isFirstRun });
        if (isFirstRun) {
            // preprocess json string. Add index and parse value
            var surveyFromProps_1 = props_survey;
            // props_survey.map((i, idx) => {
            //   i.parsed = JSON.parse(i.value);
            //   i.idx = idx;
            //   return i;
            // });
            // extract meta data for manipulation into ordered hierarchical array
            var flatDir = surveyFromProps_1.map(function (item, idx) {
                var _a;
                // console.log({value});
                return {
                    topName: item.tabName.replace(/\..*$/, ''),
                    name: item.tabName,
                    order: ((_a = item.value) === null || _a === void 0 ? void 0 : _a.order) || 99,
                    idx: idx,
                };
            });
            var flatDirSorted = flatDir.sort(function (a, b) {
                if (a.topName === b.topName) {
                    return a.order - b.order;
                }
                var diff = a.order - b.order;
                if (diff === 0 || (a.order === 99 && b.order === 99)) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }
                return diff;
            });
            console.log({ flatDirSorted: flatDirSorted });
            // make l an array of unique top level tab names
            // const topLevelNames = [...new Set(flatDirSorted.map((i) => i.topName))];
            // build tree structure.
            var surveyTree_1 = [];
            flatDirSorted.forEach(function (item) {
                var _a;
                var newNode = function (node, top) {
                    if (top === void 0) { top = false; }
                    if (node.topName === node.name || !top) {
                        return node;
                    }
                    return __assign(__assign({}, node), { name: node.topName, branches: [node] });
                };
                var lastItemIdx = surveyTree_1.length - 1;
                if (lastItemIdx >= 0) {
                    if (item.name !== item.topName) {
                        var matchingIdx = surveyTree_1.findIndex(function (i) { return i.topName === item.topName; });
                        if (matchingIdx >= 0) {
                            (_a = surveyTree_1[matchingIdx].branches) === null || _a === void 0 ? void 0 : _a.push(newNode(item));
                        }
                        else {
                            console.log({
                                name: item.name,
                                topName: item.topName,
                                lastItemIdx: lastItemIdx,
                            });
                            surveyTree_1.push(newNode(item, true));
                        }
                    }
                    else {
                        console.log({
                            name: item.name,
                            topName: item.topName,
                            lastItemIdx: lastItemIdx,
                        });
                        surveyTree_1.push(newNode(item, true));
                    }
                }
                else {
                    console.log({
                        name: item.name,
                        topName: item.topName,
                        lastItemIdx: lastItemIdx,
                    });
                    surveyTree_1.push(newNode(item, true));
                }
            });
            console.log({ surveyTree: surveyTree_1 });
            var selectedTab = flatDirSorted[0].idx;
            var selectedTabName = surveyFromProps_1[selectedTab].tabName;
            var selectedTabRowId = surveyFromProps_1[selectedTab].id;
            console.log({ surveyTree: surveyTree_1, selectedTab: selectedTab, selectedTabName: selectedTabName });
            // Display order.. as flat array
            var sortedDisplay_1 = [];
            surveyTree_1.forEach(function (topItem) {
                var _a;
                if ((_a = topItem.branches) === null || _a === void 0 ? void 0 : _a.length) {
                    topItem.expanded = false;
                    topItem.branches.forEach(function (botItem) {
                        sortedDisplay_1.push(botItem.idx);
                    });
                }
                else {
                    sortedDisplay_1.push(topItem.idx);
                }
            });
            // record sorted order in surveyFromProps
            sortedDisplay_1.forEach(function (i, idxSorted) {
                surveyFromProps_1[i].idxSorted = idxSorted;
            });
            // console.log('POST idxSorted ', {surveyFromProps});
            setSurvey(surveyFromProps_1);
            setSelectedTabIdx(selectedTab);
            setSortedDisplay(sortedDisplay_1);
            setSurveyTree(surveyTree_1);
            // get answers!
            props_selectedSurvey(selectedTabRowId);
        }
    }, [props_selectedSurvey, props_survey, survey.length]);
    // React.useEffect(() => {
    //   setShowQuestions(props.showQuestions);
    // }, [props.showQuestions]);
    React.useEffect(function () {
        setSurveyAnswerSet(props.surveyAnswerSet);
    }, [props.surveyAnswerSet]);
    React.useEffect(function () {
        setSurveyAnswer(props.surveyAnswer);
    }, [props.surveyAnswer]);
    /**
     * show tab identified by idx
     * @param idx
     */
    var showTab = function (idx) {
        setShowPdf(false);
        if (idx < 0 || typeof idx === 'undefined') {
            return; // maybe go up a level.
        }
        var item = survey[idx];
        console.log('showTab 200', { idx: idx, item: item });
        props_selectedSurvey(item.id); // should be by DB row id
        // Done above
        // if (!item.parsed) {
        //   item.parsed = JSON.parse(item.value);
        //   if (!item.parsed) {
        //     console.log('ERROR PARSING QUESTIONS: ', {value: item.value});
        //   }
        // }
        setSelectedTabIdx(idx);
        setCanSave(false);
    };
    var viewReports = function (item) {
        if (item) {
            setShowPdf(true);
            props.viewPdf(surveyAnswerSet === null || surveyAnswerSet === void 0 ? void 0 : surveyAnswerSet.id);
        }
        else {
            setShowPdf(false);
        }
    };
    var sendSurveyRes = function (item, status) {
        var selectedTab = survey[selectedTabIdx].id;
        setUnsavedAnswers(item);
        console.log('sendSurveyRes', { item: item, selectedTab: selectedTab, status: status });
        props.sendSurveyRes(item, selectedTab, status, surveyAnswerSet);
        var ansTmp = {};
        setUnsavedAnswers(ansTmp);
    };
    var saveAnswers = function () {
        // Simple - does q count = a count?
        sendSurveyRes(unsavedAnswers, 'Started');
        setCanSave(false);
    };
    var keepUnsavedAnswers = function (a) {
        setUnsavedAnswers(a);
        setCanSave(true);
    };
    var finalizeSurveySet = function () {
        // setUnsavedAnswers(a);
        surveyAnswerSet && props.freezeAnswerSet(surveyAnswerSet.id);
    };
    var selectedSurveyTab = (_a = survey[selectedTabIdx]) === null || _a === void 0 ? void 0 : _a.value;
    var sortedIdx = 1 + ((_c = (_b = survey[selectedTabIdx]) === null || _b === void 0 ? void 0 : _b.idxSorted) !== null && _c !== void 0 ? _c : sortedDisplay.length);
    var nextItem = (_d = (sortedIdx < sortedDisplay.length && sortedDisplay[sortedIdx])) !== null && _d !== void 0 ? _d : -1;
    return (React.createElement(View, { style: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
        } },
        React.createElement(View, { style: { flex: 1, flexDirection: 'column', minWidth: '180px' } },
            React.createElement(View, null,
                React.createElement(Text, { style: {
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                    } }, props.targetUser)),
            React.createElement(SurveyTabList, { surveyTree: surveyTree, tabScores: props.tabScores, showTab: showTab, selectedTabIdx: selectedTabIdx, surveyStatus: props.surveyStatus, viewReport: viewReports })),
        React.createElement(View, { style: { flex: 6 } },
            !showPdf && (React.createElement(View, null,
                React.createElement(View, { style: {
                        width: '100%',
                        padding: 5,
                        borderColor: colors.black,
                        flexDirection: 'row',
                    } },
                    React.createElement(Gauge, { meters: props.scores })),
                React.createElement(SurveyWidget, { surveyAnswer: surveyAnswer || {}, surveyTab: selectedSurveyTab === null || selectedSurveyTab === void 0 ? void 0 : selectedSurveyTab.survey, sendSurveyRes: function (item, status) { return sendSurveyRes(item, status); }, onAnswer: keepUnsavedAnswers, viewMode: surveyAnswerSet === null || surveyAnswerSet === void 0 ? void 0 : surveyAnswerSet.bFinal }),
                React.createElement(SurveyBottomNavBar, { next: nextItem, onFinal: finalizeSurveySet, onSave: saveAnswers, onNav: showTab, canSave: canSave }))),
            showPdf && modalFileUrl && (React.createElement(ModalFile, { url: modalFileUrl, onXClick: function () { return setShowPdf(false); }, styles: {
                    modStyle: styles.docCustomModelStyles,
                    jpgStyle: styles.imagePDF,
                }, viewFileType: "pdf" })))));
};
//# sourceMappingURL=SurveyDetailScreen.js.map