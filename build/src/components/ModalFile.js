/***********************************************************************EMCL2022
 *
 * ModalFile.tsx
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
import { Text } from 'react-native';
import Modal from 'react-modal';
import InnerImageZoom from 'react-inner-image-zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//TODO: fix this dependency - bring in OR pass as arg.
// import {PdfView} from '../../components/SignPdf';
export var ModalFile = function (props) {
    var url = props.url, styles = props.styles, onXClick = props.onXClick, _a = props.viewFileType, viewFileType = _a === void 0 ? 'pdf' : _a;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    React.useEffect(function () {
        if (url && url.length > 0) {
            setIsOpen(true);
        }
    }, [url]);
    return (React.createElement(Modal, { isOpen: isOpen, style: styles.docCustomModelStyles },
        React.createElement("div", { style: {
                position: 'fixed',
                right: '5%',
                top: '7%',
                zIndex: 1,
            } },
            React.createElement(FontAwesomeIcon, { icon: 'download', size: "lg", onClick: function () {
                    window.open(url, '_blank');
                } }),
            React.createElement(FontAwesomeIcon, { icon: 'times-circle', size: "lg", onClick: function () {
                    setIsOpen(false);
                    onXClick();
                } })),
        viewFileType === 'image' ? (React.createElement(InnerImageZoom, { style: styles.imagePDF, src: url })) : (
        // <PdfView
        //   filePath={url}
        //   onClick={() => {
        //     // setIsOpen(false);
        //   }}
        // />
        React.createElement(Text, null, "Pdf View"))));
};
//# sourceMappingURL=ModalFile.js.map