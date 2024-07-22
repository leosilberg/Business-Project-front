import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import api from "../services/api.service";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { Button } from "../Components/ui/button";
import { IconInput } from "../Components/ui/input";
import { useAuth } from "../Context/AuthContext";
import { useSnackBar } from "../Context/SnackBarContext";

function LoginPage() {
  const { loginUser } = useAuth();
  const [displayPassword, setDisplayPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setNewUser((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  async function handleLoginUser(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    loginUser(newUser);
    ev.currentTarget.reset();
  }

  return (
    <>
      <form
        className=" w-full max-w-80 flex flex-col gap-4"
        onSubmit={handleLoginUser}
      >
        <IconInput
          Icon={User}
          value={newUser.email}
          onChange={handleInputChange}
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <div className="relative">
          <IconInput
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            Icon={LockKeyhole}
            placeholder="Password"
            type={`${displayPassword ? "text" : "password"}`}
            required
          />
          <button
            type="button"
            className=" absolute top-3 right-3 text-gray-400"
            onClick={() => {
              setDisplayPassword((prev) => !prev);
            }}
          >
            {displayPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <p className=" text-xs mx-auto">
          Dont have an account?{" "}
          <Link className=" font-semibold text-primary" to={"register"}>
            Register
          </Link>
        </p>
        <Button className="block w-full">Sign In</Button>
      </form>
    </>
  );
}

export default LoginPage;
