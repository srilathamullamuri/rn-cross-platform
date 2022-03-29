import React from 'react';
import renderer from 'react-test-renderer';
import { SurveyDetailScreen } from '../src/SurveyDetailScreen';
test('renders correctly survey detail screen', function () {
    var tree = renderer.create(React.createElement(SurveyDetailScreen, null)).toJSON();
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=SurveyDetailScreen.test.js.map