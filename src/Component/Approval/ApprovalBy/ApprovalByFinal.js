import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Autocomplete,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import moment from "moment";
import axios from "axios";


function ApprovalByFinal() {
    let navigate = useNavigate();
    const { id } = useParams();


    const [updatefinalStatus, setUpdatefinalStatus] = useState("");
    const [updatefinalStatusDate, setUpdatefinalStatusDate] = useState("");
    const [updatefinalStatusRemark, setUpdatefinalStatusRemark] = useState("");
    const DATEOFChangesFinalUpdate = moment(new Date()).format("DD/MM/YYYY, h:mm a");

    const handleFinalStatusUpdate = async () => {
        try {
          let response = await axios.put(
            `http://13.126.160.155:8083/bill/purchaseApproval/update/cos?approvalId=${id}`,
            {
                finalApprovalDate:DATEOFChangesFinalUpdate ,
                finalApproval: updatefinalStatus,
                finalRemarks: updatefinalStatusRemark
            }
          );
          alert("Final Status Update successfully");
          console.log(response);
          navigate("/approvaladmindatatable");
        } catch (error) {
          alert(error);
        }
      };


  return (
    <>
 
     <Box p={2} mt={2} sx={{display:"flex", flexDirection:"column", gap:"30px", alignItems:"center"}}>
    
    <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={updatefinalStatusDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
                setUpdatefinalStatus(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Approve Status" />
            )}
          />

          <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            onChange={(e) => setUpdatefinalStatusRemark(e.target.value)}
            value={updatefinalStatusRemark}
          />

          <Button
            size="large"
            mt={4}
            sx={{ width: { sm: 300, xs: 250 }, mb: "20px" }}
            onClick={handleFinalStatusUpdate}
            variant="contained"
            color="success"
          >
            Update the Approval Status 
          </Button>


    </Box>

    
    
    
    </>
  )
}

export default ApprovalByFinal



const updatefinalStatusDD =[

    "Accept",
    "Reject",
    "Discuss"

]