import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Test from "./Pages/Test";
// const root = document.getElementById("root")!;
import Index from "./Pages/Product/Index";
// import Show from "./Pages/Product/Show";
import Create from "./Pages/Product/Create";
import { getCurrentUser } from "./lib/api/auth";
import type { User } from "./interfaces";
import { Navigate } from "react-router-dom";
import Show from "./Pages/Product/Show";
import Confirm from "./Pages/Product/Confirm";
import ProductEdit from "./Pages/Product/Edit";
import Profile from "./Pages/Auth/Profile";
import ProfileEdit from "./Pages/Auth/Edit";
import CartIndex from "./Pages/Cart/Index";
import CartConfirm from "./Pages/Cart/Confirm";
import OrderIndex from "./Pages/Orders/Index";

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log("current user activate")
        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Navigate to="/login" replace />;
      }
    } else {
      return <></>
    }
  }
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/show/:id" element={<Show />}></Route>

        <Route
          path="/create"
          element={
            <Private>
              <Create />
            </Private>
          }
        />
        <Route
          path="/confirm"
          element={
            <Private>
              <Confirm />
            </Private>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Private>
              <ProductEdit />
            </Private>
          }
        />
        <Route
          path="/auth/profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route
          path="/auth/profile/edit"
          element={
            <Private>
              <ProfileEdit />
            </Private>
          }
        />
        <Route
          path="/cart/index"
          element={
            <Private>
              <CartIndex />
            </Private>
          }
        />
        <Route
          path="/cart/confirm"
          element={
            <Private>
              <CartConfirm />
            </Private>
          }
        />
        <Route
          path="/orders"
          element={
            <Private>
              <OrderIndex />
            </Private>
          }
        />
      </Routes>
    </AuthContext.Provider>

  )
};

export default App;