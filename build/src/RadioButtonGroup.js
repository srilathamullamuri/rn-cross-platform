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
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
export var RadioButtonGroup = function (props) {
    var _a = useState(props.value), value = _a[0], setValue = _a[1];
    React.useEffect(function () {
        setValue(props.value);
    }, [props.value]);
    return (React.createElement(View, { style: { width: '100%', flexDirection: 'row', flex: 1 } }, props.data.map(function (item, index) {
        var isSelected = item.id === value;
        return (React.createElement(View, { key: index, style: {
                width: props.columnWidth + '%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement(TouchableOpacity, { key: index, onPress: function () {
                    if (props.editable) {
                        setValue(item.id);
                        props.onPress(item.id);
                    }
                }, style: [
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
                ] }, isSelected ? (React.createElement(View, { style: {
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000',
                } })) : null)));
    })));
};
//# sourceMappingURL=RadioButtonGroup.js.map