import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import pinch from "../../images/Pinch.png";
import core from "../../images/core.png";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";

const P = styled("p")({
  fontWeight: "300",
  color: "grey",
  fontFamily: "sans-serif",
  fontSize:"14px"
});

function Navbaar() {
  const EMPCODE = localStorage.getItem("employeeCode");
  const EMPNAME = localStorage.getItem("name");
  const EMPEMAIL = localStorage.getItem("email");
  const userType = localStorage.getItem("User");
  const AppName = localStorage.getItem("App");
  const ReportingManager = localStorage.getItem("reportingManager");

  const handleonclickLogOut = async () => {
    console.log({});
    try {
      let response = await axios.post(
        `http://13.126.160.155:8088/bill/login/logout?email=${EMPEMAIL}&employeeCode=${EMPCODE}`,
        {
          email: EMPEMAIL,
        }
      );
      alert("Logout successfully");
      console.log(response);
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  //http://13.126.160.155:8088/bill/item/get/${EMPCODE}

  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        justifyContent: "space-between",
        backgroundColor: "rgba(190, 232, 201, 1)",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      }}
    >
      <Box
        sx={{
          marginLeft: { sm: 4, xs: 1 },
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          onClick={() => {
            AppName === "expense" && userType == "ADMIN"
              ? navigate("/billTable")
              : navigate("/dashboard") ||
            AppName === "expense" && userType == "USER"
              ? navigate("/billtabledatauser")
              : navigate("/dashboard") ||
            AppName === "approval" && userType == "USER"
              ? navigate("/approvaluserdatatable")
              : navigate("/dashboard") ||
              AppName === "approval" && userType == "ADMIN"
              ? navigate("/approvaladmindatatable")
              : navigate("/dashboard") 
          }}
          style={{
            cursor: "pointer",
          }}
          width={"50px"}
          src={pinch}
          alt=""
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* <Button color="success">
          <Link
            style={{ color: "white", fontWeight: "600", color: "green" }}
            to="/mainform">
            Add Bill
          </Link>
        </Button> */}


        <Box
          sx={{marginRight:{xs:"-35px"}}}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onMouseOver={handleClick}>
            <Avatar alt={EMPNAME[0]}  sx={{ width: 45, height: 45, border:"2px solid white"  }} src={`http://13.126.160.155:8088/bill/profile/get/profile/?employeeCode=${EMPCODE}`} />
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box sx={{ p: "20px 20px 0px 20px", backgroundColor:"" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "0px",
              }}
            >
             <Avatar alt="Remy Sharp" sx={{ width: 53, height: 53,border:"2px solid white"}} src={`http://13.126.160.155:8088/bill/profile/get/profile/?employeeCode=${EMPCODE}`} />

            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "20px",
               
              }}
            >
              
              <P style={{fontWeight:700}}>{EMPCODE}</P>
              <P>{EMPNAME}</P>
              <P>{EMPEMAIL}</P>
              <P>Manager - {ReportingManager}</P>
            </Box>
            <MenuItem
              sx={{
                color: "grey",
                fontFamily: "sans-serif",
                fontWeight: "300",
                p: "10px",
              }}
              onClick={() => {
                handleClose();
                navigate("/dashboard");
                localStorage.removeItem('App')
              }}
            >
              <AppsIcon /> &nbsp; Dashboard
            </MenuItem>
            <MenuItem
              sx={{
                color: "grey",
                fontFamily: "sans-serif",
                fontWeight: "300",
                p: "10px",
              }}
              onClick={() => {
                handleClose();
                handleonclickLogOut();
              }}
            >
              <LogoutIcon /> &nbsp; Logout
            </MenuItem>
          </Box>
        </Menu>

        <Box
          sx={{
            marginLeft: { sm: 0, xs: 1 },
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ cursor: "pointer" }}
            width={"130px"}
            src={core}
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Navbaar;
