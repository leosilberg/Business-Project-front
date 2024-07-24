import { Heart, HeartIcon, Star, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ReviewProps } from "../../Types/BusinessDetails.types";
import { ReviewsService } from "../../services/review.service";
import { Button } from "../ui/button.tsx";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

function ReviewItem(props: ReviewProps) {
  const { curReview } = props;
  const { loggedInUser, likeReview, dislikeReview } = useAuth();
  const navigate = useNavigate();

  const likedReviewByUser = loggedInUser?.likedReviews.includes(curReview._id);

  async function handleLikeClick(ev: React.MouseEvent<SVGSVGElement>) {
    ev.stopPropagation();
    if (!loggedInUser) return navigate("/auth");
    try {
      await ReviewsService.likeReview(curReview._id);
      likeReview(curReview._id);
    } catch (error: any) {
      console.error(error);
    }
  }
  async function handleDislikeClick(ev: React.MouseEvent<SVGSVGElement>) {
    ev.stopPropagation();
    if (!loggedInUser) return navigate("/auth");
    try {
      await ReviewsService.removeLikeReview(curReview._id);
      dislikeReview(curReview._id);
    } catch (error: any) {
      console.error(error);
    }
  }
  async function deleteReview(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.stopPropagation();
    try {
      await ReviewsService.deleteReview(curReview._id);
    } catch (error) {
      console.log(`ReviewItem: `, error);
    }
  }
  return (
    <Card>
      <CardHeader className="relative">
        {loggedInUser?.username === curReview.username && (
          <div className="absolute top-6 right-6">
            <Button variant={"ghost"} size={"icon"} onClick={deleteReview}>
              <TrashIcon size={16} />
            </Button>
          </div>
        )}
        <div className="flex gap-2 text-sm text-muted-foreground">
          <p>
            {loggedInUser?.username === curReview.username
              ? "You"
              : curReview.username}
          </p>
          <p>•</p>
          <p>{new Date(curReview.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className=" flex items-center gap-2">
          <CardTitle className=" text-base">{curReview.title} </CardTitle>

          <div className=" flex items-center gap-1">
            {likedReviewByUser ? (
              <HeartIcon
                onClick={handleDislikeClick}
                size={16}
                fill="#ff0000"
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
          {curReview.rating} <Star size={16} className=" text-yellow-400" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default ReviewItem;
