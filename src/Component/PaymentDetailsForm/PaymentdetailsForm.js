import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Autocomplete,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import axios from "axios";
function PaymentdetailsForm() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [paidAmount, setPaidAmount] = useState("");
  const [updatepaymentStatus, setUpdatePaymentStatus] = useState("");
  const [transactionsDetail, setTransactionsDetail] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const newUpdatePaymentDate = moment(paymentDate).format("DD/MM/YYYY");
  console.log({ newUpdatePaymentDate });
  const EMPNAME = localStorage.getItem("name");
  const DATEOFChanges = moment(new Date()).format("DD/MM/YYYY, h:mm a");
  const handlePaymanetUpdate = async () => {
    try {
      let response = await axios.put(
        `http://13.126.160.155:8088/bill/bill/update/${id}`,
        {
          paidAmount: paidAmount,
          reimbursementDate: newUpdatePaymentDate,
          updatePaymentStatus: updatepaymentStatus,
          transactionDetail: transactionsDetail,
          updatedBy: EMPNAME,
          updatedAt: DATEOFChanges,
        }
      );
      alert("Your Payment Details Update successfully");
      console.log(response);
      navigate("/billtable");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box mt={4} p={2}>
        <Typography ml={9} mt={2} variant="p" color="initial">
          <span
            style={{
              color: "green",
              fontSize: "20px",
              fontWeight: "800",
              marginLeft: { sm: "5%", xs: "20%" },
            }}
          >
            Invoice ID -
          </span>{" "}
          {id || "No-Data"}
        </Typography>
        <Box
          mt={6}
          sx={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Paid Amount"
            variant="outlined"
            onChange={(e) => setPaidAmount(e.target.value)}
            value={paidAmount}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Reimbursement Payment Date"
              value={paymentDate}
              onChange={(newValue) => {
                setPaymentDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  size="medium"
                  sx={{ width: 300, color: "black" }}
                />
              )}
            />
          </LocalizationProvider>

          {/* <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Payment Status"
            variant="outlined"
            onChange={(e) => setPaymentStatus(e.target.value)}
            value={paymentStatus}
          /> */}

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentStatusDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setUpdatePaymentStatus(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Payment Status" />
            )}
          />

          <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Transactions Detail"
            variant="outlined"
            onChange={(e) => setTransactionsDetail(e.target.value)}
            value={transactionsDetail}
          />

          <Button
            size="large"
            mt={4}
            sx={{ width: { sm: 300, xs: 250 }, mb: "20px" }}
            onClick={handlePaymanetUpdate}
            variant="contained"
            color="success"
          >
            Update Payment
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PaymentdetailsForm;

const paymentStatusDD = ["Paid", "Pending", "Hold", "Partially Paid"];
