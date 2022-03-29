/***********************************************************************EMCL2022
 *
 * SurveyBottomNavBar.tsx
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
import { View, Button } from 'react-native';
// control details of current survey tab.
export var SurveyBottomNavBar = function (props) {
    var prev = props.prev, next = props.next, onFinal = props.onFinal, onSave = props.onSave, onNav = props.onNav, canSave = props.canSave;
    var labels = canSave
        ? ['Previous', 'Complete / Submit', 'Save', 'Save / Next']
        : ['Previous', 'Complete / Submit', 'Save', 'Next'];
    var SaveLabel = 'Save'; // for later matching
    var saveAndNav = function (tab) {
        canSave && onSave();
        onNav(tab);
    };
    var saveAndFinal = function () {
        canSave && onSave();
        onFinal();
    };
    var callbacks = [
        ((prev !== null && prev !== void 0 ? prev : -1) >= 0) && (function () { return saveAndNav(prev); }),
        saveAndFinal,
        onSave,
        ((next !== null && next !== void 0 ? next : -1) >= 0) && (function () { return saveAndNav(next); }),
    ];
    var doCallback = function (i) {
        var cb = callbacks[i];
        cb && cb();
    };
    return (React.createElement(View, { style: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            minHeight: 300,
        } }, labels.map(function (label, index) {
        // if undefined, skip button.  if false, disable
        var cb = callbacks[index];
        var isDisabled = (cb === undefined) || (label === SaveLabel && !canSave);
        if (typeof cb !== 'undefined') {
            return (React.createElement(View, { key: "sbn-".concat(index), style: {
                    flexGrow: 1,
                    maxWidth: 100,
                    marginTop: 10,
                    marginBottom: 10,
                } },
                React.createElement(Button, { color: 'green', onPress: function () { return doCallback(index); }, disabled: isDisabled, title: label })));
        }
        else {
            return null;
        }
    })));
};
//# sourceMappingURL=SurveyBottomNavBar.js.map