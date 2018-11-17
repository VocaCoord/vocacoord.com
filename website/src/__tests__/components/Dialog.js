import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemDialog from "../../components/Dialog.js";

Enzyme.configure({ adapter: new Adapter() });

const globalProps = {
  onCancel: () => {},
  onChange: () => {},
  onClickOut: () => {},
  onSubmit: () => {},
  open: false,
  submitMsg: "",
  title: ""
};

describe("Dialog Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ItemDialog {...globalProps} />);
    expect(wrapper.exists()).toBe(true);
  });
});
