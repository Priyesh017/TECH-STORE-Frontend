// src/Review.js
import React from "react";

const Review = ({ review }) => {
  return (
    <div className="review">
      <h3>{review.name}</h3>
      <p>{review.comment}</p>
      <p>Rating: {review.rating}/5</p>
    </div>
  );
};

export default Review;
