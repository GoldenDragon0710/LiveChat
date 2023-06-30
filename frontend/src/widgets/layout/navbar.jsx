import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";

export function Navbar() {

  return (
    <div className="p-3 flex bg-blue-500 h-[100px] rounded-t-lg justify-center items-center">
      <Typography variant="h2" className="text-[#ffffff] font-semibold">
        Ask Charlotte, LBN’s Health Expert for answer
      </Typography>
    </div>
  );
}

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
