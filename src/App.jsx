import NavBar from "./components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { foundUser } from "./shope/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      try {
        const data = await axios.get("/api/user/check-auth");
        dispatch(foundUser(data.data.data));
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
