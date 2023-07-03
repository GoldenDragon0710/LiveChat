import React from "react";
import PropTypes from "prop-types";
import {
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";

export function Navbar() {

  return (
    <MTNavbar className="p-3 flex bg-blue-500 h-[100px] rounded-t-lg justify-center items-center">
      <Typography variant="h4" className="text-[#ffffff] font-semibold md:text-[30px] lg:text-[40px] text-center">
        Ask Charlotte, LBN’s Health Expert for answer
      </Typography>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
