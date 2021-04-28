import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;
  const prevPage = githubContext.loadPrevPage;
  const nextPage = githubContext.loadNextPage;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={buttons}>
        {users.length > 0 && <button onClick={prevPage}>prev</button>}
        <div style={userStyle}>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
        {users.length > 0 && <button onClick={nextPage}>next</button>}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
const buttons = {
  // display: "flex",
  // flex: "1 0 auto",
  // flexDirection: "row",
  // justifyContent: "space-between",
  display: "grid",
  gridTemplateColumns: "0.5fr 2fr 0.5fr",
  gridGap: ".5rem",
};

export default Users;
