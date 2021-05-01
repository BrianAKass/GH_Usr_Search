import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
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
      <div className="buttonGrid">
        {users.length > 0 && (
          <div className="div-left" onClick={page !== 1 && loadPrevPage}>
            {page !== 1 && (
              <button className="btn-grid">
                <i className="fas fa-angle-left btn-grid-left" />
              </button>
            )}
          </div>
        )}
        <div>
          {users.length > 0 && (
            <div className="flexbox">
              <h3 className="flex2">Users: {results}</h3>
              <h3 className="flex2">Page: {page}</h3>
            </div>
          )}
          <div className="userGrid">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </div>
        {users.length > 0 && (
          <div
            className="div-right"
            onClick={users.length === 30 && loadNextPage}
          >
            {users.length === 30 && (
              <button className="btn-grid">
                <i className="fas fa-angle-right btn-grid-right" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Users;
