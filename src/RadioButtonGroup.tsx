/***********************************************************************EMCL2022
 *
 * RadioButtonGroup.tsx
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

import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

export const RadioButtonGroup = (props: {
  style?: any;
  data: any;
  value: string;
  columnWidth: number;
  onPress: (event) => void;
  editable: boolean;
}) => {
  const [value, setValue] = useState<string>(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={{width: '100%', flexDirection: 'row', flex: 1}}>
      {props.data.map((item, index) => {
        const isSelected = item.id === value;
        return (
          <View
            key={index}
            style={{
              width: props.columnWidth + '%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (props.editable) {
                  setValue(item.id);
                  props.onPress(item.id);
                }
              }}
              style={[
                {
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                props.style,
              ]}>
              {isSelected ? (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
