import { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact="true" element={<Users />} />
        <Route path="/:userId/places" exact="true" element={<UserPlaces />} />
        <Route path="/places/new" exact="true" element={<NewPlace />} />
        <Route path="/places/:placeId" exact="true" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" exact="true" element={<Users />} />
        <Route path="/:userId/places" exact="true" element={<UserPlaces />} />
        <Route path="/auth" exact="true" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
