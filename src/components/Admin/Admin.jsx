import React from "react";
import SideBar from "./sideBar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <>
      <main>
        <section className="grid grid-cols-10">
          <SideBar></SideBar>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default Admin;
