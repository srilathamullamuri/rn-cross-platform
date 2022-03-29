/***********************************************************************EMCL2022
 *
 * InfoButton.tsx
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
import React from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export var InfoButton = React.forwardRef(function (props, ref) {
    InfoButton.displayName = 'InfoButton';
    var theStyle = props.style || {};
    var theIconColor = props.iconColor;
    var theClassNames = 'btn btn-primary';
    var theSize = props.size || 'lg';
    return (React.createElement(Popup, { trigger: React.createElement("button", { ref: ref, style: __assign({ height: 36, backgroundColor: '#FFF', border: 0 }, theStyle), className: theClassNames },
            React.createElement(FontAwesomeIcon, { icon: 'question-circle', size: theSize, color: theIconColor })), position: "right center" },
        React.createElement("div", null, props.text)));
});
//# sourceMappingURL=InfoButton.js.map