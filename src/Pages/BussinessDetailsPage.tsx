import {
  Edit2Icon,
  Mail,
  Minus,
  PhoneCall,
  Plus,
  SortAscIcon,
  SortDescIcon,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddReviewForm from "../Components/BussinessDetails/AddReviewForm.tsx";
import ReviewItem from "../Components/BussinessDetails/ReviewItem.tsx";
import { Button } from "../Components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { SelectItem } from "../Components/ui/select.tsx";
import { SelectOptions } from "../Components/ui/SelectOptions.tsx";
import SnackBar from "../Components/ui/SnackBar";
import { useAuth } from "../Context/AuthContext";
import { useSnackBar } from "../Context/SnackBarContext";
import { BusinessesService } from "../services/business.service";
import { ReviewsService } from "../services/review.service";
import { socket } from "../services/sockets.ts";
import { BussinessI, ReviewI } from "../Types/Businesses.types";
import BusinessMap from "../Components/BussinessDetails/BusinessMap.tsx";

function BussinessDetailsPage() {
  const [business, setBusiness] = useState<BussinessI | null | undefined>(null);
  const [reviews, setReviews] = useState<ReviewI[]>([]);
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);
  const [seeAllReviews, setSeeAllReviews] = useState(false);
  const { bussinessID } = useParams();
  const navigate = useNavigate();
  const { snackBar, displaySnackBar } = useSnackBar();
  const { loggedInUser } = useAuth();
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState(-1);

  function sortReview(a: ReviewI, b: ReviewI) {
    switch (sortBy) {
      case "likes":
        return (a.likes - b.likes) * sortOrder;
      case "rating":
        return (a.rating - b.rating) * sortOrder;
      case "updatedAt":
        return (Date.parse(a.updatedAt) - Date.parse(b.updatedAt)) * sortOrder;
      default:
        return 0;
    }
  }
  const userReview = useMemo(() => {
    return reviews.find((review) => review.userId === loggedInUser?._id);
  }, [reviews, loggedInUser]);

  const allReviews = useMemo(() => {
    return reviews
      .filter((review) => review.userId !== loggedInUser?._id)
      .sort(sortReview);
  }, [reviews, loggedInUser, sortBy, sortOrder]);

  useEffect(() => {
    async function handleGetBusiness() {
      try {
        if (bussinessID) {
          const businessRes = await BusinessesService.getBusiness(bussinessID);
          const reviews = await ReviewsService.getReviews(businessRes._id);
          setBusiness(businessRes);
          setReviews(reviews);
        } else {
          throw "There isnt business ID";
        }
      } catch (error) {
        console.error(`handleGetBusiness : ${error}`);
        displaySnackBar({
          label: "Internal Error",
          context: "There was an error with get the business",
          closeManually: true,
          snackbarType: "danger",
        });
      }
    }
    handleGetBusiness();
  }, []);

  useEffect(() => {
    if (business) {
      socket.on(business._id, (updatedBusiness) => {
        setBusiness(updatedBusiness);
      });

      socket.emit("joinBusiness", business._id);

      socket.on("editReview", (updatedReview) => {
        setReviews((prev) => {
          return prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          );
        });
      });
      socket.on("addReview", (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
      });
      socket.on("deleteReview", (delReview) => {
        setReviews((prev) => {
          return prev.filter((review) => review._id !== delReview._id);
        });
      });
    }
    return () => {
      business && socket.emit("leaveBusiness", business._id);
      socket.removeAllListeners();
    };
  }, [business]);

  function validateLoggedInUser() {
    if (!loggedInUser) {
      navigate("/auth");
      return false;
    }
    return true;
  }

  function handleOpenReviewForm() {
    const b = validateLoggedInUser();
    if (b) setOpenReviewForm((prev) => !prev);
  }

  return (
    <div className=" mt-10 flex flex-col items-center justify-center">
      {business && (
        <div className=" min-h-96 w-full">
          <BusinessMap business={business} />
        </div>
      )}
      {business && (
        <Card className=" w-full max-w-400">
          <CardHeader>
            <div className=" flex gap-2 items-center">
              <CardTitle className=" text-primary">{business.name}</CardTitle>
              <div className=" flex text-lg items-center gap-1">
                {business.avgRating}{" "}
                <Star size={20} className=" text-yellow-400" />
              </div>
            </div>
            <CardDescription className=" text-base">
              {business.about}
            </CardDescription>
            <div className=" text-sm pt-4">
              <p className=" ">
                {business.city}, <span>{business.street}</span>
              </p>
              <div>
                <p className=" flex gap-1 items-center">
                  <span>{business.phone}</span>
                  <PhoneCall size={16} />
                </p>
                <p className=" flex gap-1 items-center">
                  <span>{business.email}</span>
                  <Mail size={16} />
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className=" flex flex-col gap-8">
            <div className=" flex items-center justify-between">
              <div>
                <h3>Your review : </h3>
              </div>
              <Button
                onClick={handleOpenReviewForm}
                size={"sm"}
                className="flex items-center gap-1"
              >
                {openReviewForm ? (
                  <>
                    <span>Close form</span> <Minus size={16} />
                  </>
                ) : (
                  <>
                    <span>{userReview ? "Edit" : "Add"} Review</span>
                    {userReview ? <Edit2Icon size={16} /> : <Plus size={16} />}
                  </>
                )}
              </Button>
            </div>
            <div>
              <div
                className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                  openReviewForm ? "max-h-500" : "max-h-0"
                }`}
              >
                <AddReviewForm
                  setOpenReviewForm={setOpenReviewForm}
                  businessID={business._id}
                  currentReview={userReview}
                />
              </div>
              {userReview && !openReviewForm && (
                <ReviewItem curReview={userReview} />
              )}
            </div>
            <div className=" flex items-center justify-between">
              <div>
                <h3>All reviews : </h3>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => setSortOrder((prev) => prev * -1)}
                >
                  {sortOrder === 1 ? <SortAscIcon /> : <SortDescIcon />}
                </Button>
                <SelectOptions
                  curValue={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                  selectName="sortBy"
                  selectValuePlaceholder="Sort By"
                  selectTitle="Sort By"
                  className="w-fit"
                >
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                  <SelectItem value="updatedAt">Date Updated</SelectItem>
                </SelectOptions>
              </div>
            </div>
            <ul className=" flex flex-col gap-2">
              {allReviews?.map((review, index) => {
                return seeAllReviews ? (
                  <ReviewItem key={review._id} curReview={review} />
                ) : index < 3 ? (
                  <ReviewItem key={review._id} curReview={review} />
                ) : null;
              })}
            </ul>
            {!seeAllReviews && allReviews?.length > 3 && (
              <Button
                className="w-fit"
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  setSeeAllReviews((prev) => !prev);
                }}
              >
                Get all {allReviews?.length} reviews
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      {snackBar.display && <SnackBar />}
    </div>
  );
}

export default BussinessDetailsPage;
