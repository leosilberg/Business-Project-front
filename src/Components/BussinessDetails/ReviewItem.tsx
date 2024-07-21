import { Heart, HeartOff, Star } from "lucide-react";
import { BussinessI, ReviewProps } from "../../Types/Businesses.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function ReviewItem(props: ReviewProps) {
  const { curReview, setBussiness } = props;
  const { loggedInUser, likeReview, dislikeReview } = useAuth();
  const navigate = useNavigate();

  const likedReviewByUser = loggedInUser?.likedReviews.includes(curReview._id);

  async function handleLikeClick() {
    if (!loggedInUser) return navigate("/auth");
    try {
      // update review, bussiness
      setBussiness((prev: BussinessI | null | undefined) => {
        if (!prev) return;
        return {
          ...prev,
          reviews: prev.reviews.map((review) =>
            review._id === curReview._id
              ? { ...review, likes: review.likes + 1 }
              : review
          ),
        };
      });
      likeReview(curReview._id);
    } catch (error: any) {
      console.error(error);
    }
  }
  async function handleDislikeClick() {
    if (!loggedInUser) return navigate("/auth");
    try {
      // update review, bussiness
      setBussiness((prev: BussinessI | null | undefined) => {
        if (!prev) return;
        return {
          ...prev,
          reviews: prev.reviews.map((review) =>
            review._id === curReview._id
              ? { ...review, likes: review.likes - 1 }
              : review
          ),
        };
      });
      dislikeReview(curReview._id);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <p className=" text-sm text-muted-foreground">
          {loggedInUser?.username === curReview.username
            ? "You"
            : curReview.username}{" "}
        </p>
        <div className=" flex items-center gap-2">
          <CardTitle className=" text-base">{curReview.title} </CardTitle>

          <div className=" flex items-center gap-1">
            {likedReviewByUser ? (
              <HeartOff
                onClick={handleDislikeClick}
                size={16}
                color="#ff0000"
                strokeWidth={2}
                cursor={"pointer"}
              />
            ) : (
              <Heart
                onClick={handleLikeClick}
                size={16}
                color="#ff0000"
                strokeWidth={2}
                cursor={"pointer"}
              />
            )}

            <span className=" text-muted-foreground">{curReview.likes}</span>
          </div>
        </div>
        <CardDescription>{curReview.description}</CardDescription>
        <div className=" flex items-center gap-1">
          {curReview.rating} <Star size={16} color="#fff700" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default ReviewItem;
