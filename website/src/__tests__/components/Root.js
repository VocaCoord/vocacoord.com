import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Root from "../../components/Root.js";
import configureStore from "../../store/configureStore";

Enzyme.configure({ adapter: new Adapter() });

describe("Root Component", () => {
  it("renders without crashing", () => {
    const mockStore = configureStore();
    const wrapper = shallow(<Root store={mockStore} />);

    expect(wrapper.exists()).toBe(true);
  });
});
