/***********************************************************************EMCL2022
 *
 * SurveyTypes.tsx
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

export interface SurveyQuestionOptions {
  optionText: string;
  value: string;
}

export type SurveyAnswerDict = {
  [key: string]: string | string[];
};

export type SurveyScoreDict = {
  [key: string]: number;
};

export type SurveyDictOfStrings = {
  [key: string]: string;
};

export interface SurveyQuestion {
  type: any;
  questionSettings: any;
  questionType: string;
  questionText: string;
  questionId: string;
  options: SurveyQuestionOptions[];
  placeholderText: string;
  defaultValue: any;
  rows?: any[];
  columns?: any[];
  name?: string;
  title?: string;
}

export type SurveyTabType = {
  id: string;
  tabName: string;
  value: any;
  createdAt: string;
  deletedAt: null | string;
  selected?: boolean;
  organizationId: number;
  templateName: string;
  updatedAt: string;
  version: string;
  idxSorted?: number;
  idx?: number;
};

export type SurveyAnswerSetType = {
  id: string;
  revision: any;
  createdAt: string;
  deletedAt: null | string;
  bFinal: boolean;
};

export type SurveyTreeNode = {
  topName: string;
  name: string;
  order: number;
  idx: number; // index into the survey array
  branches?: SurveyTreeNode[];
  expanded?: boolean;
};

export type SurveyType = SurveyTabType[];
