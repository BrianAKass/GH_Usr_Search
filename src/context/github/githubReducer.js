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

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        page: 0,
        loading: false,
      };
    case GET_REPOS: {
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
        users: action.payload,
        loading: false,
      };
    case LOAD_PREV_PAGE:
      return {
        ...state,
        page: state.page > 1 ? state.page - 1 : 1,
        users: action.payload,
        loading: false,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};
