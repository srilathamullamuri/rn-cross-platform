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
import {Text} from 'react-native';
import Modal from 'react-modal';
import InnerImageZoom from 'react-inner-image-zoom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//TODO: fix this dependency - bring in OR pass as arg.
// import {PdfView} from '../../components/SignPdf';

export const ModalFile = (props: {
  url: string;
  onXClick: () => void;
  styles: {[k: string]: any};
  viewFileType: string;
}) => {
  const {url, styles, onXClick, viewFileType = 'pdf'} = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (url && url.length > 0) {
      setIsOpen(true);
    }
  }, [url]);

  return (
    <Modal isOpen={isOpen} style={styles.docCustomModelStyles}>
      <div
        style={{
          position: 'fixed',
          right: '5%',
          top: '7%',
          zIndex: 1,
        }}>
        <FontAwesomeIcon
          icon={'download'}
          size="lg"
          onClick={() => {
            window.open(url, '_blank');
          }}
        />
        <FontAwesomeIcon
          icon={'times-circle'}
          size="lg"
          onClick={() => {
            setIsOpen(false);
            onXClick();
          }}
        />
      </div>
      {viewFileType === 'image' ? (
        <InnerImageZoom style={styles.imagePDF} src={url} />
      ) : (
        // <PdfView
        //   filePath={url}
        //   onClick={() => {
        //     // setIsOpen(false);
        //   }}
        // />
        <Text>Pdf View</Text>
      )}
    </Modal>
  );
};
