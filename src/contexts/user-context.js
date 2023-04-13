import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";

const HANDLERS = {
  SHOW: "SHOW",
};

const handlers = {
  [HANDLERS.SHOW]: (state, action) => {
    const users = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      users,
    };
  },
};

export const UserContext = createContext({ undefined });

export const UserProvider = (props) => {
  const getAllUser = async (page, limit = 5) => {
    const myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const data = {};
    fetch(`http://localhost:8000/admin/users?page=${page}&limit=${limit}`, requestOptions)
      .then((response) => response.text())
      .then((result) => (data = result))
      .catch((error) => console.log("error", error));

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: data,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getAllUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node
};

export const UserConsumer = UserContext.Consumer;

export const userContext = () => useContext(UserContext);
