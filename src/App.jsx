import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useListingsStore } from "./store/useListingsStore.js";
import { useAuthStore } from "./store/useAuthStore.js";
import Navbar from "./components/Navbar.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import ListingDetailPage from "./pages/ListingDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
// TODO (step 3): once you've built them, import your route guards:
 import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

// The board loads from the listings store; the auth store restores the session.
function App() {
  const loadListings = useListingsStore((state) => state.loadListings);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* public — anyone can browse the board */}
        <Route path="/" element={<BoardPage />} />
        <Route path="/listings/:listingId" element={<ListingDetailPage />} />

        {/* TODO (step 3): wrap these two in <PublicRoute> so logged-in users skip them: */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>                                                              
       
        {/* TODO (step 3): wrap this in <PrivateRoute> so logged-out users get sent to /login:*/}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>                                                              
           </Routes>

      <footer className="board-footer">
        Food Rescue Network is a classroom prototype for learning React. It isn&apos;t a real
        food-sharing service — all listings are fictional.
      </footer>
    </div>
  );
}

export default App;
