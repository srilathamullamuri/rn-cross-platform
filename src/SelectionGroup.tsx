/***********************************************************************EMCL2022
 *
 * SelectionGroup.tsx
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

// import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';

/**
 * The only real strict requirement is that 'items' is an array of objects all of which have a field
 * called 'optionText'.
 *
 * onPress should probably be SelectionHandler.selectionHandler, same for isSelected.
 *
 * If you are using SelectionHandler, it is important that if you change the *items* prop, you hand
 * over a *new instance* of SelectionHandler. See the ExampleApp for how to do this. Each group of
 * questions can get its own SelectionHandler, just put everything in parallel arrays.
 *
 * Better yet just use the upcoming react-native-survey component that'll handle all of this for you.
 *
 */

interface IProps {
  items: any;
  onPress: any;
  isSelected: any;
  isDeselected: any;
  containerStyle: any;
  renderContent: any;
  onItemSelected: any;
  getAllSelectedItemIndexes: any;
  attributes: any;
  onItemDeselected: any;
  editable: boolean;
}

export const SelectionGroup = (props: IProps) => {
  const {
    onPress,
    isSelected,
    containerStyle,
    renderContent,
    onItemSelected,
    getAllSelectedItemIndexes,
    onItemDeselected,
    ...attributes
  } = props;

  const items: any = props.items;

  /**
   * forceUpdate is called below to ensure a re-render happens, in case for whatever reason
   * the client of this component doesn't take any action that forces a redraw.
   * This is actually super inefficient code, all elements are redrawn when any single element is touched.
   */
  return (
    <View style={[{}, containerStyle && containerStyle]} {...attributes}>
      {items.map((item: any, i) =>
        renderContent(item, i, isSelected(i), () => {
          if (!props.editable) {
            onPress(i);
            if (isSelected(i)) {
              if (onItemSelected) {
                const selectedItems: any = [];
                if (getAllSelectedItemIndexes) {
                  const selectedItemIndexes = getAllSelectedItemIndexes();
                  if (selectedItemIndexes != null) {
                    for (const index of selectedItemIndexes) {
                      selectedItems.push(items[index]);
                    }
                  }
                }
                onItemSelected(item, selectedItems);
              }
            } else if (onItemDeselected) {
              const selectedItems: any = [];
              if (getAllSelectedItemIndexes) {
                const selectedItemIndexes = getAllSelectedItemIndexes();
                if (selectedItemIndexes != null) {
                  for (const index of selectedItemIndexes) {
                    selectedItems.push(items[index]);
                  }
                }
              }
              onItemDeselected(item, selectedItems);
            }
          }
        }),
      )}
    </View>
  );
};

export class SelectionHandler {
  selectedOption: any;
  maxSelected: number;
  allowDeselect: boolean;
  constructor(
    options = {maxMultiSelect: 1, allowDeselect: true, defaultSelection: null},
  ) {
    this.selectedOption =
      options.defaultSelection !== undefined ? options.defaultSelection : null; // An array if maxSelected > 1
    this.maxSelected =
      options.maxMultiSelect !== undefined ? options.maxMultiSelect : 1;
    this.allowDeselect =
      options.allowDeselect !== undefined ? options.allowDeselect : true;
  }

  getAllSelectedItemIndexes = () => {
    return this.selectedOption;
  };

  selectionHandler = (index) => {
    if (
      this.maxSelected === 1 &&
      index === this.selectedOption &&
      this.allowDeselect
    ) {
      this.selectedOption = null;
    } else if (
      this.maxSelected > 1 &&
      this.selectedOption &&
      this.selectedOption.includes(index) &&
      this.allowDeselect
    ) {
      this.selectedOption.splice(this.selectedOption.indexOf(index), 1);
    } else if (this.maxSelected === 1) {
      this.selectedOption = index;
    } else if (this.selectedOption) {
      this.selectedOption.push(index);
      if (this.selectedOption.length > this.maxSelected)
        this.selectedOption.shift();
    } else {
      this.selectedOption = [index];
    }
  };

  isSelected = (index) => {
    if (this.selectedOption === null) return false;
    if (typeof this.selectedOption === 'number')
      return index === this.selectedOption;
    return this.selectedOption.includes(index);
  };
}
