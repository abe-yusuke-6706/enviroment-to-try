import { useState, useEffect, createContext } from "react";
import { getCurrentUser } from "./lib/api/auth";
import type { User } from "./interfaces/index.interface";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import Show from "./Pages/Product/Show";
import Confirm from "./Pages/Product/Confirm";
import ProductEdit from "./Pages/Product/Edit";
import Profile from "./Pages/Auth/Profile";
import ProfileEdit from "./Pages/Auth/Edit";
import CartIndex from "./Pages/Cart/Index";
import CartConfirm from "./Pages/Cart/Confirm";
import OrderIndex from "./Pages/Orders/Index";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Test from "./Pages/Test";
import Index from "./Pages/Product/Index";
import Create from "./Pages/Product/Create";
import CurrentCard from "./Pages/CreditCard/CurrentCard";
import CardRegistration from "./Pages/CreditCard/CardRegistration";

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      const resData = res as { data: { isLogin: boolean; data: User } };

      if (resData.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(resData.data.data);
      }
    } catch (err) {
      console.error("認証情報の取得中にエラーが発生しました:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const Private = () => {
    if (loading) {
      return <div className="text-center py-10">ロード中...</div>;
    }

    if (isSignedIn) {
      return <Outlet />;

    } else {
      return <Navigate to="/login" replace />;
    }
  };

  const Guest = () => {
    if (loading) {
      return <div className="text-center py-10">ロード中...</div>;
    }

    if (isSignedIn) {
      return <Navigate to="/" replace />;

    } else {
      return <Outlet />;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/test" element={<Test />} />

        <Route element={<Guest />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Private />}>
          <Route path="/create" element={<Create />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/edit/:id" element={<ProductEdit />} />

          <Route path="/auth/profile" element={<Profile />} />
          <Route path="/auth/profile/edit" element={<ProfileEdit />} />

          <Route path="/cart/index" element={<CartIndex />} />
          <Route path="/cart/confirm" element={<CartConfirm />} />
          <Route path="/orders" element={<OrderIndex />} />

          <Route path="/card/register" element={<CardRegistration />} />
          <Route path="/card" element={<CurrentCard />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;