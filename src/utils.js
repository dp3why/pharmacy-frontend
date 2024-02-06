import axios from "axios";

var SERVER_ORIGIN = process.env.REACT_APP_SERVER_ORIGIN;

// const SERVER_ORIGIN = "";

export const login = (credentials) => {
  const formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  // const loginUrl = `${SERVER_ORIGIN}/login?username=${credentials.username}&password=${credentials.password}`;

  const loginUrl = `${SERVER_ORIGIN}/login`;
  // fetch will return something called a Promise
  return fetch(loginUrl, {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  }); // returns a promise
};

export const logout = () => {
  const logoutUrl = `${SERVER_ORIGIN}/logout`;
  return fetch(logoutUrl, {
    method: "POST",
    credentials: "include",
    "Content-Type": "application/json",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log out");
    }
  });
};

export const signup = (data) => {
  const signupUrl = `${SERVER_ORIGIN}/signup`;

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // convert a JavaScript object (data) into a JSON string representation.
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
  });
};

export const getMenus = (restId) => {
  const url = `${SERVER_ORIGIN}/seller/${restId}/menu`;
  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get menus");
    }

    return response.json(); // reads the response body and parses it as JSON, returns a promise that resolves with the result of parsing the body text as JSON
  });
};

export const getSellers = () => {
  const url = `${SERVER_ORIGIN}/sellers/menu`;
  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get sellers");
    }
    return response.json();
  });
};

export const getCart = () => {
  const url = `${SERVER_ORIGIN}/cart`;
  return fetch(url, {
    credentials: "include", // Include cookies with the request
  }).then((response) => {
    if (response.status === 401) {
      throw Error("Unauthorized, please login again");
    }
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }

    return response.json();
  });
};

export const checkout = () => {
  const url = `${SERVER_ORIGIN}/cart/checkout`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout, please login again");
    }
  });
};

export const addItemToCart = (itemId) => {
  const payload = {
    menu_id: itemId,
  };
  const url = `${SERVER_ORIGIN}/cart`;
  return axios
    .post(url, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add menu item to shopping cart");
      }
    });
};
