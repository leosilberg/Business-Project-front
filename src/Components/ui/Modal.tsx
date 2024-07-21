import { cn } from "../../lib/utils";
import { ModalProps } from "../../Types/UI_Components.types";

function Modal({ children, className }: ModalProps) {
  return (
    <>
      <div className=" fixed bg-foreground top-0 left-0 bottom-0 right-0 opacity-50 z-50"></div>
      <div
        className={cn(
          "fixed top-1/2 left-1/2 bg-background min-w-80 w-2/3 z-50 translate-x-[-50%] translate-y-[-50%] font-montserrat min-h-400 h-fit rounded-md",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export default Modal;
