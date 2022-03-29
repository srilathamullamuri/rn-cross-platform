import React from 'react';
import renderer from 'react-test-renderer';
import {SurveyDetailScreen} from '../src/SurveyDetailScreen';

test('renders correctly survey detail screen', () => {
  const tree = renderer.create(<SurveyDetailScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
