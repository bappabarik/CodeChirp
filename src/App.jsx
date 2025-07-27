import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInstallationStatus,
  fetchInstallation,
  login,
  logout,
} from "./store/authSlice";
import dbService from "./appwrite/db";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const installationStatus = useSelector(
    (state) => state.auth.installationStatus
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Check if user data exists in localStorage
    const cachedUser = JSON.parse(localStorage.getItem("user"));

    if (cachedUser) {
      // If user exists in localStorage, use it instead of calling Appwrite API
      dispatch(login(cachedUser));
      setLoading(false);
    } else {
      // If no user found, fetch from Appwrite
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData));
            localStorage.setItem("user", JSON.stringify(userData)); // Cache user
            setLoading(false);
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
    dbService.subscribeToGithubApp(
      cachedUser?.targets[0].providerId,
      (deleteEvent) => {
        if (deleteEvent) {
          dispatch(changeInstallationStatus(false));
        }
        if (!deleteEvent) {
          dispatch(changeInstallationStatus(true));
        }
      }
    );

    return () => {
      dbService.unsubscribeToGithubApp();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchInstallation());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.targets[0].providerId) {
      dbService.requestNotificationPermission(
        userData.targets[0].providerId,
        "BMeiuRyGjMDP1YasCfDk6K-ki2lmmTeUwfUIpVniC2XJfTMxay4f37saeAkCW2M7f49eb3_adAjfopbKrAEBpOo"
      );
    }
  }, [userData]);

  // useEffect(() => {
  //   if (!installationStatus && userData) {
  //     dbService.getGithubAppData(userData.targets[0].providerId)
  //     .then(data => {
  //       if (data) {
  //         dispatch(changeInstallationStatus(true))
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }

  // }, [userData]);

  // useEffect(() => {
  //   if (userData) {
  //   dbService.subscribeToGithubApp(userData.targets[0].providerId, (deleteEvent) => {
  //     if (deleteEvent) {
  //       dispatch(changeInstallationStatus(false))
  //       console.log(deleteEvent);
  //     }
  //   })
  // }
  //   return () => {
  //     dbService.unsubscribeToGithubApp()
  //   };
  // }, [dispatch]);

  return !loading ? (
    <Outlet />
  ) : (
    <>
      <div className="flex md:flex-row flex-col w-full h-screen gap-2 p-2">
        <div className="flex gap-2">
          {[...new Array(1)].map((i) => (
            <div
              key={"first-array" + i}
              className="md:h-full h-16 md:w-72 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {[...new Array(1)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
