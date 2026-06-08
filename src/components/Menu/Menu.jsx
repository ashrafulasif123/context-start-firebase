import { use, useState } from "react";
// import { FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT ICON */}
        <div className="text-2xl font-bold">
          <Link to="/">⚡ MyApp</Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/orders" className={linkClass}>
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          </li>
        </ul>

        {/* RIGHT BUTTON */}
        {/* <div className="hidden md:block">
          {user ? (
            <img
              className="h-10 w-10 rounded-full"
              src={user.photoURL}
              alt=""
            />
          ) : (
            <FaUser className="text-xl" />
          )}
        </div> */}

        {user ? (
          <a onClick={handleLogOut} className="btn">
            Sign Out
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Register
              </NavLink>
            </li>
          </ul>

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center bg-blue-600 text-white py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Menu;
