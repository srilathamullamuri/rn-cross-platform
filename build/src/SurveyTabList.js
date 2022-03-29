/***********************************************************************EMCL2022
 *
 * SurveyTabList.tsx
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
import { __spreadArray } from "tslib";
import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
// import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from './styles';
var getStatusColor = function (status) {
    var _a;
    switch ((_a = status === null || status === void 0 ? void 0 : status.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(status)) {
        case 'none':
            return 'red';
        case 'started':
            return 'yellow';
        case 'complete':
            return 'green';
        default:
            return colors.light;
    }
};
export var SurveyTabList = function (props) {
    var _a = React.useState(props.surveyTree), surveyTreeState = _a[0], setSurveyTree = _a[1];
    // const [reports, showReports] =  React.useState<boolean>(true);
    var _b = React.useState(false), expandReports = _b[0], showexpandReports = _b[1];
    var _c = React.useState(''), selectedReport = _c[0], setSelectedReport = _c[1];
    React.useEffect(function () {
        setSurveyTree(props.surveyTree);
    }, [props.surveyTree]);
    var expandedView = function (item, index) {
        setSelectedReport('');
        // viewReport(false);
        showexpandReports(false);
        showTab(item.idx);
        var presentState = __spreadArray([], surveyTreeState, true);
        if (presentState[index].expanded === true) {
            presentState[index].expanded = false;
            setSurveyTree(presentState);
        }
        else {
            presentState.forEach(function (i) { return (i.expanded = false); });
            presentState[index].expanded = !presentState[index].expanded;
            setSurveyTree(presentState);
        }
    };
    var recordView = function (item) {
        setSelectedReport(item);
        viewReport(true);
    };
    var tabScores = props.tabScores, surveyStatus = props.surveyStatus, selectedTabIdx = props.selectedTabIdx, showTab = props.showTab, viewReport = props.viewReport;
    return (React.createElement(View, { style: { flex: 1, padding: 5, justifyContent: 'space-between' } },
        React.createElement(View, null,
            React.createElement(FlatList, { data: surveyTreeState, onEndReachedThreshold: 0.5, renderItem: function (_a) {
                    var _b, _c;
                    var item = _a.item, index = _a.index;
                    var itemStatus;
                    if ((_b = item.branches) === null || _b === void 0 ? void 0 : _b.length) {
                        itemStatus = item.branches.reduce(function (previousValue, item) {
                            var _a;
                            var val = (_a = surveyStatus[item.name]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                            switch (val) {
                                case 'complete':
                                    return (previousValue === 'complete') ? 'complete' : 'Started';
                                case 'started':
                                    return 'started';
                                default:
                                    return (previousValue === 'complete') ? 'Started' : previousValue;
                            }
                        }, surveyStatus[item.branches[0].name]);
                    }
                    else {
                        itemStatus = surveyStatus === null || surveyStatus === void 0 ? void 0 : surveyStatus[item.name];
                    }
                    var itemStatusColor = getStatusColor(itemStatus);
                    var topItemScore = tabScores === null || tabScores === void 0 ? void 0 : tabScores[item.name];
                    return (React.createElement(View, { key: "top-".concat(index) },
                        React.createElement(View, { style: {
                                flex: 1,
                                flexDirection: 'row',
                                padding: 5,
                                borderTopEndRadius: 50,
                                borderBottomEndRadius: 50,
                                backgroundColor: item.idx === selectedTabIdx && expandReports === false ? colors.ochBlue : '',
                            } },
                            ((_c = item.branches) === null || _c === void 0 ? void 0 : _c.length) ? (React.createElement(Text, { style: { flex: 1, fontWeight: 'bold', fontSize: 16 }, onPress: function () { return expandedView(item, index); } }, item.expanded ? '-' : '+')) : (React.createElement(Text, { style: { flex: 1 } })),
                            React.createElement(Text, { style: {
                                    flex: 8,
                                }, onPress: function () { return expandedView(item, index); } },
                                React.createElement(Text, { style: { fontWeight: 'bold' } },
                                    itemStatusColor.length > 0 && (React.createElement(FontAwesomeIcon, { icon: "circle", color: itemStatusColor })),
                                    ' ',
                                    item.name.replaceAll('_', ' '))),
                            React.createElement(Text, { style: { alignSelf: 'flex-end' } }, topItemScore ? " ".concat(topItemScore) : '')),
                        item.branches && item.expanded && (React.createElement(FlatList, { data: item.branches, initialNumToRender: 20, onEndReachedThreshold: 0.5, keyExtractor: function (childItem, _index) {
                                return 'key_' + childItem.idx;
                            }, renderItem: function (_a) {
                                var item = _a.item;
                                var colorCircle = getStatusColor(surveyStatus === null || surveyStatus === void 0 ? void 0 : surveyStatus[item.name]);
                                // const surveyItem = this.state.survey[item.idx];
                                var itemName = item.name.replace(/^.*\./, '');
                                var itemScore = tabScores === null || tabScores === void 0 ? void 0 : tabScores[item.name];
                                return (React.createElement(View, { style: {
                                        flexDirection: 'row',
                                        marginLeft: 15,
                                        // justifyContent: 'center',
                                        // alignItems: 'center',
                                    } },
                                    itemName && (React.createElement(View, { style: {
                                            width: '100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingLeft: 20,
                                            backgroundColor: item.idx === selectedTabIdx
                                                ? colors.ochBlue
                                                : '',
                                            padding: 5,
                                            borderTopEndRadius: 50,
                                            borderBottomEndRadius: 50,
                                        } },
                                        colorCircle.length > 0 && (React.createElement(FontAwesomeIcon, { icon: "circle", color: colorCircle })),
                                        React.createElement(Text, { onPress: function () { return showTab(item.idx); }, style: {
                                                flex: 6,
                                            } },
                                            ' ',
                                            itemName.replaceAll('_', ' ')),
                                        React.createElement(Text, { style: { alignSelf: 'flex-end' } }, itemScore ? " ".concat(itemScore) : ''))),
                                    !itemName && (React.createElement(Text, { onPress: function () { return showTab(item.idx); }, style: {
                                            padding: 5,
                                        } }, item.topName))));
                            } }))));
                } })),
        React.createElement(View, { style: { margin: '4.25rem' } }),
        React.createElement(View, { key: "top-record" },
            React.createElement(View, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                    borderTopEndRadius: 50,
                    borderBottomEndRadius: 50,
                    backgroundColor: expandReports === true && !selectedReport
                        ? colors.ochBlue
                        : '',
                } },
                React.createElement(Text, { style: { flex: 1, fontWeight: 'bold', fontSize: 16 }, onPress: function () { return expandReports ? showexpandReports(false) : showexpandReports(true); } }, expandReports ? '-' : '+'),
                React.createElement(Text, { style: {
                        flex: 8,
                    } },
                    React.createElement(Text, { style: { fontWeight: 'bold' }, onPress: function () { return expandReports ? showexpandReports(false) : showexpandReports(true); } },
                        React.createElement(FontAwesomeIcon, { icon: "file-pdf", color: colors.ochBlue }),
                        ' ',
                        ' REPORTS'))),
            React.createElement(View, { style: {
                    flexDirection: 'row',
                    marginLeft: 15,
                } }, expandReports && (React.createElement(View, { style: {
                    width: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                    backgroundColor: selectedReport === 'pdf' && !selectedTabIdx
                        ? colors.ochBlue
                        : '',
                    padding: 5,
                    borderTopEndRadius: 50,
                    borderBottomEndRadius: 50,
                } },
                React.createElement(FontAwesomeIcon, { icon: "circle", color: colors.green }),
                React.createElement(Text, { onPress: function () { return recordView('pdf'); }, style: {
                        flex: 6,
                    } },
                    ' ',
                    'pdf')))))));
};
//# sourceMappingURL=SurveyTabList.js.map