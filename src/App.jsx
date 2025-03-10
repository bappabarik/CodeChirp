import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const cachedUser = JSON.parse(localStorage.getItem("user"));

    if (cachedUser) {
      // If user exists in localStorage, use it instead of calling Appwrite API
      dispatch(login(cachedUser));
      setLoading(false);
      console.log(cachedUser);
      
    } else {
      // If no user found, fetch from Appwrite
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData));
            localStorage.setItem("user", JSON.stringify(userData)); // Cache user
            setLoading(false)
          } else {
            dispatch(logout());
            localStorage.removeItem("user");
          }
        })
        .catch((error) => {
          console.log("Auth Error:", error);
          localStorage.removeItem("user");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch]);

  return !loading ? (
    <Outlet />
  ) : (
    <div className="flex items-center justify-center h-screen w-full">Loading...</div>
  );
}

export default App;
