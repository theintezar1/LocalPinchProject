import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbaar from "../../Component/Navbaar/DashboardNavbaar";

function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
}

const BOX1 = styled(Box)({
  display: "grid",
  padding:"20px",
  width:"100%"
});

const BOX2 = styled(Box)({
  minWidth: "300px",
  minHeight: "170px",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  padding:"10px",
  // "&:hover": {
  //   backgroundColor:"#FFF0F5",
  //   cursor: "pointer",
  //   boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  // },
});

function DashBoard() {
  const userType = localStorage.getItem("User");
  let navigate = useNavigate();
  return (
    <>
    <BOX1>
      <Box
        sx={{
          display: "flex",
          justifyContent: {sm:"left", xs:"center"},
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Apps list */}
        <BOX2
           sx={{ 
           // backgroundColor: "rgba(255, 186, 255, 0.54)",
           border:"1px solid #FFF0F5",
          }}
          onClick={() => {
            userType==="ADMIN"?navigate("/billtable"):navigate("/billtabledatauser")
            localStorage.setItem("App","expense");
          }}>
          <img
            width={"100px"}
            style={{ margin:"auto"}}
            src="https://www.thegreatapps.com/application/upload/Apps/2017/03/expense-manager-22.png"
            alt="Expense Managemnet"
          />
          <p style={{ fontWeight: "400", fontFamily: "sans-serif", }}>
            Expense Management
          </p>
        </BOX2>

        <BOX2
           sx={{ 
            // backgroundColor: "rgba(255, 186, 255, 0.54)",
            border:"1px solid #FFF0F5",
           }}
        onClick={() => {
          userType==="ADMIN"?navigate("/approvaladmindatatable"):navigate("/approvaluserdatatable")
          localStorage.setItem("App","approval");
        }}
        >
          <img
            width={"100px"}
            style={{ margin:"auto"}}
            src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/done-icon.png"
            alt="Expense Managemnet"
          />
          <p style={{ fontWeight: "400", fontFamily: "sans-serif" }}>
            Approval Management
          </p>
        </BOX2>

        {/* <BOX2
           sx={{ 
            // backgroundColor: "rgba(255, 186, 255, 0.54)",
            border:"1px solid #FFF0F5",
           }}
        onClick={() => {
          userType==="ADMIN"?navigate("/reimbursementform"):navigate("/reimbursementuserdatatable")
          localStorage.setItem("App","approval");
        }}
        >
          <img
            width={"110px"}
            style={{ margin:"auto", borderRadius:"50%"}}
            src="https://t4.ftcdn.net/jpg/02/59/53/59/360_F_259535979_3wA5XTavoeh39PjoriJ1X6dXo5VtI4lC.jpg"
            alt="Expense Managemnet"
          />
          <p style={{ fontWeight: "400", fontFamily: "sans-serif" }}>
            Reimbursement Management
          </p>
        </BOX2> */}
      </Box>
    </BOX1>
    </>
  );
}

export default DashBoard;
