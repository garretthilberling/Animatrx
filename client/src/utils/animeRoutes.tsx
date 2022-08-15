import { userOutput, usernameQuery, authService } from "./types";

export const addWatchLater = async (
  animeTitle: string | undefined,
  user: usernameQuery | undefined,
  setError: React.Dispatch<React.SetStateAction<string>>,
  auth: string | null
) => {
  let bearer;
  if (auth) {
    bearer = "Bearer " + auth;
  } else bearer = "";
  await fetch(`/api/anime/${animeTitle}/watchLater`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
};

export const addFavorites = async (
    animeTitle: string | undefined,
    user: usernameQuery | undefined,
    setError: React.Dispatch<React.SetStateAction<string>>,
    auth: string | null
  ) => {
    let bearer;
    if (auth) {
      bearer = "Bearer " + auth;
    } else bearer = "";
    await fetch(`/api/anime/${animeTitle}/favorites`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };