import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createRender } from '@material-ui/core/test-utils';
import Content from './Content';

enzyme.configure({ adapter: new Adapter() });

describe('<Content />', () => {
  let render;

  beforeAll(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<Content />);
  });
});