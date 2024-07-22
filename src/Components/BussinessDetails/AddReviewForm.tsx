import { Star } from "lucide-react";
import { useRef, useState } from "react";
import { useSnackBar } from "../../Context/SnackBarContext";
import { BussinessI, NewReviewI } from "../../Types/Businesses.types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddReviewFormProps } from "../../Types/BusinessDetails.types";
import { ReviewsService } from "../../services/review.service";

function AddReviewForm({
  setBusiness,
  businessID,
  setOpenReviewForm,
}: AddReviewFormProps) {
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

  function resetForm(ev: React.FormEvent<HTMLFormElement>) {
    setSelectedReviewValue(1);
    displaySnackBar({
      label: "Your review added successfully",
    });
    setOpenReviewForm(false);
    const form = ev.target as HTMLFormElement;
    form.reset();
  }

  async function handleSubmitForm(ev: React.FormEvent<HTMLFormElement>) {
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

    const newReview: NewReviewI = {
      title: titleFormData as string,
      description: descriptionFormData as string,
      rating: selectedReviewValue,
    };


    try {
      const savedReview = await ReviewsService.createReview(
        newReview,
        businessID
      );
      setBusiness((prev: BussinessI | null | undefined) => {
        if (!prev) return null;
        return {
          ...prev,
          reviews: prev.reviews ? [savedReview, ...prev.reviews] : undefined,
        };
      });
      resetForm(ev);
    } catch (error) {
      displaySnackBar({
        label: "Error!",
        context: "Sorry there was an internal error",
        closeManually: true,
        snackbarType: "danger",
      });
    }
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
