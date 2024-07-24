import ReviewItem from "@/Components/BussinessDetails/ReviewItem.tsx";
import { socket } from "@/services/sockets.ts";
import { UsersService } from "@/services/user.service.ts";
import { ReviewWithBusinessI } from "@/Types/Businesses.types.ts";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/alert-dialog.tsx";
import { Button } from "../Components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog.tsx";
import { Input } from "../Components/ui/input.tsx";
import { Label } from "../Components/ui/label.tsx";
import { useAuth } from "../Context/AuthContext";

function UserPage() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  if (loggedInUser === null) {
    return <Navigate to={"/auth"} />;
  }

  const [userReviews, setUserReviews] = useState<ReviewWithBusinessI[]>([]);

  useEffect(() => {
    async function loadUserReviews() {
      try {
        const data = await UsersService.getUserReviews();
        setUserReviews(data);
      } catch (error) {}
    }
    loadUserReviews();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      socket.emit("joinRoom", loggedInUser._id);

      socket.on("editReview", (updatedReview) => {
        setUserReviews((prev) => {
          return prev.map((review) =>
            review._id === updatedReview._id
              ? { ...updatedReview, business: review.business }
              : review
          );
        });
      });
      socket.on("deleteReview", (delReview) => {
        setUserReviews((prev) => {
          return prev.filter((review) => review._id !== delReview._id);
        });
      });
    }
    return () => {
      loggedInUser && socket.emit("leaveRoom", loggedInUser._id);
      socket.removeAllListeners();
    };
  }, [loggedInUser]);
  async function changePassword(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const password = formData.get("password") as string;
    const newPassword = formData.get("newPassword") as string;
    try {
      await UsersService.editUser({ newPassword, password });
    } catch (error) {
      console.log(`UserPage: `, error);
    }
  }

  async function deleteUser() {
    await UsersService.deleteUser();
    navigate("/auth");
  }
  return (
    <div className="flex flex-col items-center gap-8">
      <Card className=" w-full max-w-500">
        <CardHeader>
          <CardTitle>{loggedInUser?.username}</CardTitle>
          <CardDescription>{loggedInUser?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{loggedInUser?.firstName + " " + loggedInUser?.lastName}</p>
        </CardContent>
        <CardFooter className="justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Change Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form
                id="passwordForm"
                className="grid gap-4 py-4"
                onSubmit={changePassword}
              >
                <div className="grid  gap-4">
                  <Label>Old Password</Label>
                  <Input name="password" />
                </div>
                <div className="grid  gap-4">
                  <Label>New Password</Label>
                  <Input name="newPassword" />
                </div>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" form="passwordForm">
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteUser}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      <ul className="grid grid-cols-3 gap-8">
        {userReviews.map((review) => {
          return (
            <Card
              key={review._id}
              onClick={() => navigate(`/businesses/${review.business._id}`)}
            >
              <CardHeader>
                <CardTitle>{review.business.name}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewItem curReview={review} />
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}

export default UserPage;
