import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { use, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase.init";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Register = () => {
  const { createUser } = use(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;
    setError("");
    setSuccess(false);
    // Name validation (3-30 letters + spaces)
    // if (!/^[A-Za-z\s]{3,30}$/.test(displayName)) {
    //   setError("Name must be 3-30 letters only");
    //   return;
    // }

    // Email validation
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setError("Invalid email address");
    //   return;
    // }

    // Photo URL validation
    // if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photo)) {
    //   setError("Invalid image URL");
    //   return;
    // }

    // Password validation
    // if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
    //     password
    //   )
    // ) {
    //   setError(
    //     "Password must have uppercase, lowercase, special char & 6+ length"
    //   );
    //   return;
    // }
    // createUser(email, password)
    createUser(email, password)
      .then((result) => {
        const updateUser = {
          displayName,
          photoURL,
        };
        updateProfile(result.user, updateUser)
          .then(() => {
            sendEmailVerification(result.user).then(() => setSuccess(true));
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleOnSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
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

          {/* Register Button */}
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">
            You Have successfully register and verify your email
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
