import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";
import PropTypes from "prop-types";

const Users = ({ icon, icon2 }) => {
  const githubContext = useContext(GithubContext);

  const {
    loading,
    users,
    results,
    page,
    loadPrevPage,
    loadNextPage,
  } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={buttonGrid}>
        {users.length > 0 && (
          <div className="div-left" onClick={loadPrevPage}>
            <button className="btn-grid">
              <i className="fas fa-angle-left btn-grid-left" />
            </button>
          </div>
        )}
        <div>
          {users.length > 0 && (
            <div className="flexbox">
              <h3 className="flex2">Users: {results}</h3>
              <h3 className="flex2">Page: {page}</h3>
            </div>
          )}
          <div style={userStyle}>
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </div>
        {users.length > 0 && (
          <div className="div-right" onClick={loadNextPage}>
            <button className="btn-grid">
              <i className="fas fa-angle-right btn-grid-right" />
            </button>
          </div>
        )}
      </div>
    );
  }
};
Users.defaultProps = {
  icon: "fas fa-angle-left",
  icon2: "fas fa-angle-right",
};

Users.propTypes = {
  icon: PropTypes.string.isRequired,
  icon2: PropTypes.string.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "0.5fr 2fr 0.5fr",
  gridGap: ".5rem",
};

export default Users;
