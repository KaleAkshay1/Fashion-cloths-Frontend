import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import shope from "./shope/index.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/User/Login.jsx";
import Register from "./components/User/Register.jsx";
import EnterOtp from "./components/User/EnterOtp.jsx";
import Product from "./components/Product.jsx";
import Admin from "./components/Admin/Admin.jsx";
import AddProductForm from "./components/Admin/AddProductForm.jsx";
import axios from "axios";
import FindProduct from "./components/FindProduct.jsx";
import Bag from "./components/OrderDetails/Bag.jsx";
import Wishlists from "./components/OrderDetails/Wishlists.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />,
      <Route
        path="/:cat/detail/:id"
        element={<FindProduct />}
        loader={async ({ params }) => {
          return axios(`/api/items/see-detail-of-product/${params.id}`);
        }}
      ></Route>
      <Route path="/men" element={<Product cat="men" />} />
      ,
      <Route path="/women" element={<Product cat="women" />} />
      ,
      <Route path="/kids" element={<Product cat="kids" />} />
      ,
      <Route path="/cart" element={<Bag />} />,
      <Route
        path="/wishlist"
        element={<Wishlists />}
        loader={async () => {
          return await axios("/api/whishlist/access-items-from-whishlist");
        }}
      />
      ,
      <Route path="/enterOtp" element={<EnterOtp />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/register" element={<Register />} />,
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin" element={<AddProductForm />} />
        {/* <Route path="/admin/list" element={<AddP />} /> */}
      </Route>
      ,
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={shope}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
