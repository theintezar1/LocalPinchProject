import React, { useState } from "react";
import "./login.css";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pinch from "../../images/Pinch.png";
import core from "../../images/core.png";
function Login() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");

  console.log(employeeCode, password);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      let response = await axios.post(
        "http://192.168.1.22:8083/bill/login/login",
        
        {
          employeeCode: employeeCode,
          password: password,
        }
      );
      
      if (response.data.data.userType == "ADMIN" || response.data.data.userType == "USER") {
        navigate("/dashboard");
        localStorage.setItem("User", response.data.data.userType);
        localStorage.setItem("employeeCode", response.data.data.employeeCode);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("name", response.data.data.employeeName);
        localStorage.setItem("status", response.data.data.status);
        localStorage.setItem(
          "reportingManager",
          response.data.data.reportingManager
        );
        localStorage.setItem(
          "reportingManagerID",
          response.data.data.reportingManagerId
        );
        console.log(response.data.data.userType);
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="Body">
      <Box
        sx={{
          marginLeft: { sm: 0, xs: 1 },
          display: "grid",
          justifyContent: "end",
          mt:{sm:"10px", xs:"10px"},
          mr:{sm:"20px", xs:"10px"}
        }}
      >
        <img
          style={{
            cursor: "pointer",
          }}
          width={"60px"}
          src={pinch}
          alt=""
        />
      </Box>

      <div className="form">
        <Box
          sx={{
            mt: "-30px",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              cursor: "pointer",
            }}
            width={"150px"}
            src={core}
            alt=""
          />
        </Box>
        <Box p={1}>
          <input
            onChange={(e) => {
              setEmployeeCode(e.target.value);
            }}
            type="text"
            placeholder="Employee Code"
            id="username"
          />
        </Box>
        <Box p={1}>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            id="password"
          />
        </Box>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
