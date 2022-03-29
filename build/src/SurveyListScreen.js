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
import { View, Text } from 'react-native';
import ReactTooltip from 'react-tooltip';
// import {ScaledSheet as StyleSheet} from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, TableWrapper, Row, Cell } from './components/Table';
import { ModalFile } from './components/ModalFile';
import { styles } from './styles';
// eslint-disable-next-line react/prop-types
export var SurveyListScreen = function (props) {
    var _a;
    var modalFileUrl = props.modalFileUrl;
    var headers = ['Assessment', 'Version', 'Actions'];
    var answerHeaders = ['Assessment Date', 'Status', 'Edit / View'];
    console.log('srilatha list', props === null || props === void 0 ? void 0 : props.list);
    return (React.createElement(View, { style: localStyles.container },
        modalFileUrl && (React.createElement(ModalFile, { url: modalFileUrl, onXClick: function () { return false; }, styles: {
                modStyle: styles.docCustomModelStyles,
                jpgStyle: styles.imagePDF,
            }, viewFileType: "pdf" })),
        React.createElement(Table, { borderStyle: { borderWidth: 2, borderColor: '#c8e1ff' }, style: { width: '100%' } },
            React.createElement(Row, { data: headers, style: localStyles.head, textStyle: localStyles.text }), (_a = props === null || props === void 0 ? void 0 : props.list) === null || _a === void 0 ? void 0 :
            _a.map(function (item, i) {
                var _a, _b, _c;
                return (React.createElement(View, { style: { borderColor: '#c8e1ff', borderWidth: 1 }, key: i },
                    React.createElement(TableWrapper, { key: i, style: localStyles.row },
                        React.createElement(Cell, { data: item.name }),
                        React.createElement(Cell, { data: item.version }),
                        React.createElement(Cell, null,
                            React.createElement(View, { style: {
                                    flex: 3,
                                    flexDirection: 'row',
                                    padding: 10,
                                    justifyContent: 'center',
                                } },
                                item.answerSetId && item.final && (React.createElement("div", { "data-tip": 'View' },
                                    React.createElement(ReactTooltip, null),
                                    React.createElement(FontAwesomeIcon, { icon: "eye", color: colors.ochBlue, onClick: function () {
                                            return props.showSurveyDetails(item, {
                                                id: item.answerSetId,
                                                bFinal: item.final,
                                            });
                                        }, style: localStyles.marginSides }))),
                                item.answerSetId && !item.final && (React.createElement("div", { "data-tip": 'Edit' },
                                    React.createElement(ReactTooltip, null),
                                    React.createElement(FontAwesomeIcon, { icon: "edit", color: colors.ochBlue, onClick: function () {
                                            return props.showSurveyDetails(item, {
                                                id: item.answerSetId,
                                                bFinal: item.final,
                                            });
                                        }, style: localStyles.marginSides }))),
                                React.createElement("div", { "data-tip": 'History' },
                                    React.createElement(ReactTooltip, null),
                                    React.createElement(FontAwesomeIcon, { icon: "history", color: colors.ochBlue, onClick: function () { return props.showSurveyAnswerHistory(item); }, style: localStyles.marginSides })),
                                item.answerSetId && item.final && (React.createElement("div", { "data-tip": 'Revise' },
                                    React.createElement(ReactTooltip, null),
                                    React.createElement(FontAwesomeIcon, { icon: "tools", color: colors.ochBlue, style: localStyles.marginSides, onClick: function () { return props.reviseSurvey(item.answerSetId); } }))),
                                item.answerSetId && (React.createElement("div", { "data-tip": 'Report' },
                                    React.createElement(ReactTooltip, null),
                                    React.createElement(FontAwesomeIcon, { icon: "file-pdf", color: colors.ochBlue, onClick: function () { return props.showPdf(item.answerSetId); }, style: localStyles.marginSides }))),
                                ((item.answerSetId && item.final) ||
                                    item.answerSetId === undefined) && (React.createElement("div", { "data-tip": 'New' },
                                    React.createElement(ReactTooltip, null),
                                    ((item.answerSetId && item.final) ||
                                        item.answerSetId === undefined) && (React.createElement(FontAwesomeIcon, { icon: "plus-circle", color: colors.ochBlue, onClick: function () { return props.showSurveyDetails(item); }, style: localStyles.marginSides }))))))),
                    ((_a = item.surveyAnswerSet) === null || _a === void 0 ? void 0 : _a.length) > 0 && (React.createElement(View, { style: { padding: '1%' } },
                        React.createElement(Table, { borderStyle: { borderWidth: 2, borderColor: '#c8e1ff' }, style: { width: '100%' } },
                            React.createElement(Row, { data: answerHeaders, style: localStyles.head, textStyle: localStyles.text }), (_b = item.surveyAnswerSet) === null || _b === void 0 ? void 0 :
                            _b.sort(function (a, b) {
                                var aa = new Date(a.revision);
                                var bb = new Date(b.revision);
                                return aa - bb;
                            }).reverse().map(function (surveyAnswerItem, i_) {
                                var theDate = new Date(surveyAnswerItem.revision);
                                return (React.createElement(TableWrapper, { key: i_, style: localStyles.row },
                                    React.createElement(Cell, { data: theDate.toLocaleString('en-US') }),
                                    React.createElement(Cell, { data: surveyAnswerItem.status }),
                                    React.createElement(Cell, null,
                                        React.createElement(View, { style: {
                                                flex: 2,
                                                flexDirection: 'row',
                                                padding: 10,
                                                justifyContent: 'center',
                                            } },
                                            !surveyAnswerItem.bFinal && (React.createElement("div", { "data-tip": 'Edit' },
                                                React.createElement(ReactTooltip, null),
                                                React.createElement(FontAwesomeIcon, { icon: "edit", color: colors.ochBlue, onClick: function () {
                                                        return props.showSurveyDetails(item, surveyAnswerItem);
                                                    }, style: localStyles.marginSides }))),
                                            surveyAnswerItem.bFinal && (React.createElement("div", { "data-tip": 'View' },
                                                React.createElement(ReactTooltip, null),
                                                React.createElement(FontAwesomeIcon, { icon: "eye", color: colors.ochBlue, onClick: function () {
                                                        return props.showSurveyDetails(item, surveyAnswerItem);
                                                    }, style: localStyles.marginSides }))),
                                            surveyAnswerItem.bFinal && (React.createElement("div", { "data-tip": 'Revise' },
                                                React.createElement(ReactTooltip, null),
                                                React.createElement(FontAwesomeIcon, { icon: "tools", color: colors.ochBlue, style: localStyles.marginSides, onClick: function () { return props.reviseSurvey(surveyAnswerItem.id); } }))),
                                            React.createElement("div", { "data-tip": 'Report' },
                                                React.createElement(ReactTooltip, null),
                                                React.createElement(FontAwesomeIcon, { icon: "file-pdf", color: colors.ochBlue, onClick: function () { return props.showPdf(surveyAnswerItem.id); }, style: localStyles.marginSides }))))));
                            })))),
                    ((_c = item.surveyAnswerSet) === null || _c === void 0 ? void 0 : _c.length) <= 0 && (React.createElement(View, null,
                        React.createElement(Text, { style: { alignSelf: 'center' } }, "No Document History")))));
            }))));
};
var colors = {
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
    ochBlue: '#237aff',
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
var localStyles = {
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
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
};
export default SurveyListScreen;
//# sourceMappingURL=SurveyListScreen.js.map