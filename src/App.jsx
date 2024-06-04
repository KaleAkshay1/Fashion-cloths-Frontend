import NavBar from "./components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { foundUser } from "./shope/user";
import { changeOptionData } from "./shope/optionData";

// tostify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDataInWishlist } from "./shope/whishlist";
import { addDataInBag } from "./shope/bag";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  useEffect(() => {
    const func = async () => {
      try {
        const filterData = await axios("/api/items/fetch-filter-data");
        dispatch(changeOptionData(filterData?.data?.data));

        const data = await axios.get("/api/user/check-user");
        dispatch(foundUser(data.data.data));

        const wData = await axios("/api/whishlist/fetch-items-from-whishlist");
        if (wData?.data?.data !== null) {
          dispatch(addDataInWishlist(wData.data.data));
        }

        const bagData = await axios("/api/cart/fetch-data-from-cart");
        if (bagData?.data?.data !== null) {
          dispatch(addDataInBag(bagData?.data?.data));
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.info("🔐Plz login for better experiance", {
            position: "top-center",
          });
        } else {
          alert(error.message);
        }
      }
    };
    func();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
        pauseOnHover={false}
      />
      <Outlet></Outlet>
    </>
  );
}

export default App;
