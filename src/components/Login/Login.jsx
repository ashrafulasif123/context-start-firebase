import { Link, useLocation, useNavigate } from "react-router";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { use, useRef, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
gitHubProvider.addScope("user:email");

const Login = () => {
  const { user, signIn, loading } = use(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Google Sign In
  const handleGoogleSignIn = () => {
    setError("");
    setSuccess("");
    signInWithPopup(auth, googleProvider)
      .then(() => {
        setSuccess("You have successfully Login");
        navigate("/");
      })
      .catch((error) => setError(error.message));
  };

  // GitHub Sign In
  const handleGitHubSignIn = () => {
    setError("");
    setSuccess("");
    signInWithPopup(auth, gitHubProvider)
      .then(() => {
        setSuccess("You have successfully Login");
        navigate("/");
      })
      .catch(() => { });
  };

  // Email Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");
    setSuccess("");
    signIn(email, password)
      .then(() => {
        // if (result.user.emailVerified) {
        //   setUser(result.user);
        //   setSuccess("You have successfully Login");
        // } else {
        //   setError("Your Email is not Verified");
        // }
        setSuccess("You have successfully Login");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handlePasswordReset = () => {
    const email = emailRef.current.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  if (loading) {
    return (
      <div className="min-h-screen relative">
        <span className="loading loading-bars loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-2 text-lg cursor-pointer"
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
          </div>

          {/* Login Button */}
          {!user && (
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Login
            </button>
          )}
        </form>
        <p
          onClick={handlePasswordReset}
          className="underline text-right mt-2 cursor-pointer"
        >
          Forget Password
        </p>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500 font-black">{success}</p>}

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google */}
        {!user && (
          <button
            onClick={handleGoogleSignIn}
            className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="google"
            />
            Google Sign In
          </button>
        )}

        {/* GitHub */}

        {!user && (
          <button
            onClick={handleGitHubSignIn}
            className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 mt-3 hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              className="w-5 h-5"
              alt="github"
            />
            GitHub Sign In
          </button>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
