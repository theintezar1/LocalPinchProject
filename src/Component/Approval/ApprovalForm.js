import React, { useState, useEffect } from "react";
import { Button, Autocomplete, TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";
import { Brand, paymentModeRelation } from "../../AllData";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
});
function ApprovalForm() {
  const [brand, setBrand] = React.useState("");
  const [subbrandDD, setSubBrandDD] = useState([]);
  const [subrand, setSubrand] = useState("");
  const [department, setDepartment] = useState("");
  const [approvalTypeofPurchase, setApprovalTypeofPurchase] = useState("");
  const [aproximatePurchaseDate, setAproximatePurchaseDate] = useState(null);
  const [location, setLocation] = useState("");
  const [reasonofPurchase, setReasonofPurchase] = useState("");
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [provisionAmount, setProvisionAmount] = useState("");
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const [approvalHOD, setApprovalHOD] = useState("Pending");
  const [approvalFinal, setApprovalFinal] = useState("Pending");
  const [approvalHODDate, setApprovalHODDate] = useState("Pending");
  const [approvalFinalDate, setApprovalFinalDate] = useState("Pending");
  const [approvalHODRemark, setApprovalHODRemark] = useState("Pending");
  const [approvalFinalRemark, setApprovalFinalRemark] = useState("Pending");
  const[paymentTag,setPaymentTag]=useState("");
  const [paymentMethodDD,setPaymentMethodDD]=useState([]);
  const [paymentMode,setPaymentMode]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("");
  const [urgentPaymentRemarks,setUrgentPaymentRemarks]=useState("")

  let paymentModeArray = [];
  useEffect(() => {
    Brand.map((item) => {
      if (item.brand === brand) setSubBrandDD(item.subBrand);
    });


    paymentModeRelation.map((item) => {
      paymentModeArray.push(item.paymentMode)
      if (item.paymentMode === paymentMode)
        setPaymentMethodDD(item.paymentMethod);
    });

  }, [brand, paymentMode]);

  const EMPCODE = localStorage.getItem("employeeCode");
  const EMPNAME = localStorage.getItem("name");
  const EMPEMAIL = localStorage.getItem("email");
  const EMPSTATUS = localStorage.getItem("status");
  const USERTYPE = localStorage.getItem("User");
  const reportingManager = localStorage.getItem("reportingManager");
  const ReportingManagerID = localStorage.getItem("reportingManagerID");

  let currentDate = new Date();
  const newAproximatePurchaseDate = moment(aproximatePurchaseDate).format(
    "DD/MM/YYYY"
  );
  const newApprovalFormSubmitDate = moment(currentDate).format("DD/MM/YYYY");

  let navigate = useNavigate();
  const handleSubmit = async () => {
    console.log("data ", {
      EMPCODE,
      EMPNAME,
      EMPEMAIL,
      reportingManager,
      USERTYPE,
      brand,
      subrand,
      department,
      approvalTypeofPurchase,
      location,
      reasonofPurchase,
      purchaseDescription,
      provisionAmount,
      approvalRemarks,
      newAproximatePurchaseDate,
      newApprovalFormSubmitDate,
    });
    try {
      let response = await axios.post(
        "http://13.126.160.155:8088/bill/purchaseApproval/save/purchase",
        {
          brand: brand,
          department: department,
          email: EMPEMAIL,
          employeeCode: EMPCODE,
          employeeName: EMPNAME,
          finalApprovalDate: approvalFinalDate,
          finalRemarks: approvalFinalRemark,
          hodAapprovalDate: approvalHODDate,
          hodRemarks: approvalHODRemark,
          location: location,
          provisionAmount: provisionAmount,
          purchaseDate: newAproximatePurchaseDate,
          purchaseDescription: purchaseDescription,
          reportingManager: reportingManager,
          reportingManagerId: ReportingManagerID,
          subBrand: subrand,
          submissionDate: newApprovalFormSubmitDate,
          typeOfPurchase: approvalTypeofPurchase,
          userType: USERTYPE,
          reasonOfPurchase: reasonofPurchase,
          approvalRemarks: approvalRemarks,
          finalApproval: approvalFinal,
          hodApproval: approvalHOD,
  paidAmount:"" ,
  paymentMethod:paymentMethod ,
  paymentMode:paymentMode ,
  paymentStatus:"" ,
  paymentTags:paymentTag ,
  rembursementPaymentDate: "",
  transactionDetails:"" ,
  urgentPaymentRemarks: urgentPaymentRemarks,
        }
      );
      alert("Approve Request Send Successfully");
      console.log(response);
      if(USERTYPE==="ADMIN"){
        navigate("/approvaladmindatatable")
      }
      if(USERTYPE==="USER"){
        navigate("/approvaluserdatatable")
      }
    
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>

    <Box sx={{fontSize:"20px", fontWeight:600 , color:"green"}} ml={11} mt={3}>

    Approval Management
    </Box>
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          padding: { sm: "3%", xs: "2%" },
          marginLeft: { sm: "3%", xs: "0%" },
          justifyContent: { sm: "flex-start", xs: "center" },
        }}
      >
       
        <ThemeProvider theme={theme}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={brand1}
            onChange={(event, newValue) => {
              setBrand(newValue);
            }}
            sx={{ width: 300, backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField {...params} required label="Brand" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subbrandDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setSubrand(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Sub Brand" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locationData}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setLocation(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Location" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={departmentData}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setDepartment(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Department" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={TypeofPurchase}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setApprovalTypeofPurchase(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Type of Purchase" />
            )}
          />

          <TextField
            sx={{ width: 300, backgroundColor: "white" }}
            id="outlined-basic"
            required
            label="Reason of Purchase"
            variant="outlined"
            onChange={(e) => setReasonofPurchase(e.target.value)}
            value={reasonofPurchase}
          />

          <TextField
            sx={{ width: 300, backgroundColor: "white" }}
            id="outlined-basic"
            required
            label="Purchase Description"
            variant="outlined"
            onChange={(e) => setPurchaseDescription(e.target.value)}
            value={purchaseDescription}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Aproximate Purchase Date"
              value={aproximatePurchaseDate}
              onChange={(newValue) => {
                setAproximatePurchaseDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  size="medium"
                  sx={{
                    width: 300,
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            sx={{ width: 300, backgroundColor: "white" }}
            id="outlined-basic"
            required
            label="Provision Amount"
            variant="outlined"
            onChange={(e) => setProvisionAmount(e.target.value)}
            value={provisionAmount}
          />

          {/* <TextField
            sx={{ width: 300, backgroundColor: "white" }}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            onChange={(e) => setApprovalRemarks(e.target.value)}
            value={approvalRemarks}
          /> */}


<Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentMode1Data}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setPaymentMode(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Payment Mode" />
            )}
          />


<Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentMethodDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setPaymentMethod(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Payment Method" />
            )}
          />


<Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentTagDD}
            sx={{ width: 300, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setPaymentTag(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Payment Tag" />
            )}
          />

            <TextField
            sx={{ width: 300, backgroundColor: "white" }}
            id="outlined-basic"
            disabled={paymentTag==="Urgent Payment"?false:true}
            label="Urgent Payment Remarks"
            variant="outlined"
            onChange={(e) => setUrgentPaymentRemarks(e.target.value)}
            value={urgentPaymentRemarks}
          />



        </ThemeProvider>
      </Box>

      <Box textAlign={"center"} mt={2}>
        <Button
          size="large"
          variant="contained"
          color="success"
          sx={{ width: { sm: 300, xs: 250 }, mb: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default ApprovalForm;

const locationData = [
  "Office - Gurgaon",
  "Office - Mumbai",
  "Office - Bangalore",
  "Office - Lucknow",
  "1 To Zee - DLF Phase 1",
  "Gullak Daycare - Chakkarpur",
  "Well Served - DLF Phase 3",
  "Well Served - Rodeo Drive",
  "Well Served - Powai",
  "CC Office - Manesar",
  "RCC - Delhi",
  "HQ",
];

const brand1 = ["Pinch", "Well Served", "1 To Zee", "CARE CREW"];

const departmentData = [
  "Admin",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
  "Procurement",
  "Technology",
  "Training & Audit",
];

const TypeofPurchase = ["Product", "Services"];


const paymentMode1Data = [
   "Cash" ,
   "Bank Transfer" ,
   "Debit Card" ,
   "Credit Card" ,
   "Mobile Payment" ,
   "Cheque" ,
];


const paymentTagDD=[

  "Urgent Payment",
  "Regular Payment",
  "Advance Payment",
]