import React from 'react';
import renderer from 'react-test-renderer';
import SurveyListScreen from '../src/SurveyListScreen';

test('renders correctly Survey List Screen', () => {
  const data = [
    {id: 1, name: 'Life Plan', version: '0.9', answerSetId: 76, final: false},
  ];

  const tree = renderer.create(<SurveyListScreen list={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
