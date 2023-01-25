import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { useParams } from "react-router";


function FileUpload() {
  const invbillid = localStorage.getItem("BillID");
  const [invoiceAttachment, setInvoiceAttachment] = useState();
  const invNum = localStorage.getItem("InvoiceNumber");
  const invDate = localStorage.getItem("InvoiceDate");
  const invname = localStorage.getItem("EmployeeName");
  const formData = new FormData();
  formData.append("document", invoiceAttachment);
  let navigate = useNavigate();
  const changeHandler = (event) => {
    const imagebase = URL.createObjectURL(event.target.files[0]);
    setInvoiceAttachment(event.target.files[0]);
  };

  const EMPNAME = localStorage.getItem("name");
  const USERTYPE = localStorage.getItem("User");
  const EMPCODE = localStorage.getItem("employeeCode");

  const handleonclick = async () => {
    if (invoiceAttachment) {
      let formData = new FormData();
      formData.append("file", invoiceAttachment);

      axios
        .post(
          `http://192.168.1.22:8083/bill/reimbursement/upload/file?employeeCode=${EMPCODE}`,
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(`Success` + res.data);
          alert("uploaded successfully");
        //   if (USERTYPE === "ADMIN") {
        //     navigate("/billtable");
        //   }
        //   if (USERTYPE === "USER") {
        //     navigate("/billtabledatauser");
        //   }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Box mt={2} p={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography variant="p" color="initial">
            <span
              style={{ color: "green", fontSize: "20px", fontWeight: "800" }}
            >
              Invoice Number -
            </span>{" "}
            {invNum || "No-Data"}
          </Typography>
          <Typography variant="p" color="initial">
            <span
              style={{ color: "green", fontSize: "18px", fontWeight: "800" }}
            >
              {" "}
              Employee Name -{" "}
            </span>{" "}
            {EMPNAME || "No-Data"}
          </Typography>
          <Typography variant="p" color="initial">
            <span
              style={{ color: "green", fontSize: "18px", fontWeight: "800" }}
            >
              Date -
            </span>{" "}
            {invDate || "No-Data"}
          </Typography>
        </Box>

        <Box mt={5}>
          <input
            style={{ fontSize: "18px" }}
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <Box mt={0.5} p={1} sx={{ fontSize: "12px", color: "red" }}>
            ( Please upload only JPEG, PNG, PDF files only, max allowed size:
            2MB* )
          </Box>
        </Box>
        <Box mt={4}>
          <Button
            color="success"
            variant="contained"
            sx={{}}
            onClick={handleonclick}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FileUpload;
