/***********************************************************************EMCL2022
 *
 * SurveyCompletedScreen.tsx
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
export var SurveyCompletedScreen = function (props) {
    return (React.createElement(View, null,
        React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
            } },
            React.createElement("button", { className: 'btn btn-primary mr-5 mt-2 float-left', onClick: function () { return props.previous(); }, disabled: !props.prevButton }, "Previous"),
            React.createElement("button", { className: 'btn btn-primary mt-2 float-right', onClick: function () {
                    props.next();
                }, disabled: !props.nextButton }, "Next")),
        React.createElement(Text, { style: {
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 100,
            } }, "Survey Already Completed")));
};
export default SurveyCompletedScreen;
//# sourceMappingURL=SurveyCompletedScreen.js.map