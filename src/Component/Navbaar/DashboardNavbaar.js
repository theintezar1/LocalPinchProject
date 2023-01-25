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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";

const P = styled('p')({
  fontWeight:"300",
  color:"grey",
  fontFamily:"sans-serif"
})

function DashboardNavbaar() {
  const EMPCODE = localStorage.getItem("employeeCode");
  const EMPNAME = localStorage.getItem("name");
  const EMPEMAIL = localStorage.getItem("email");
  const userType = localStorage.getItem("User");

  const handleonclickLogOut = async () => {
    console.log({});
    try {
      let response = await axios.post(
        `http://192.168.1.22:8083/bill/login/logout?email=${EMPEMAIL}&employeeCode=${EMPCODE}`,
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
        position:"fixed",
        top:"0",
        display: "flex",
        alignItems: "center",
        padding: 1,
        justifyContent: "space-between",
        backgroundColor: "rgba(190, 232, 201, 1)",
        width:"100%"
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
          // onClick={() => {
          //   {
          //     userType == "ADMIN" && navigate("/billtable");
          //   }
          // }}
          style={{
            cursor: "pointer",
          }}
          width={"50px"}
          src={pinch}
          alt=""
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>

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

        <Box
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onMouseOver={handleClick}
        >
          <Avatar sx={{ bgcolor: "#b04225" }} >{EMPNAME[0]}</Avatar>
        </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{p:"20px 20px 0px 20px"}}>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"10px", padding:"0px"}}>
          <Avatar sx={{ bgcolor: "#b04225", }}>{EMPNAME[0]}</Avatar>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"10px", padding:"15px"}}>
          <P>{EMPNAME}</P>
          <P>{EMPEMAIL}</P>
          <P>{EMPCODE}</P>
          <P>{userType}</P>
          </Box>
        <MenuItem sx={{color:"grey", fontFamily:"sans-serif", fontWeight:"300" ,p:"10px"}} onClick={()=>{navigate("/dashboard"); handleClose()}}><AppsIcon /> &nbsp; Dashboard</MenuItem>
        <MenuItem sx={{color:"grey", fontFamily:"sans-serif", fontWeight:"300", p:"10px"}} onClick={()=>{handleClose(); handleonclickLogOut()}}><LogoutIcon /> &nbsp; Logout</MenuItem>
        </Box>
      </Menu>
      </Box>
    </Box>
  );
}

export default DashboardNavbaar;
