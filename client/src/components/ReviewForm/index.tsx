import React, { useState } from "react";
import { postReview } from "../../utils/reviewRoutes";
import { reviewInput } from "../../utils/types";
import AuthService from "../../utils/auth";

const ReviewForm = ({ animeId }: any) => {
  let userId = AuthService.getProfile().data._id;
  let auth = AuthService.getToken();
  const [formState, setFormState] = useState<reviewInput>({
    userId: userId,
    animeId: animeId,
    title: '',
    body: '',
    rating: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        postReview(formState, setError, auth);
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
  }

  return (
    <div className="review-container">
      <form onSubmit={handleFormSubmit} className="login-signup-flex">
        <input
          className="form-input-margin"
          placeholder="Review Title"
          name="title"
          type="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
        />
        <input
          className="form-input-margin"
          placeholder="Your rating (1-10)"
          name="rating"
          type="number"
          id="rating"
          max={10}
          min={0}
          value={formState.rating}
          onChange={handleChange}
        />
        <textarea
          className="form-input-margin"
          placeholder="Your review"
          name="body"
          id="body"
          rows={5}
          cols={22}
          value={formState.body}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
