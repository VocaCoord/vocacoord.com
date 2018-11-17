import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  AddButton,
  BackButton,
  DeleteButton,
  EditButton
} from "../../components/Buttons.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Button Components", () => {
  describe("Add Button", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(<AddButton />);
      expect(wrapper.exists()).toBe(true);
    });
  });
  describe("Back Button", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(<BackButton />);
      expect(wrapper.exists()).toBe(true);
    });
  });
  describe("Delete Button", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(<DeleteButton />);
      expect(wrapper.exists()).toBe(true);
    });
  });
  describe("Edit Button", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(<EditButton />);
      expect(wrapper.exists()).toBe(true);
    });
  });
});
