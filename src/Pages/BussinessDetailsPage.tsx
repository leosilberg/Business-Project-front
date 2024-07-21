import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BussinessI } from "../Types/Businesses.types";
import { businesses } from "../constants";
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

function BussinessDetailsPage() {
  const [bussiness, setBussiness] = useState<BussinessI | null | undefined>(
    null
  );
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);
  const { snackBar } = useSnackBar();
  const { bussinessID } = useParams();

  useEffect(() => {
    setBussiness(businesses.find((b) => b._id === bussinessID));
  }, []);

  return (
    <div className=" mt-10 flex flex-col items-center justify-center">
      {bussiness && (
        <Card className=" max-w-800">
          <CardHeader>
            <div className=" flex gap-2 items-center">
              <CardTitle className=" text-primary">{bussiness.name}</CardTitle>
              <div className=" flex text-[#fff700] text-lg font-semibold items-center gap-1">
                {bussiness.avgRating} <Star size={20} color="#fff700" />
              </div>
            </div>
            <CardDescription className=" text-base">
              {bussiness.about}
            </CardDescription>
            <div className=" text-sm pt-4">
              <p className=" ">
                {bussiness.city}, <span>{bussiness.street}</span>
              </p>
              <div>
                <p className=" flex gap-1 items-center">
                  <span>{bussiness.phone}</span>
                  <PhoneCall size={16} />
                </p>
                <p className=" flex gap-1 items-center">
                  <span>{bussiness.email}</span>
                  <Mail size={16} />
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className=" flex flex-col gap-2">
            <div className=" flex items-center justify-between">
              <h3>User's reviews : </h3>
              <Button
                onClick={() => {
                  setOpenReviewForm((prev) => !prev);
                }}
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
              <AddReviewForm bussiness={bussiness} />
            </div>
            <ul className=" flex flex-col gap-2">
              {bussiness.reviews.map((review) => {
                return (
                  <ReviewItem
                    key={review._id}
                    curReview={review}
                    setBussiness={setBussiness}
                  />
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
      {snackBar.display && <SnackBar />}
    </div>
  );
}

export default BussinessDetailsPage;
