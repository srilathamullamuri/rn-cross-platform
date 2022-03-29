/***********************************************************************EMCL2022
 *
 * SurveyTabList.tsx
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
import {View, Text, FlatList} from 'react-native';

// import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {colors} from './styles';
import {
  SurveyScoreDict,
  SurveyDictOfStrings,
  SurveyTreeNode,
} from './SurveyTypes';

interface IProps {
  surveyTree: SurveyTreeNode[];
  surveyStatus: SurveyDictOfStrings;
  tabScores: SurveyScoreDict;
  showTab: (item) => void;
  selectedTabIdx: number;
  viewReport: (item) => void;
}

const getStatusColor = (status) => {
  switch (status?.toLowerCase?.()) {
    case 'none':
      return 'red';
    case 'started':
      return 'yellow';
    case 'complete':
      return 'green';
    default:
      return colors.light;
  }
};

export const SurveyTabList = (props: IProps) => {
  const [surveyTreeState, setSurveyTree] = React.useState<any>(
    props.surveyTree,
  );
  // const [reports, showReports] =  React.useState<boolean>(true);
  const [expandReports, showexpandReports] =  React.useState<boolean>(false);
  const [selectedReport, setSelectedReport] =  React.useState('');
  React.useEffect(() => {
    setSurveyTree(props.surveyTree);
  }, [props.surveyTree]);

  const expandedView = (item, index) => {
    setSelectedReport('');
    // viewReport(false);
    showexpandReports(false);
    showTab(item.idx);
    const presentState = [...surveyTreeState];
    if (presentState[index].expanded === true) {
      presentState[index].expanded = false;
      setSurveyTree(presentState);
    } else {
      presentState.forEach((i: any) => (i.expanded = false));
      presentState[index].expanded = !presentState[index].expanded;
      setSurveyTree(presentState);
    }
  };

  const recordView = (item:string) => {
    setSelectedReport(item)
    viewReport(true);
  };

  const {tabScores, surveyStatus, selectedTabIdx, showTab, viewReport} = props;
  return (
    <View style={{flex:1, padding: 5, justifyContent: 'space-between'}}>
      <View>
        {/* style={{borderColor: colors.darkGrey, borderWidth: 2}} */}
      <FlatList
        data={surveyTreeState}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          let itemStatus: string;
          if (item.branches?.length) {
            itemStatus = item.branches.reduce(
              (previousValue, item) => {
                const val = surveyStatus[item.name]?.toLowerCase();
                switch (val) {
                  case 'complete':
                    return (previousValue === 'complete') ? 'complete' : 'Started';
                  case 'started':
                    return 'started';
                  default:
                    return (previousValue === 'complete') ? 'Started' : previousValue;
                }
              },
              surveyStatus[item.branches[0].name],
            );
          } else {
            itemStatus = surveyStatus?.[item.name];
          }
          const itemStatusColor = getStatusColor(itemStatus);
          const topItemScore = tabScores?.[item.name];
          return (
            <View key={`top-${index}`}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderTopEndRadius: 50,
                  borderBottomEndRadius: 50,
                  backgroundColor:
                    item.idx === selectedTabIdx && expandReports=== false ? colors.ochBlue : '',
                }}>
                {item.branches?.length ? (
                  <Text
                    style={{flex: 1, fontWeight: 'bold', fontSize: 16}}
                    onPress={() => expandedView(item, index)}>
                    {item.expanded ? '-' : '+'}
                  </Text>
                ) : (
                  <Text style={{flex: 1}} />
                )}
                <Text
                  style={{
                    flex: 8,
                  }}
                  onPress={() => expandedView(item, index)}>
                  <Text style={{fontWeight: 'bold'}}>
                    {itemStatusColor.length > 0 && (
                      <FontAwesomeIcon icon="circle" color={itemStatusColor} />
                    )}{' '}
                    {item.name.replaceAll('_', ' ')}
                  </Text>
                </Text>
                <Text style={{alignSelf: 'flex-end'}}>
                  {topItemScore ? ` ${topItemScore}` : ''}
                </Text>
              </View>
              {item.branches && item.expanded && (
                <FlatList
                  data={item.branches}
                  initialNumToRender={20}
                  onEndReachedThreshold={0.5}
                  keyExtractor={(childItem, _index) => {
                    return 'key_' + childItem.idx;
                  }}
                  renderItem={({item}) => {
                    const colorCircle = getStatusColor(
                      surveyStatus?.[item.name],
                    );
                    // const surveyItem = this.state.survey[item.idx];
                    const itemName = item.name.replace(/^.*\./, '');
                    const itemScore = tabScores?.[item.name];

                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 15,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                        }}>
                        {itemName && (
                          <View
                            style={{
                              width: '100%',
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingLeft: 20,
                              backgroundColor:
                                item.idx === selectedTabIdx
                                  ? colors.ochBlue
                                  : '',
                              padding: 5,
                              borderTopEndRadius: 50,
                              borderBottomEndRadius: 50,
                            }}>
                            {colorCircle.length > 0 && (
                              <FontAwesomeIcon
                                icon="circle"
                                color={colorCircle}
                              />
                            )}
                            <Text
                              onPress={() => showTab(item.idx)}
                              style={{
                                flex: 6,
                              }}>
                              {' '}
                              {itemName.replaceAll('_', ' ')}
                            </Text>
                            <Text style={{alignSelf: 'flex-end'}}>
                              {itemScore ? ` ${itemScore}` : ''}
                            </Text>
                          </View>
                        )}
                        {!itemName && (
                          <Text
                            onPress={() => showTab(item.idx)}
                            style={{
                              padding: 5,
                            }}>
                            {item.topName}
                          </Text>
                        )}
                      </View>
                    );
                  }}
                />
              )}
            </View>
          );
        }}
      />
      </View>
      <View style={{margin: '4.25rem'}}></View>
      <View key={`top-record`}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 5,
          borderTopEndRadius: 50,
          borderBottomEndRadius: 50,
          backgroundColor:
          expandReports === true && !selectedReport
            ? colors.ochBlue
            : '',
        }}>
        <Text style={{flex: 1, fontWeight: 'bold', fontSize: 16}} onPress={() => expandReports?showexpandReports(false):showexpandReports(true)}>
          {expandReports ? '-' : '+'}
        </Text>
        <Text
          style={{
            flex: 8,
          }}>
          <Text style={{fontWeight: 'bold'}} onPress={() => expandReports?showexpandReports(false):showexpandReports(true)}>
              <FontAwesomeIcon icon="file-pdf" color={colors.ochBlue} />
            {' '}{' REPORTS'}
          </Text>
        </Text>
      </View>
      <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
          }}>
          {expandReports && (
            <View
              style={{
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                backgroundColor:
                selectedReport === 'pdf' && !selectedTabIdx
                    ? colors.ochBlue
                    : '',
                padding: 5,
                borderTopEndRadius: 50,
                borderBottomEndRadius: 50,
              }}>
                <FontAwesomeIcon
                  icon="circle"
                  color={colors.green}
                />
              <Text
                onPress={() => recordView('pdf')}
                style={{
                  flex: 6,
                }}>
                {' '}
                {'pdf'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
