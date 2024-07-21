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
import { Mail, PhoneCall } from "lucide-react";
import ReviewLayout from "../Components/BussinessDetails/ReviewLayout";

function BussinessDetailsPage() {
  const [bussiness, setBussiness] = useState<BussinessI | null | undefined>(
    null
  );
  const { bussinessID } = useParams();

  useEffect(() => {
    setBussiness(businesses.find((b) => b._id === bussinessID));
  }, []);

  return (
    <div className=" mt-10 flex flex-col items-center justify-center">
      {bussiness && (
        <Card className=" max-w-800">
          <CardHeader>
            <CardTitle>{bussiness.name}</CardTitle>
            <CardDescription className=" text-base">
              {bussiness.about}
            </CardDescription>
            <div className=" text-sm pt-4">
              <p className=" ">
                {bussiness.location.city},{" "}
                <span>{bussiness.location.street}</span>
              </p>
              <div>
                <p className=" flex gap-1 items-center">
                  <span>{bussiness.contact.phone}</span>
                  <PhoneCall size={16} />
                </p>
                <p className=" flex gap-1 items-center">
                  <span>{bussiness.contact.email}</span>
                  <Mail size={16} />
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className=" flex flex-col gap-2">
            {bussiness.reviews.map((review) => (
              <ReviewLayout key={review._id} curReview={review} setBussiness={setBussiness} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BussinessDetailsPage;
