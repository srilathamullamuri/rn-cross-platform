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
import {View, Button} from 'react-native';

interface SurveyBottomNavBarProps {
  prev?: number; // tab number to use for prev button. undefined if skipped
  next: number; // ""

  onFinal: () => void; // routine to call when finished wit entire survey
  onSave: () => void; // save this tab
  onNav: (idx: number) => void; // nav routine. uses prev & next.
  canSave: boolean;
}
// control details of current survey tab.

export const SurveyBottomNavBar = (props: SurveyBottomNavBarProps) => {
  const {prev, next, onFinal, onSave, onNav, canSave} = props;
  const labels = canSave
    ? ['Previous', 'Complete / Submit', 'Save', 'Save / Next']
    : ['Previous', 'Complete / Submit', 'Save', 'Next'];
  const SaveLabel = 'Save'; // for later matching

  const saveAndNav = (tab) => {
    canSave && onSave();
    onNav(tab);
  };

  const saveAndFinal = () => {
    canSave && onSave();
    onFinal();
  };

  const callbacks = [
    ((prev ?? -1) >= 0) && (() => saveAndNav(prev)),
    saveAndFinal,
    onSave,
    ((next ?? -1) >= 0) && (() => saveAndNav(next)),
  ];
  const doCallback = (i) => {
    const cb = callbacks[i];
    cb && cb();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        minHeight: 300,
      }}>
      {labels.map((label, index) => {
        // if undefined, skip button.  if false, disable
        const cb = callbacks[index];
        const isDisabled = (cb === undefined) || (label === SaveLabel && !canSave);
        if (typeof cb !== 'undefined') {
          return (
            <View
              key={`sbn-${index}`}
              style={{
                flexGrow: 1,
                maxWidth: 100,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Button
                color={'green'}
                onPress={() => doCallback(index)}
                disabled={isDisabled}
                title={label}
              />
            </View>
          );
        } else {
          return null;
        }
      })}
    </View>
  );
};
