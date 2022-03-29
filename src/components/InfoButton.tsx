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

import React from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

interface IFaButtonProps {
  text?: string;
  style?: any; //ButtonHTMLAttributes<HTMLButtonElement>;
  size?: SizeProp;
  ref?: React.LegacyRef<HTMLButtonElement>;
  iconColor?: string;
}
export const InfoButton = React.forwardRef(
  (props: IFaButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    InfoButton.displayName = 'InfoButton';
    const theStyle = props.style || {};
    const theIconColor = props.iconColor;
    const theClassNames = 'btn btn-primary';
    const theSize = props.size || 'lg';
    return (
      <Popup
        trigger={
          <button
            ref={ref}
            style={{
              height: 36,
              backgroundColor: '#FFF',
              border: 0,
              ...theStyle,
            }}
            className={theClassNames}>
            <FontAwesomeIcon
              icon={'question-circle'}
              size={theSize}
              color={theIconColor}
            />
          </button>
        }
        position="right center">
        <div>{props.text}</div>
      </Popup>
    );
  },
);
