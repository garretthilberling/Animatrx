import { reviewInput, voteQuery } from "./types";

export const getReviews = async (
  animeId: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<any>>,
  sendOutput: React.Dispatch<React.SetStateAction<any>>
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
          sendOutput(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
};

export const getReview = async (
  url: string | undefined,
  reviewId: string | undefined,
  animeId: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<any>>,
  setThumbsUpSelected: React.Dispatch<React.SetStateAction<boolean>>,
  setThumbsDownSelected: React.Dispatch<React.SetStateAction<boolean>>,
  user: voteQuery
) => {
    await fetch(`http://${url}/api/anime/${animeId}/reviews/${reviewId}`, {
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
          if (data.upvotes.includes(user.userId)) {
            setThumbsUpSelected(true);
          }
          if (data.downvotes.includes(user.userId)) {
            setThumbsDownSelected(true);
          }
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

export const upvoteReview = async (
  url: string | undefined,
  user: voteQuery,
  reviewId: string | undefined,
  animeId: string | undefined,
  setError: React.Dispatch<React.SetStateAction<string>>,
  auth: string | null
) => {
  let bearer;
  if (auth) {
    bearer = "Bearer " + auth;
  } else bearer = "";
  await fetch(`http://${url}/api/anime/${animeId}/reviews/${reviewId}/upvote`, 
  {
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
}

export const downvoteReview = async (
  url: string | undefined,
  user: voteQuery,
  reviewId: string | undefined,
  animeId: string | undefined,
  setError: React.Dispatch<React.SetStateAction<string>>,
  auth: string | null
) => {
  let bearer;
  if (auth) {
    bearer = "Bearer " + auth;
  } else bearer = "";
  await fetch(`http://${url}/api/anime/${animeId}/reviews/${reviewId}/downvote`, 
  {
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
}