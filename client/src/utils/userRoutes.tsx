import { newUser, userLogin, userOutput, authService } from "./types";

export const signup = async (
  input: newUser,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<userOutput>>,
  auth: authService
) => {
  await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      setOutput(data);
      auth.login(data);
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
};

export const login = async (
  input: userLogin,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<userOutput>>,
  auth: authService
) => {
  await fetch(`/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      setOutput(data);
      auth.login(data);
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
};

export const getProfile = async (
  username: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<userOutput>>
) => {
  await fetch(`/api/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      setOutput(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
};
