import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text, 0);
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          className="flex"
          onChange={onChange}
        />
        {githubContext.users.length === 0 ? (
          <input
            type="submit"
            value="Search"
            className="btn btn-dark"
            style={{ borderRadius: "0px 15px 15px 0px" }}
          />
        ) : (
          <div>
            <input
              type="submit"
              className="btn btn-light"
              onClick={githubContext.clearUsers}
              value="Clear"
              style={{ borderRadius: "0px", margin: "0" }}
            />
            <input
              type="submit"
              value="Search"
              className="btn btn-dark"
              style={{ borderRadius: "0px 15px 15px 0px" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
