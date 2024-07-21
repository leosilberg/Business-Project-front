import { useNavigate } from "react-router-dom";
import { BussinessItemProps } from "../../Types/Businesses.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Mail, PhoneCall, Star } from "lucide-react";

function BussinessItem({ bussiness }: BussinessItemProps) {
  const navigate = useNavigate();

  function moveToBussinessPage() {
    navigate(bussiness._id);
  }

  return (
    <li className=" w-full">
      <Card className=" h-full cursor-pointer" onClick={moveToBussinessPage}>
        <CardHeader>
          <div className=" flex gap-2 items-center">
            <CardTitle className=" text-primary">{bussiness.name}</CardTitle>
            <div className=" flex items-center gap-1">
              {bussiness.avgRating} <Star size={16} color="#fff700" />
            </div>
          </div>
          <CardDescription>{bussiness.about}</CardDescription>
        </CardHeader>
        <CardContent className=" text-sm flex flex-col gap-2">
          <p className=" ">
            {bussiness.city}, <span>{bussiness.street}</span>
          </p>
          <div>
            <p className=" text-muted-foreground flex gap-1 items-center">
              <span>{bussiness.phone}</span>
              <PhoneCall size={16} />
            </p>
            <p className=" text-muted-foreground flex gap-1 items-center">
              <span>{bussiness.email}</span>
              <Mail size={16} />
            </p>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

export default BussinessItem;
