import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router";
import { getUsers, updateUserRole } from "../actions/index";
import "./Roles.css";

const Roles = (props) => {
  const { getUsers } = props;
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onChange = (e) => {
    const userId = Number(e.target.closest("tr").id);
    const role = e.target.value;
    props.updateUserRole(userId, role);
  };
  return (
    <div id="rolesTableBody">
      <table id="rolesTable" className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Login</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {props.users
            ?.filter((el) => el.userId !== props.currentUser.id)
            .map((el) => {
              return (
                <tr key={el.userId} id={el.userId}>
                  <th scope="row">{el.userId}</th>
                  <td>{el.login}</td>
                  <td>
                    <select
                      defaultValue={el.role}
                      className="form-select"
                      onChange={onChange}
                    >
                      <option value="admin">Administrator</option>
                      <option value="mod">Moderator</option>
                      <option value="user">Regular user</option>
                    </select>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUser: state.currentUser,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers, updateUserRole }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Roles)
);
