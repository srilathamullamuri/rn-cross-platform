import React from 'react';
import renderer from 'react-test-renderer';
import SurveyListScreen from '../src/SurveyListScreen';
test('renders correctly Survey List Screen', function () {
    var data = [
        { id: 1, name: 'Life Plan', version: '0.9', answerSetId: 76, final: false },
    ];
    var tree = renderer.create(React.createElement(SurveyListScreen, { list: data })).toJSON();
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=SurveyListScreen.test.js.map