import MyMap from "../Components/Businesses/Map";
import { useAuth } from "../Context/AuthContext";

function UserPage() {
  const {} = useAuth();

  return (
    <div>
      {/* <MyMap /> */}
    </div>
  );
}

export default UserPage;
