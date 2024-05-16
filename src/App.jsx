import NavBar from "./components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { foundUser } from "./shope/user";
import NavBar2 from "./components/NavBar2";
import { addDataInUserOrders } from "./shope/userOrders";
import { changeOptionData } from "./shope/optionData";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      try {
        const optionData = await axios("/api/product/aceess-cat");
        dispatch(changeOptionData(optionData?.data?.data));

        const data = await axios.get("/api/user/check-auth");
        dispatch(foundUser(data.data.data));

        const oData = await axios("/api/orders/access-user-order");
        if (oData?.data?.data !== null) {
          console.log(oData?.data?.data);
          dispatch(addDataInUserOrders(oData?.data?.data));
        }
      } catch (error) {
        alert(error.message);
      }
    };
    func();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
