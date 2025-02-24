import { ScanFace } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const loginURI = `${import.meta.env.VITE_APP_URI}/api/v1/user/google`;
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Link
        to={loginURI}
        className="google-btn w-[30%] py-4 border-2 font-semibold cursor-pointer shadow-lg border-blue-700 text-lg bold rounded-lg p-2 flex items-center justify-center gap-3"
      >
        <button>Login with Google</button>
        <ScanFace />
      </Link>
    </div>
  );
};

export default Login;
