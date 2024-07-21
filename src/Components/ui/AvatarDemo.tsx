import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://www.freeiconspng.com/uploads/rick-avatar-blue-vers--icon-12.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
