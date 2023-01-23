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
function ApprovalByHOD() {

    let navigate = useNavigate();
    const { id } = useParams();


    const [updatehodStatus, setUpdatehodStatus] = useState("");
    const [updatehodStatusDate, setUpdatehodStatusDate] = useState("");
    const [updatehodStatusRemark, setUpdatehodStatusRemark] = useState("");


    const DATEOFChangesHODUpdate = moment(new Date()).format("DD/MM/YYYY, h:mm a");
    const handleHODStatusUpdate = async () => {
        try {
          let response = await axios.put(
            `http://13.126.160.155:8088/bill/purchaseApproval/update/hod?approvalId=${id}`,
            {
                hodAapprovalDate:DATEOFChangesHODUpdate ,
                hodApproval: updatehodStatus,
                hodRemarks: updatehodStatusRemark
            }
          );
          alert("HOD Status Update successfully");
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
            options={updatehodStatusDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
                setUpdatehodStatus(newValue);
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
            onChange={(e) => setUpdatehodStatusRemark(e.target.value)}
            value={updatehodStatusRemark}
          />

          <Button
            size="large"
            mt={4}
            sx={{ width: { sm: 300, xs: 250 }, mb: "20px" }}
            onClick={handleHODStatusUpdate}
            variant="contained"
            color="success"
          >
            Update the Approval Status 
          </Button>


    </Box>


    
    </>
  )
}

export default ApprovalByHOD



const updatehodStatusDD =[

    "Accept",
    "Reject",
    "Discuss"

]