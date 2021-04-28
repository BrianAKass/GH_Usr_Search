import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  SET_SEARCH,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  LOAD_NEXT_PAGE,
  LOAD_PREV_PAGE,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    search: "",
    users: [],
    user: {},
    repos: [],
    loading: false,
    page: 1,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    setSearch(text);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&page=${state.page}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Load Next Page

  const loadNextPage = async () => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${state.search}&page=${
        state.page + 1
      }&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: LOAD_NEXT_PAGE,
      payload: res.data.items,
    });
  };

  // Load Prev Page

  const loadPrevPage = async () => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${state.search}&page=${
        state.page > 1 ? state.page - 1 : 1
      }&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: LOAD_PREV_PAGE,
      payload: res.data.items,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Search
  const setSearch = (x) =>
    dispatch({
      type: SET_SEARCH,
      payload: x,
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        page: state.page,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        loadNextPage,
        loadPrevPage,
        setSearch,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
