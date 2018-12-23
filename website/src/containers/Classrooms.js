import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ItemDialog from '../components/Dialog';
import ListItems from '../components/ListItems';
import { apiURL } from '../constants/Assorted';
import { addClass, editClass, removeClass } from '../actions';

class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDialog: false,
      currentClass: {},
      dialogError: false,
      editingDialog: false,
      newClassName: ''
    };
    this.generateTo = this.generateTo.bind(this);
    this.handleClassroomAdd = this.handleClassroomAdd.bind(this);
    this.handleClassroomStartEdit = this.handleClassroomStartEdit.bind(this);
    this.handleClassroomEdit = this.handleClassroomEdit.bind(this);
    this.handleClassroomRemove = this.handleClassroomRemove.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  generateTo(classroom) {
    const { match } = this.props;
    const pathname = `${match.url}/${classroom.id}/wordbanks`;
    return {
      pathname
    };
  }

  handleClassroomAdd() {
    const { newClassName } = this.state;
    const { dispatch } = this.props;

    if (newClassName === '') return this.setState({ dialogError: true });

    this.setState({ addingDialog: false });
    fetch(`${apiURL}/create`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        const code = json.classID;
        const name = newClassName;
        dispatch(addClass(code, name));
        this.setState({
          newClassName: ''
        });
      });
  }

  handleClassroomStartEdit(currentClass) {
    this.setState({ editingDialog: true, currentClass });
  }

  handleClassroomEdit() {
    const { newClassName, currentClass } = this.state;
    const { dispatch } = this.props;

    if (newClassName === '') return this.setState({ dialogError: true });

    const { id } = currentClass;
    const name = newClassName;
    dispatch(editClass(id, name));

    this.setState({ editingDialog: false });
  }

  handleClassroomRemove(classroom) {
    const { dispatch } = this.props;
    dispatch(removeClass(classroom.id));
  }

  handleDialogChange(e) {
    this.setState({ newClassName: e.target.value, dialogError: false });
  }

  handleDialogClose() {
    this.setState({
      dialogError: false,
      addingDialog: false,
      editingDialog: false,
      newClassName: ''
    });
  }

  render() {
    const { addingDialog, dialogError, editingDialog } = this.state;
    const { classrooms } = this.props;
    const classList = Object.keys(classrooms).map(key => classrooms[key]);
    return (
      <div>
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Classroom Name"
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleClassroomAdd}
          open={addingDialog}
          submitMsg="Add"
          title="Add Classroom"
        />
        <ItemDialog
          error={dialogError}
          errorMsg="This field cannot be blank."
          label="Classroom Name"
          onCancel={this.handleDialogClose}
          onChange={this.handleDialogChange}
          onClickOut={this.handleDialogClose}
          onSubmit={this.handleClassroomEdit}
          open={editingDialog}
          submitMsg="Change"
          title="Edit Classroom"
        />
        <ListItems
          add={() => this.setState({ addingDialog: true })}
          edit={this.handleClassroomStartEdit}
          list={classList}
          name="classroom"
          remove={this.handleClassroomRemove}
          title="Classroom List"
          generateTo={this.generateTo}
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
