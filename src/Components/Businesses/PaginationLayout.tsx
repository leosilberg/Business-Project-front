import { SetURLSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationLayoutProps {
  totalPagesRef: React.MutableRefObject<number | null>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function PaginationLayout({
  totalPagesRef,
  searchParams,
  setSearchParams,
}: PaginationLayoutProps) {
  let curPage = Number(searchParams.get("page")) || 1;
  if (curPage < 1) {
    curPage = 1;
  }

  let hasNextPage: boolean | undefined;
  let hasPrevPage: boolean | undefined;

  if (totalPagesRef.current) {
    hasNextPage = curPage < totalPagesRef.current;
    hasPrevPage = curPage > 1;
  }

  function handlePagination(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const buttonValue = Number(ev.currentTarget.value);
    if (buttonValue === -1 && !hasPrevPage) return;
    if (buttonValue === 1 && !hasNextPage) return;
    const newPage = buttonValue + curPage;
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  }

  return (
    <Pagination>
      <PaginationContent>
        <Button
          className={`${
            !hasPrevPage &&
            " cursor-not-allowed text-muted-foreground hover:bg-background hover:text-muted-foreground"
          }`}
          value={-1}
          variant={"ghost"}
          size={"sm"}
          onClick={handlePagination}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <PaginationItem>
          <PaginationLink isActive>{curPage}</PaginationLink>
        </PaginationItem>
        {totalPagesRef.current && curPage < totalPagesRef.current && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className=" hover:text-primary-foreground hover:bg-background">
                {totalPagesRef.current}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <Button
          className={`${
            !hasNextPage &&
            " cursor-not-allowed text-muted-foreground hover:bg-background hover:text-muted-foreground"
          }`}
          value={1}
          variant={"ghost"}
          size={"sm"}
          onClick={handlePagination}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationLayout;
