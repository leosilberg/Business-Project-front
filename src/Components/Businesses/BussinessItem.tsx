import { useNavigate } from "react-router-dom";
import { BussinessItemProps } from "../../Types/Businesses.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Mail, PhoneCall } from "lucide-react";

function BussinessItem({ bussiness }: BussinessItemProps) {
  const navigate = useNavigate();

  function moveToBussinessPage() {
    navigate(bussiness._id);
  }

  return (
    <li className=" w-full">
      <Card className=" h-full cursor-pointer" onClick={moveToBussinessPage}>
        <CardHeader>
          <CardTitle className=" text-primary">{bussiness.name}</CardTitle>
          <CardDescription>{bussiness.about}</CardDescription>
        </CardHeader>
        <CardContent className=" text-sm flex flex-col gap-2">
          <p className=" ">
            {bussiness.location.city}, <span>{bussiness.location.street}</span>
          </p>
          <div>
            <p className=" text-muted-foreground flex gap-1 items-center">
              <span>{bussiness.contact.phone}</span>
              <PhoneCall size={16} />
            </p>
            <p className=" text-muted-foreground flex gap-1 items-center">
              <span>{bussiness.contact.email}</span>
              <Mail size={16} />
            </p>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

export default BussinessItem;
