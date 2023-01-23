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

function ApprovalPaymentPage() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [approvepaidAmount, setApprovePaidAmount] = useState("");
    const [approvepaymentStatus, setApprovePaymentStatus] = useState("");
    const [approvetransactionsDetail, setApproveTransactionsDetail] = useState("");
    const [approvepaymentDate, setApprovePaymentDate] = useState(null);
    const newUpdatePaymentDate = moment(approvepaymentDate).format("DD/MM/YYYY");
    console.log({ newUpdatePaymentDate });
    const EMPNAME = localStorage.getItem("name");
    const DATEOFChanges = moment(new Date()).format("DD/MM/YYYY, h:mm a");
    const handlePaymanetUpdate = async () => {
      try {
        let response = await axios.put(
          `http://13.126.160.155:8088/bill/purchaseApproval/update/paymentStatus/${id}`,
          {
            paidAmount: approvepaidAmount,
            paymentStatus: approvepaymentStatus,
            reimbursementPaymentDate: newUpdatePaymentDate,
            transactionDetail: approvetransactionsDetail
          }
        );
        alert("Your Payment Details Update successfully");
        console.log(response);
        navigate("/approvaladmindatatable");
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
            Approval ID -
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
            onChange={(e) => setApprovePaidAmount(e.target.value)}
            value={approvepaidAmount}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Reimbursement Payment Date"
              value={approvepaymentDate}
              onChange={(newValue) => {
                setApprovePaymentDate(newValue);
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
                setApprovePaymentStatus(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Payment Status" />
            )}
          />

          <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            required
            label="Transactions/UTR Detail"
            variant="outlined"
            onChange={(e) => setApproveTransactionsDetail(e.target.value)}
            value={approvetransactionsDetail}
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
  )
}

export default ApprovalPaymentPage

const paymentStatusDD = ["Paid", "Pending", "Hold", "Partially Paid"];