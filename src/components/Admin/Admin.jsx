import React from "react";
import SideBar from "./sideBar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <>
      <main>
        <section className="flex">
          <SideBar></SideBar>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default Admin;
