import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div
      className="w-full flex items-center justify-center relative bg-gray-700"
      style={{
        height: "100vh",
      }}
    >
      {/* <div
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.2,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      ></div> */}

      <div
        style={{
          padding: 30,
          borderRadius: 10,
          width: 510,
          position: "relative",
          zIndex: 2,
        }}
        className="shadow-xl bg-gray-100"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
