import { newUser, userLogin, userOutput, authService } from "./types";

export const signup = async (
    input: newUser,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setOutput: React.Dispatch<React.SetStateAction<userOutput>>,
    auth: authService
  ) => {
    // console.log(Object(input));
    await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
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
        auth.login(data.token);
    })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }

