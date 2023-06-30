import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

export function MyLoader({ isloading }) {

  return (
    <div className="w-[100px] h-[80px] z-20 my-2">
      <div className="h-full flex justify-center items-center">
        <SyncLoader
          color={"#000000"}
          loading={isloading}
          size={13}
          cssOverride={{ height: "50px" }}
        />
      </div>
    </div>
  );
}

MyLoader.displayName = "/src/widgets/loader/MyLoader.jsx";

export default MyLoader;
