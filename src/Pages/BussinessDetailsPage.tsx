import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BussinessI } from "../Types/Businesses.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Mail, Minus, PhoneCall, Plus, Star } from "lucide-react";
import ReviewItem from "../Components/BussinessDetails/ReviewItem";
import { Button } from "../Components/ui/button";
import AddReviewForm from "../Components/BussinessDetails/AddReviewForm";
import { useSnackBar } from "../Context/SnackBarContext";
import SnackBar from "../Components/ui/SnackBar";
import { BusinessesService } from "../services/business.service";
import { ReviewsService } from "../services/review.service";
import { useAuth } from "../Context/AuthContext";

function BussinessDetailsPage() {
  const [business, setBusiness] = useState<BussinessI | null | undefined>(null);
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);
  const [seeAllReviews, setSeeAllReviews] = useState(false);
  const { bussinessID } = useParams();
  const navigate = useNavigate();
  const { snackBar, displaySnackBar } = useSnackBar();
  const { loggedInUser } = useAuth();

  // todo figure out type

  useEffect(() => {
    async function handleGetBusiness() {
      try {
        if (bussinessID) {
          const businessRes = await BusinessesService.getBusiness(bussinessID);
          const reviews = await ReviewsService.getReviews(businessRes._id);
          console.log(reviews);
          businessRes.reviews = reviews;
          setBusiness(businessRes);
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
        <Card className=" w-full max-w-500">
          <CardHeader>
            <div className=" flex gap-2 items-center">
              <CardTitle className=" text-primary">{business.name}</CardTitle>
              <div className=" flex text-lg items-center gap-1">
                {business.avgRating} <Star size={20} color="#fff700" />
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
          <CardContent className=" flex flex-col gap-2">
            <div className=" flex items-center justify-between">
              <div>
                <h3>User's reviews : </h3>
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
                    <span>Add Review</span> <Plus size={16} />
                  </>
                )}
              </Button>
            </div>
            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                openReviewForm ? "max-h-500" : "max-h-0"
              }`}
            >
              <AddReviewForm
                setOpenReviewForm={setOpenReviewForm}
                businessID={business._id}
                setBusiness={setBusiness}
              />
            </div>
            <ul className=" flex flex-col gap-2">
              {business.reviews?.map((review, index) => {
                return seeAllReviews ? (
                  <ReviewItem
                    key={review._id}
                    curReview={review}
                    setBussiness={setBusiness}
                  />
                ) : index < 3 ? (
                  <ReviewItem
                    key={review._id}
                    curReview={review}
                    setBussiness={setBusiness}
                  />
                ) : null;
              })}
            </ul>
            {!seeAllReviews &&
              business.reviews?.length &&
              business.reviews?.length > 3 && (
                <Button
                  className="w-fit"
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => {
                    setSeeAllReviews((prev) => !prev);
                  }}
                >
                  Get all {business.reviews?.length} reviews
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
