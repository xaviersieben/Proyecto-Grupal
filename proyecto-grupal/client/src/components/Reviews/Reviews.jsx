import { useState, useEffect } from "react";
import { getReviews } from "../../redux/actions/productsActions";
import { Typography, Box, Rating } from "@material-ui/core";

export default function Reviews({ props }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(props.productId).then((reviews) => {
      setReviews(reviews);
    });
  }, [props.productId]);

  return (
    <div>
      {reviews.map((review) => (
        <Box mb={2}>
          <Typography variant="h5">{review.user.name}</Typography>
          <Rating name="read-only" value={review.rating} readOnly />
          <Typography>{review.comment}</Typography>
        </Box>
      ))}
    </div>
  );
}
