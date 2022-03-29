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
import { __assign, __rest } from "tslib";
// import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
export var SelectionGroup = function (props) {
    var onPress = props.onPress, isSelected = props.isSelected, containerStyle = props.containerStyle, renderContent = props.renderContent, onItemSelected = props.onItemSelected, getAllSelectedItemIndexes = props.getAllSelectedItemIndexes, onItemDeselected = props.onItemDeselected, attributes = __rest(props, ["onPress", "isSelected", "containerStyle", "renderContent", "onItemSelected", "getAllSelectedItemIndexes", "onItemDeselected"]);
    var items = props.items;
    /**
     * forceUpdate is called below to ensure a re-render happens, in case for whatever reason
     * the client of this component doesn't take any action that forces a redraw.
     * This is actually super inefficient code, all elements are redrawn when any single element is touched.
     */
    return (React.createElement(View, __assign({ style: [{}, containerStyle && containerStyle] }, attributes), items.map(function (item, i) {
        return renderContent(item, i, isSelected(i), function () {
            if (!props.editable) {
                onPress(i);
                if (isSelected(i)) {
                    if (onItemSelected) {
                        var selectedItems = [];
                        if (getAllSelectedItemIndexes) {
                            var selectedItemIndexes = getAllSelectedItemIndexes();
                            if (selectedItemIndexes != null) {
                                for (var _i = 0, selectedItemIndexes_1 = selectedItemIndexes; _i < selectedItemIndexes_1.length; _i++) {
                                    var index = selectedItemIndexes_1[_i];
                                    selectedItems.push(items[index]);
                                }
                            }
                        }
                        onItemSelected(item, selectedItems);
                    }
                }
                else if (onItemDeselected) {
                    var selectedItems = [];
                    if (getAllSelectedItemIndexes) {
                        var selectedItemIndexes = getAllSelectedItemIndexes();
                        if (selectedItemIndexes != null) {
                            for (var _a = 0, selectedItemIndexes_2 = selectedItemIndexes; _a < selectedItemIndexes_2.length; _a++) {
                                var index = selectedItemIndexes_2[_a];
                                selectedItems.push(items[index]);
                            }
                        }
                    }
                    onItemDeselected(item, selectedItems);
                }
            }
        });
    })));
};
var SelectionHandler = /** @class */ (function () {
    function SelectionHandler(options) {
        if (options === void 0) { options = { maxMultiSelect: 1, allowDeselect: true, defaultSelection: null }; }
        var _this = this;
        this.getAllSelectedItemIndexes = function () {
            return _this.selectedOption;
        };
        this.selectionHandler = function (index) {
            if (_this.maxSelected === 1 &&
                index === _this.selectedOption &&
                _this.allowDeselect) {
                _this.selectedOption = null;
            }
            else if (_this.maxSelected > 1 &&
                _this.selectedOption &&
                _this.selectedOption.includes(index) &&
                _this.allowDeselect) {
                _this.selectedOption.splice(_this.selectedOption.indexOf(index), 1);
            }
            else if (_this.maxSelected === 1) {
                _this.selectedOption = index;
            }
            else if (_this.selectedOption) {
                _this.selectedOption.push(index);
                if (_this.selectedOption.length > _this.maxSelected)
                    _this.selectedOption.shift();
            }
            else {
                _this.selectedOption = [index];
            }
        };
        this.isSelected = function (index) {
            if (_this.selectedOption === null)
                return false;
            if (typeof _this.selectedOption === 'number')
                return index === _this.selectedOption;
            return _this.selectedOption.includes(index);
        };
        this.selectedOption =
            options.defaultSelection !== undefined ? options.defaultSelection : null; // An array if maxSelected > 1
        this.maxSelected =
            options.maxMultiSelect !== undefined ? options.maxMultiSelect : 1;
        this.allowDeselect =
            options.allowDeselect !== undefined ? options.allowDeselect : true;
    }
    return SelectionHandler;
}());
export { SelectionHandler };
//# sourceMappingURL=SelectionGroup.js.map