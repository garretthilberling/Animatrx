import { userOutput, usernameQuery, authService } from "./types";

export const addWatchLater = async (
  animeId: string | undefined,
  username: string | undefined,
  setError: React.Dispatch<React.SetStateAction<string>>,
  auth: string | null
) => {
  let authorization;
  if (auth) {
    authorization = auth;
  } else authorization = "";
  await fetch(`/api/anime/${animeId}/watchLater`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(username),
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
