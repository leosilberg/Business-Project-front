import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { BussinessI, ReviewI } from "../../Types/Businesses.types";
import { useSnackBar } from "../../Context/SnackBarContext";

export interface AddReviewFormProps {
  bussiness: BussinessI;
}

function AddReviewForm({ bussiness }: AddReviewFormProps) {
  const { loggedInUser } = useAuth();
  const { displaySnackBar } = useSnackBar();
  const [selectedReviewValue, setSelectedReviewValue] = useState<number>(1);
  const [hoverReviewValues, setHoverReviewValues] = useState<number>(0);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  const markedStar = hoverReviewValues
    ? hoverReviewValues
    : selectedReviewValue;
  const starsArr = [1, 2, 3, 4, 5];

  function handleStarHover(starValue: number) {
    setHoverReviewValues(starValue);
  }
  function handleStarFinishedHover() {
    setHoverReviewValues(0);
  }

  function validateInputForm(
    inputValue: FormDataEntryValue | null,
    inputRef: React.MutableRefObject<HTMLInputElement | null>
  ) {
    if (!inputValue) {
      if (inputRef.current) {
        inputRef.current.style.border = "2px solid red";
      }
    } else {
      if (inputRef.current) {
        inputRef.current.style.border = "1px solid  hsl(var(--input))";
      }
    }
  }

  function handleSubmitForm(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const titleFormData = formData.get("title");
    const descriptionFormData = formData.get("description");
    validateInputForm(titleFormData, titleInputRef);
    validateInputForm(descriptionFormData, descriptionInputRef);

    if (!titleFormData || !descriptionFormData) {
      displaySnackBar({
        label: "Error!",
        context: "All the fields must be filled",
        closeManually: true,
        snackbarType: "danger",
      });
      return;
    }

    const newReview: ReviewI = {
      title: titleFormData as string,
      description: descriptionFormData as string,
      rating: selectedReviewValue,
      username: loggedInUser?.username as string,
      userID: loggedInUser?._id as string,
      bussiness: bussiness._id,
      likes: 0,
    };
    console.log(newReview);
    setSelectedReviewValue(1);
    ev.currentTarget.reset();
    displaySnackBar({
      label: "Your review added successfully",
    });
  }

  return (
    <form
      className=" flex flex-col gap-2 border p-4 rounded-md"
      onSubmit={handleSubmitForm}
    >
      <div className=" flex flex-col gap-2">
        <Input ref={titleInputRef} name="title" placeholder="Title...*" />
        <Input
          ref={descriptionInputRef}
          name="description"
          placeholder="Review...*"
        />
        <div className="flex gap-1 justify-center ">
          {starsArr.map((value) => {
            return (
              <Star
                key={value}
                color={markedStar >= value ? "#eeff00" : "#ffffff"}
                cursor={"pointer"}
                size={18}
                onMouseEnter={() => handleStarHover(value)}
                onMouseLeave={handleStarFinishedHover}
                onClick={() => {
                  setSelectedReviewValue(value);
                }}
              />
            );
          })}
        </div>
      </div>
      <Button>Submit</Button>
    </form>
  );
}

export default AddReviewForm;
