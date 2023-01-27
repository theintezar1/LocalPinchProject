import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Autocomplete,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";

import axios from "axios";
function InvoiceStatusRemark() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [statusRemark, setStatusRemark] = useState("");

  const handleInvoiceStatusRemarkUpdate = async () => {
    try {
      let response = await axios.put(
        ` http://192.168.1.22:8083/bill/bill/update/invoiceStatus/${id}`,
        {
          invoiceStatus: statusRemark,
        }
      );
      alert("Your Status Remark Update successfully");
      console.log(response);
      navigate("/billtable");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box p={2} m={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Invoice Status Update"
            variant="outlined"
            onChange={(e) => setStatusRemark(e.target.value)}
            value={statusRemark}
          />

          <Button
            size="large"
            mt={4}
            sx={{ width: { sm: 300, xs: 250 }, mb: "20px" }}
            onClick={handleInvoiceStatusRemarkUpdate}
            variant="contained"
            color="success"
          >
            Update Status
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default InvoiceStatusRemark;
