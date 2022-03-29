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
import {View, Text, StyleSheet} from 'react-native';

const sum = (arr) => arr.reduce((acc, n) => acc + n, 0);
interface cellProps {
  data?: any;
  width?: number;
  height?: number;
  flex?: number;
  style?: any;
  textStyle?: any;
  borderStyle?: any;
  children?: any;
}

export const Cell = (props: cellProps) => {
  const {data, width, height, flex, style, textStyle, borderStyle} = props;
  let textDom = React.isValidElement(data) ? (
    data
  ) : (
    <Text style={[textStyle, styles.text]}>{data}</Text>
  );
  if (props.children) {
    textDom = props.children;
  }
  const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 0;
  const borderRightWidth = borderTopWidth;
  const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

  return (
    <View
      style={[
        {
          borderTopWidth,
          borderRightWidth,
          borderColor,
        },
        styles.cell,
        width && {width},
        height && {height},
        flex && {flex},
        !width && !flex && !height && !style && {flex: 1},
        style,
      ]}>
      {textDom}
    </View>
  );
};

interface rowProps {
  data: any;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  style: any;
  textStyle: any;
}
export const Row = (props: rowProps) => {
  const {data, style, widthArr, height, flexArr, textStyle} = props;
  const width = widthArr ? sum(widthArr) : 0;

  return data ? (
    <View style={[height && {height}, width && {width}, styles.row, style]}>
      {data.map((item, i) => {
        const flex = flexArr && flexArr[i];
        const wth = widthArr && widthArr[i];
        return (
          <Cell
            key={i}
            data={item}
            width={wth}
            height={height}
            flex={flex}
            textStyle={textStyle}
          />
        );
      })}
    </View>
  ) : null;
};

interface rowsProps {
  data: any;
  widthArr?: number[];
  heightArr?: number[];
  flexArr?: number[];
  style?: any;
  textStyle: any;
}
export const Rows = (props: rowsProps) => {
  const {data, style, widthArr, heightArr, flexArr, textStyle} = props;
  const flex = flexArr ? sum(flexArr) : 0;
  const width = widthArr ? sum(widthArr) : 0;

  return data ? (
    <View style={[flex && {flex}, width && {width}]}>
      {data.map((item, i) => {
        const height = heightArr && heightArr[i];
        return (
          <Row
            key={i}
            data={item}
            widthArr={widthArr}
            height={height}
            flexArr={flexArr}
            style={style}
            textStyle={textStyle}
          />
        );
      })}
    </View>
  ) : null;
};

interface colProps {
  data: any;
  width: number;
  heightArr: number[];
  flex: number;
  style: any;
  textStyle: any;
}

export const Col = (props: colProps) => {
  const {data, style, width, heightArr, flex, textStyle} = props;

  return data ? (
    <View
      style={[width ? {width: width} : {flex: 1}, flex && {flex: flex}, style]}>
      {data.map((item, i) => {
        const height = heightArr && heightArr[i];
        return (
          <Cell
            key={i}
            data={item}
            width={width}
            height={height}
            textStyle={textStyle}
          />
        );
      })}
    </View>
  ) : null;
};

interface colsProps {
  data: any;
  widthArr: number[];
  heightArr: number[];
  flexArr: number[];
  style: any;
  textStyle: any;
}
export const Cols = (props: colsProps) => {
  const {data, style, widthArr, heightArr, flexArr, textStyle} = props;
  const width = widthArr ? sum(widthArr) : 0;

  return data ? (
    <View style={[styles.cols, width && {width}]}>
      {data.map((item, i) => {
        const flex = flexArr && flexArr[i];
        const wth = widthArr && widthArr[i];
        return (
          <Col
            key={i}
            data={item}
            width={wth}
            heightArr={heightArr}
            flex={flex}
            style={style}
            textStyle={textStyle}
          />
        );
      })}
    </View>
  ) : null;
};
interface tableProps {
  borderStyle: any;
  children: any;
  style?: any;
}

export const Table = (props: tableProps) => {
  const _renderChildren = () => {
    return React.Children.map(props.children, (child) =>
      React.cloneElement(
        child,
        props.borderStyle && child.type.displayName !== 'ScrollView'
          ? {borderStyle: props.borderStyle}
          : {},
      ),
    );
  };

  const {borderStyle} = props;
  const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
  const borderBottomWidth = borderLeftWidth;
  const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

  return (
    <View
      style={[
        props.style,
        {
          borderLeftWidth,
          borderBottomWidth,
          borderColor,
        },
      ]}>
      {_renderChildren()}
    </View>
  );
};
interface tableWrapperProps {
  children: any;
  borderStyle?: any;
  style?: any;
}
export const TableWrapper = (props: tableWrapperProps) => {
  const _renderChildren = () => {
    return React.Children.map(props.children, (child) =>
      React.cloneElement(
        child,
        props.borderStyle ? {borderStyle: props.borderStyle} : {},
      ),
    );
  };

  return <View style={props.style}>{_renderChildren()}</View>;
};

const styles = StyleSheet.create({
  cell: {justifyContent: 'center', padding: 5},
  text: {
    backgroundColor: 'transparent',
    padding: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cols: {flexDirection: 'row'},
});
