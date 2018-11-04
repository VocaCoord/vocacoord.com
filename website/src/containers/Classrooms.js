import React, { Component } from "react";
import { ItemDialog } from "../components/Dialog.js";
import { AddButton } from "../components/Buttons.js";
import ListInfo from "../components/ListInfo.js";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { apiURL } from "../Constants.js";
import { addClass, editClass, removeClass } from "../actions";

class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      creatingClass: false,
      currentClass: {},
      dialogError: false,
      editingDialog: false,
      newClassName: ""
    };
    this.handleClassroomAdd = this.handleClassroomAdd.bind(this);
    this.handleClassroomStartEdit = this.handleClassroomStartEdit.bind(this);
    this.handleClassroomEdit = this.handleClassroomEdit.bind(this);
    this.handleClassroomRemove = this.handleClassroomRemove.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleClassroomAdd() {
    if (this.state.newClassName === "")
      return this.setState({ dialogError: true });

    this.setState({ addingDialog: false });
    fetch(apiURL + "create", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        const code = json.classID,
          name = this.state.newClassName;
        this.props.dispatch(addClass(code, name));
        this.setState({
          creatingClass: false,
          newClassName: ""
        });
      });
  }

  handleClassroomStartEdit(currentClass) {
    this.setState({ editingDialog: true, currentClass });
  }

  handleClassroomEdit() {
    if (this.state.newClassName === "")
      return this.setState({ dialogError: true });

    const id = this.state.currentClass.id,
      name = this.state.newClassName;
    this.props.dispatch(editClass(id, name));

    this.setState({ editingDialog: false });
  }

  handleClassroomRemove(classroom) {
    this.props.dispatch(removeClass(classroom.id));
  }

  handleDialogChange(e) {
    this.setState({ newClassName: e.target.value, dialogError: false });
  }

  handleDialogClose() {
    this.setState({
      dialogError: false,
      addingDialog: false,
      editingDialog: false,
      creatingClass: false,
      newClassName: ""
    });
  }

  render() {
    let { classrooms } = this.props;
    const classList = Object.keys(classrooms).map(key => classrooms[key]);
    return (
      <div>
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Classroom Name"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleClassroomAdd}
          open={this.state.addingDialog}
          submitMsg={"Add"}
          title={"Add Classroom"}
        />
        <ItemDialog
          error={this.state.dialogError}
          errorMsg={"This field cannot be blank."}
          label={"Classroom Name"}
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleClassroomEdit}
          open={this.state.editingDialog}
          submitMsg={"Change"}
          title={"Edit Classroom"}
        />
        <ListInfo
          edit={this.handleClassroomStartEdit}
          list={classList}
          missing={
            "It looks like you don't have any classrooms yet, click the add button to create a classroom"
          }
          remove={this.handleClassroomRemove}
          title={"Classroom List"}
          to={{
            pathname: "/classrooms/test/wordbanks"
          }}
        />
        <AddButton
          variant="fab"
          color="primary"
          aria-label="Add"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            outline: "none"
          }}
          onClick={() =>
            this.setState({ addingDialog: true, creatingClass: true })
          }
          disabled={this.state.creatingClass}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const classrooms = state.userData.classrooms || {};
  return {
    classrooms
  };
};

export default withRouter(connect(mapStateToProps)(Classrooms));
