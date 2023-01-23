import { Autocomplete, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brand,
  paymentModeRelation,
  Department,
  CategoryRelation,
  SubCategory2Relation,
  subBrand2,
} from "../../AllData";

function Reimbursement() {

  const [reimbursementType, setReimbursementType] = useState("");
  const [brand, setBrand] = React.useState("");
  const [subrand, setSubrand] = useState("");
  const [subBrandCustomerName, setSubBrandCustomerName] = useState("");
  const [subbrandDD, setSubBrandDD] = useState([]);
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("")
  const [convenceAmount, setConvenceAmount] = useState(0)
  const [food, setFood] = useState(0)
  const [accomandation,setAccomandation] = useState(0)
  const [internet, setInternet] = useState(0)
  const [businessExp, setBusinessExp] = useState(0)
  const [petrol, setPetrol] = useState()
  const [driverSal, setDriverSal] = useState("")
  const [grandTotal, setGrandTotal] = useState(null)

  const nevigate = useNavigate()


  const Regulartotal= (+convenceAmount) + (+food) + (+accomandation) + (+internet) + (+businessExp)
  const EmpTotal = (+petrol) + (+driverSal)


  

  useEffect(() => {
    Brand.map((item) => {
      if (item.brand === brand) setSubBrandDD(item.subBrand);
    });

  }, [brand]);

  const EMPCODE = localStorage.getItem("employeeCode");
  const EMPNAME = localStorage.getItem("name");
  const EMPEMAIL = localStorage.getItem("email");
  const EMPSTATUS = localStorage.getItem("status");
  const USERTYPE = localStorage.getItem("User");
  const reportingManager = localStorage.getItem("reportingManager");


  const handleSubmit = async()=>{
    try {
        let response = await axios.post(
          "http://13.126.160.155:8088/bill/reimbursement/save/reimbursement",
          {
            "accommodation": accomandation,
            "brand": brand,
            "convenseAmount": convenceAmount,
            "department": department,
            "driverSalary": driverSal,
            "email": EMPEMAIL,
            "employeeCode": EMPCODE,
            "employeeName": EMPNAME,
            "food": food,
            "highReportingManagerId": "string",
            "internet": internet,
            "location": location,
            "otherBusinessAmount": businessExp,
            "petrolAmount": petrol,
            "reimbursementType": reimbursementType,
            "reportingManager": reportingManager,
            "reportingManagerId": "string",
            "subBrand": subrand,
            "totalAmount": reimbursementType === "Regular Reimbursement"?Regulartotal:"",
            "userType": "USER"
          }
        );

        alert("Bill Invoice save successfully");
        nevigate("/reimbursementform/fileupload")
        console.log(response);
        } catch (error) {
            alert(error);
        }
    };

    
  
  return (
    <div>
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
        <Autocomplete
          disablePortal
          options={reimbursementTypeDD}
          sx={{ width: 300, backgroundColor: "white" }}
          onChange={(event, newValue) => {
            setReimbursementType(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Reimbursement Type" />
          )}
        />
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
              setDepartment(newValue.label);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Department" />
            )}
          />

        {reimbursementType === "Regular Reimbursement" && (
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
            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Convence Amount"
              variant="outlined"
              onChange={(e) => setConvenceAmount(e.target.value)}
              //value={paymentStatus}
            />

            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Food"
              variant="outlined"
              onChange={(e) => setFood(e.target.value)}
              //value={paymentStatus}
            />

            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Accomandation Amount"
              variant="outlined"
              onChange={(e) => setAccomandation(e.target.value)}
              //value={paymentStatus}
            />

            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Phone/Internet"
              variant="outlined"
              onChange={(e) => setInternet(e.target.value)}
              //value={paymentStatus}
            />

           <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Any other business expense amount"
              variant="outlined"
              onChange={(e) => setBusinessExp(e.target.value)}
              //value={paymentStatus}
            />
          </Box>
        )}

        {reimbursementType === "Part of salary" && (
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexWrap: "wrap",
              justifyContent: { sm: "flex-start", xs: "center" },
            }}
          >
            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Petrol bill amount"
              variant="outlined"
              onChange={(e) => setPetrol(e.target.value)}
              //value={paymentStatus}
            />

            <TextField
              sx={{ width: 300, backgroundColor: "white" }}
              id="outlined-basic"
              label="Driver Salary"
              variant="outlined"
              onChange={(e) => setDriverSal(e.target.value)}
              //value={paymentStatus}
            />
          </Box>
        )}

        <TextField
          sx={{ width: 300, backgroundColor: "white" }}
          id="outlined-basic"
          label="Grand total"
          variant="outlined"
          onChange={(e) => setGrandTotal(e.target.value)}
          value={Regulartotal || EmpTotal}
          disabled
        />
      </Box>

      <Box textAlign={"center"} mt={2}>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}

export default Reimbursement;

const reimbursementTypeDD = ["Regular Reimbursement", "Part of salary"];
const brand1 = ["Pinch", "Well Served", "1 To Zee", "CARE CREW"];
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

const departmentData = [
    { label: "Admin" },
    { label: "Finance" },
    { label: "HR" },
    { label: "Marketing" },
    { label: "Operations" },
    { label: "Procurement" },
    { label: "Technology" },
    { label: "Training & Audit" },
  ];
