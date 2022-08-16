import { reviewInput } from "./types";

export const getReviews = async (
  animeId: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<any>>
) => {
    await fetch(`/api/anime/${animeId}/reviews`, {
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

export const postReview = async (
  input: reviewInput,
  setError: React.Dispatch<React.SetStateAction<string>>,
  auth: string | null
) => {
  let bearer;
  if (auth) {
    bearer = "Bearer " + auth;
  } else bearer = "";
  await fetch(`/api/anime/${input.animeId}/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: bearer,
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
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
};
