/***********************************************************************EMCL2022
 *
 * Table.tsx
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
import { View, Text, StyleSheet } from 'react-native';
var sum = function (arr) { return arr.reduce(function (acc, n) { return acc + n; }, 0); };
export var Cell = function (props) {
    var data = props.data, width = props.width, height = props.height, flex = props.flex, style = props.style, textStyle = props.textStyle, borderStyle = props.borderStyle;
    var textDom = React.isValidElement(data) ? (data) : (React.createElement(Text, { style: [textStyle, styles.text] }, data));
    if (props.children) {
        textDom = props.children;
    }
    var borderTopWidth = (borderStyle && borderStyle.borderWidth) || 0;
    var borderRightWidth = borderTopWidth;
    var borderColor = (borderStyle && borderStyle.borderColor) || '#000';
    return (React.createElement(View, { style: [
            {
                borderTopWidth: borderTopWidth,
                borderRightWidth: borderRightWidth,
                borderColor: borderColor,
            },
            styles.cell,
            width && { width: width },
            height && { height: height },
            flex && { flex: flex },
            !width && !flex && !height && !style && { flex: 1 },
            style,
        ] }, textDom));
};
export var Row = function (props) {
    var data = props.data, style = props.style, widthArr = props.widthArr, height = props.height, flexArr = props.flexArr, textStyle = props.textStyle;
    var width = widthArr ? sum(widthArr) : 0;
    return data ? (React.createElement(View, { style: [height && { height: height }, width && { width: width }, styles.row, style] }, data.map(function (item, i) {
        var flex = flexArr && flexArr[i];
        var wth = widthArr && widthArr[i];
        return (React.createElement(Cell, { key: i, data: item, width: wth, height: height, flex: flex, textStyle: textStyle }));
    }))) : null;
};
export var Rows = function (props) {
    var data = props.data, style = props.style, widthArr = props.widthArr, heightArr = props.heightArr, flexArr = props.flexArr, textStyle = props.textStyle;
    var flex = flexArr ? sum(flexArr) : 0;
    var width = widthArr ? sum(widthArr) : 0;
    return data ? (React.createElement(View, { style: [flex && { flex: flex }, width && { width: width }] }, data.map(function (item, i) {
        var height = heightArr && heightArr[i];
        return (React.createElement(Row, { key: i, data: item, widthArr: widthArr, height: height, flexArr: flexArr, style: style, textStyle: textStyle }));
    }))) : null;
};
export var Col = function (props) {
    var data = props.data, style = props.style, width = props.width, heightArr = props.heightArr, flex = props.flex, textStyle = props.textStyle;
    return data ? (React.createElement(View, { style: [width ? { width: width } : { flex: 1 }, flex && { flex: flex }, style] }, data.map(function (item, i) {
        var height = heightArr && heightArr[i];
        return (React.createElement(Cell, { key: i, data: item, width: width, height: height, textStyle: textStyle }));
    }))) : null;
};
export var Cols = function (props) {
    var data = props.data, style = props.style, widthArr = props.widthArr, heightArr = props.heightArr, flexArr = props.flexArr, textStyle = props.textStyle;
    var width = widthArr ? sum(widthArr) : 0;
    return data ? (React.createElement(View, { style: [styles.cols, width && { width: width }] }, data.map(function (item, i) {
        var flex = flexArr && flexArr[i];
        var wth = widthArr && widthArr[i];
        return (React.createElement(Col, { key: i, data: item, width: wth, heightArr: heightArr, flex: flex, style: style, textStyle: textStyle }));
    }))) : null;
};
export var Table = function (props) {
    var _renderChildren = function () {
        return React.Children.map(props.children, function (child) {
            return React.cloneElement(child, props.borderStyle && child.type.displayName !== 'ScrollView'
                ? { borderStyle: props.borderStyle }
                : {});
        });
    };
    var borderStyle = props.borderStyle;
    var borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
    var borderBottomWidth = borderLeftWidth;
    var borderColor = (borderStyle && borderStyle.borderColor) || '#000';
    return (React.createElement(View, { style: [
            props.style,
            {
                borderLeftWidth: borderLeftWidth,
                borderBottomWidth: borderBottomWidth,
                borderColor: borderColor,
            },
        ] }, _renderChildren()));
};
export var TableWrapper = function (props) {
    var _renderChildren = function () {
        return React.Children.map(props.children, function (child) {
            return React.cloneElement(child, props.borderStyle ? { borderStyle: props.borderStyle } : {});
        });
    };
    return React.createElement(View, { style: props.style }, _renderChildren());
};
var styles = StyleSheet.create({
    cell: { justifyContent: 'center', padding: 5 },
    text: {
        backgroundColor: 'transparent',
        padding: 5,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    cols: { flexDirection: 'row' },
});
//# sourceMappingURL=Table.js.map