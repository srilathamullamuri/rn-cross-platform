/***********************************************************************EMCL2022
 *
 * SurveyDetailScreen.tsx
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
import {View, Text} from 'react-native';

// import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import SurveyWidget from './SurveyWidget';
import {colors,styles} from './styles';
import {Gauge} from './Gauge';
import {SurveyBottomNavBar} from './SurveyBottomNavBar';
import {
  SurveyAnswerDict,
  SurveyScoreDict,
  SurveyType,
  SurveyDictOfStrings,
  SurveyTreeNode,
  SurveyAnswerSetType,
} from './SurveyTypes';
import {SurveyTabList} from './SurveyTabList';
import {ModalFile} from './components/ModalFile';
export interface IProps {
  targetUser: any;
  survey: any;
  sendSurveyRes: (
    item: any,
    value: string,
    status: string,
    surveyAnswerSet: any,
  ) => void;
  selectedSurvey: (item: any) => void;
  showQuestions: boolean;
  surveyAnswer: SurveyAnswerDict;
  scores: any; // SurveyScoreDict; < compile issue
  tabScores: SurveyScoreDict;
  surveyStatus: SurveyDictOfStrings;
  surveyAnswerSet?: SurveyAnswerSetType;
  freezeAnswerSet: (surveyAnswerSetId: string) => void;
  viewPdf:(item)=> void;
  modalFileUrl: string | undefined;
}

// Layout of survey screen - banner, navigation and questions.
export const SurveyDetailScreen = (props: IProps) => {
  // this is the entire survey definition
  const [survey, setSurvey] = React.useState<SurveyType>([]);
  const [surveyTree, setSurveyTree] = React.useState<SurveyTreeNode[]>([]);
  const [surveyAnswer, setSurveyAnswer] = React.useState<SurveyAnswerDict>();
  const [surveyAnswerSet, setSurveyAnswerSet] = React.useState<
    SurveyAnswerSetType | undefined
  >(props.surveyAnswerSet);
  const [unsavedAnswers, setUnsavedAnswers] = React.useState<SurveyAnswerDict>(
    {},
  );
  const [sortedDisplay, setSortedDisplay] = React.useState<number[]>([]);

  const [selectedTabIdx, setSelectedTabIdx] = React.useState<number>(0);

  // leaving these 6 warnings in place for now - will need to use shortly
  // const [showQuestions, setShowQuestions] = React.useState<boolean>(
  //   props.showQuestions,
  // );
  // const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
  const {survey: props_survey, selectedSurvey: props_selectedSurvey} = props;
  const [canSave, setCanSave] = React.useState<boolean>(false);
  const [showPdf, setShowPdf] = React.useState<boolean>(false);
  const {modalFileUrl} = props;
  React.useEffect(() => {
    // determine if first run,  survey state will be empty
    const isFirstRun = survey.length === 0;
    console.log('etg74 - ', {isFirstRun});

    if (isFirstRun) {
      // preprocess json string. Add index and parse value
      const surveyFromProps = props_survey;
      // props_survey.map((i, idx) => {
      //   i.parsed = JSON.parse(i.value);
      //   i.idx = idx;
      //   return i;
      // });

      // extract meta data for manipulation into ordered hierarchical array
      const flatDir: SurveyTreeNode[] = surveyFromProps.map((item, idx) => {
        // console.log({value});
        return {
          topName: item.tabName.replace(/\..*$/, ''),
          name: item.tabName,
          order: item.value?.order || 99,
          idx,
        };
      });
      const flatDirSorted = flatDir.sort((a, b) => {
        if (a.topName === b.topName) {
          return a.order - b.order;
        }
        const diff = a.order - b.order;
        if (diff === 0 || (a.order === 99 && b.order === 99)) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        return diff;
      });
      console.log({flatDirSorted});

      // make l an array of unique top level tab names
      // const topLevelNames = [...new Set(flatDirSorted.map((i) => i.topName))];

      // build tree structure.
      const surveyTree: SurveyTreeNode[] = [];
      flatDirSorted.forEach((item) => {
        const newNode = (node: SurveyTreeNode, top = false) => {
          if (node.topName === node.name || !top) {
            return node;
          }
          return {
            ...node,
            name: node.topName,
            branches: [node],
          };
        };

        const lastItemIdx = surveyTree.length - 1;
        if (lastItemIdx >= 0) {
          if (item.name !== item.topName) {
            const matchingIdx = surveyTree.findIndex(
              (i) => i.topName === item.topName,
            );
            if (matchingIdx >= 0) {
              surveyTree[matchingIdx].branches?.push(newNode(item));
            } else {
              console.log({
                name: item.name,
                topName: item.topName,
                lastItemIdx,
              });
              surveyTree.push(newNode(item, true));
            }
          } else {
            console.log({
              name: item.name,
              topName: item.topName,
              lastItemIdx,
            });
            surveyTree.push(newNode(item, true));
          }
        } else {
          console.log({
            name: item.name,
            topName: item.topName,
            lastItemIdx,
          });
          surveyTree.push(newNode(item, true));
        }
      });
      console.log({surveyTree});

      const selectedTab = flatDirSorted[0].idx;
      const selectedTabName = surveyFromProps[selectedTab].tabName;
      const selectedTabRowId = surveyFromProps[selectedTab].id;
      console.log({surveyTree, selectedTab, selectedTabName});

      // Display order.. as flat array
      const sortedDisplay: number[] = [];
      surveyTree.forEach((topItem) => {
        if (topItem.branches?.length) {
          topItem.expanded = false;
          topItem.branches.forEach((botItem) => {
            sortedDisplay.push(botItem.idx);
          });
        } else {
          sortedDisplay.push(topItem.idx);
        }
      });

      // record sorted order in surveyFromProps
      sortedDisplay.forEach((i, idxSorted) => {
        surveyFromProps[i].idxSorted = idxSorted;
      });
      // console.log('POST idxSorted ', {surveyFromProps});

      setSurvey(surveyFromProps);
      setSelectedTabIdx(selectedTab);
      setSortedDisplay(sortedDisplay);
      setSurveyTree(surveyTree);

      // get answers!
      props_selectedSurvey(selectedTabRowId);
    }
  }, [props_selectedSurvey, props_survey, survey.length]);

  // React.useEffect(() => {
  //   setShowQuestions(props.showQuestions);
  // }, [props.showQuestions]);

  React.useEffect(() => {
    setSurveyAnswerSet(props.surveyAnswerSet);
  }, [props.surveyAnswerSet]);

  React.useEffect(() => {
    setSurveyAnswer(props.surveyAnswer);
  }, [props.surveyAnswer]);

  /**
   * show tab identified by idx
   * @param idx
   */
  const showTab = (idx: number) => {
    setShowPdf(false);
    if (idx < 0 || typeof idx === 'undefined') {
      return; // maybe go up a level.
    }
    const item = survey[idx];
    console.log('showTab 200', {idx, item});
    props_selectedSurvey(item.id); // should be by DB row id

    // Done above
    // if (!item.parsed) {
    //   item.parsed = JSON.parse(item.value);
    //   if (!item.parsed) {
    //     console.log('ERROR PARSING QUESTIONS: ', {value: item.value});
    //   }
    // }

    setSelectedTabIdx(idx);
    setCanSave(false);
  };
  const viewReports = (item) => {
    if(item){
      setShowPdf(true);
      props.viewPdf(surveyAnswerSet?.id);
    }else{
      setShowPdf(false);
    }
    
  }
  const sendSurveyRes = (item, status) => {
    const selectedTab = survey[selectedTabIdx].id;
    setUnsavedAnswers(item);
    console.log('sendSurveyRes', {item, selectedTab, status});
    props.sendSurveyRes(item, selectedTab, status, surveyAnswerSet);
    const ansTmp: SurveyAnswerDict = {};
    setUnsavedAnswers(ansTmp);
  };

  const saveAnswers = () => {
    // Simple - does q count = a count?
    sendSurveyRes(unsavedAnswers, 'Started');
    setCanSave(false);
  };
  const keepUnsavedAnswers = (a) => {
    setUnsavedAnswers(a);
    setCanSave(true);
  };
  const finalizeSurveySet = () => {
    // setUnsavedAnswers(a);
    surveyAnswerSet && props.freezeAnswerSet(surveyAnswerSet.id);
  };

  const selectedSurveyTab = survey[selectedTabIdx]?.value;
  const sortedIdx =
    1 + (survey[selectedTabIdx]?.idxSorted ?? sortedDisplay.length);
  const nextItem =
    (sortedIdx < sortedDisplay.length && sortedDisplay[sortedIdx]) as number ?? -1;

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>
      <View style={{flex: 1, flexDirection: 'column', minWidth: '180px'}}>
        <View>
          <Text
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
            {props.targetUser}
          </Text>
        </View>
        <SurveyTabList
          surveyTree={surveyTree}
          tabScores={props.tabScores}
          showTab={showTab}
          selectedTabIdx={selectedTabIdx}
          surveyStatus={props.surveyStatus}
          viewReport={viewReports}
        />
      </View>
      <View style={{flex: 6}}>
      {!showPdf && (<View>
        <View
          style={{
            width: '100%',
            padding: 5,
            borderColor: colors.black,
            flexDirection: 'row',
          }}>
          <Gauge meters={props.scores} />
        </View>
        <SurveyWidget
          surveyAnswer={surveyAnswer || {}}
          surveyTab={selectedSurveyTab?.survey}
          sendSurveyRes={(item, status) => sendSurveyRes(item, status)}
          onAnswer={keepUnsavedAnswers}
          viewMode={surveyAnswerSet?.bFinal}
        />
        <SurveyBottomNavBar
          next={nextItem}
          onFinal={finalizeSurveySet}
          onSave={saveAnswers}
          onNav={showTab}
          canSave={canSave}
        />
      </View>)}
      
      {showPdf && modalFileUrl && (
        <ModalFile
          url={modalFileUrl}
          onXClick={() => setShowPdf(false)}
          styles={{
            modStyle: styles.docCustomModelStyles,
            jpgStyle: styles.imagePDF,
          }}
          viewFileType="pdf"
        />
      )}</View>
    </View>
  );
};
