/***********************************************************************EMCL2022
 *
 * Gauge.tsx
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
import {View, Text} from 'react-native';
import ReactTooltip from 'react-tooltip';
import {colors} from './styles';

export interface GProps {
  label: string;
  color: string;
  pct: number;
  val: number;
  max: number;
  target?: number;
}

export const Gauge = (props: {meters: GProps[]}) => {
  return (
    <>
      {props.meters?.map((item, index) => {
        // console.log('item', item);
        let lowMark;
        let highMark;
        let optMark;

        // crazy rules for changing color - see https://css-tricks.com/html5-meter-element/
        if (item.color === 'red') {
          lowMark = item.pct + 1;
          highMark = item.pct + 1;
          optMark = item.pct + 2;
        } else if (item.color === 'yellow') {
          lowMark = item.pct + 1;
          highMark = item.pct + 1;
          optMark = item.pct + 1;
        } else if (item.color === 'green') {
          lowMark = item.pct - 1;
          highMark = item.pct + 1;
          optMark = item.pct;
        }

        const helpText = `Value is ${item.val} out of ${item.max}. Target is ${item.target}`;
        const targetString = `(LR => ${item.target || item.max})`;

        return (
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: colors.ochBlueP3,
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              margin: 10,
              borderRadius: 10,
            }}>
            <ReactTooltip />
            <Text
              style={{
                padding: 5,
                borderTopEndRadius: 50,
                borderBottomEndRadius: 50,
                fontWeight: 'bold',
              }}>
              {item.label}
            </Text>
            <meter
              id={item.label.replaceAll(' ', '')}
              min="0"
              data-tip={helpText}
              low={lowMark}
              color={item.color}
              optimum={optMark}
              high={highMark}
              max="100"
              style={{
                display: 'block',
                height: '50px',
              }}
              value={item.pct}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  padding: 5,
                  borderTopEndRadius: 50,
                  borderBottomEndRadius: 50,
                  fontWeight: 'bold',
                }}>
                {item.val}
              </Text>
              <Text
                style={{
                  padding: 5,
                  borderTopEndRadius: 50,
                  borderBottomEndRadius: 50,
                }}>
                {targetString}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};
