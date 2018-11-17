import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Classrooms from "../../containers/Classrooms.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Root Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Classrooms />);
    expect(wrapper.exists()).toBe(true);
  });
});
