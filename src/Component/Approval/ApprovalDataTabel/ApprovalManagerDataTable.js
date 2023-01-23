import React, { useState, useEffect } from "react";
import {Box, Button} from "@mui/material";
import {
  DataGrid,
  GridEventListener,
  useGridApiEventHandler,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";


function ApprovalManagerDataTable() {


         const handleEvent = (
    params, // GridRowParams
    event // MuiEvent<React.MouseEvent<HTMLElement>>
    // GridCallbackDetails
  ) => {
    //  navigate(`admin/${params.row.invoiceId}`)

    // if (params.field === "finalapproveStatus") {
    //   navigate(`/approvaladmindatatable/statusbyadmin/${params.row.approvalId}`);
    // }

    if (params.field === "hodapproveStatus") {
        navigate(`/approvaladmindatatable/statusbyhod/${params.row.approvalId}`);
      }
   
  };

  const columns = [
    {
      field: "approvalId",
      headerName: " Approval Id",
      width: 70,
      editable: true,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 110,
      editable: true,
    },
    {
      field: "employeeCode",
      headerName: "Employee Code",
      width: 80,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
    },
    {
      field: "reportingManager",
      headerName: "Reporting Manager",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 110,
    },

    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      editable: true,
    },
    {
      field: "subBrand",
      headerName: "Sub Brand",
      width: 110,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 140,
      editable: true,
    },
    {
      field: "provisionAmount",
      headerName: "Provision Amount",
      width: 130,
      editable: true,
    },
    {
      field: "typeOfPurchase",
      headerName: "Type Of Purchase",
      width: 140,
      editable: true,
    },

    {
      field: "reasonOfPurchase",
      headerName: "Reason Of Purchase",
      width: 140,
      editable: true,
    },
    {
      field: "purchaseDescription",
      headerName: "Purchase Description",
      width: 140,
      editable: true,
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      width: 140,
      editable: true,
    },
    {
      field: "submissionDate",
      headerName: "Submission Date",
      width: 140,
      editable: true,
    },
    {
      field: "approvalRemarks",
      headerName: "Approval Remarks",
      width: 140,
      editable: true,
    },
    {
      field: "hodApproval",
      headerName: "HOD Approval",
      width: 140,
      editable: true,
    },
    {
      field: "hodRemarks",
      headerName: "HOD Remarks",
      width: 140,
      editable: true,
    },
    {
      field: "hodAapprovalDate",
      headerName: "HOD Aapproval Date",
      width: 160,
      editable: true,
    },
    // {
    //   field: "finalApproval",
    //   headerName: "Final Approval",
    //   width: 140,
    //   editable: true,
    // },
    // {
    //   field: "finalRemarks",
    //   headerName: "Final Remarks",
    //   width: 140,
    //   editable: true,
    // },
    // {
    //   field: "finalApprovalDate",
    //   headerName: "Final Approval Date",
    //   width: 160,
    //   editable: true,
    // },
  {
      field: "hodapproveStatus",
      headerName: "Approval",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 162,
      type: "action",
      renderCell: () => (
        <p style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}>
        Approval
        </p>
      ),
    },

    //   {
    //   field: "finalapproveStatus",
    //   headerName: "Final Approve Status",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 162,
    //   type: "action",
    //   renderCell: () => (
    //     <p style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}>
    //       Final Approve Status
    //     </p>
    //   ),
    // },
  ];


  const ReportingManagerID = localStorage.getItem("reportingManagerID");
  let navigate = useNavigate();
  const [approvalManagerDatatabledata, setApprovalManagerDatatabledata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let dataTable = await fetch(
        `http://13.126.160.155:8088/bill/purchaseApproval/get/purchase/reportingManager/${ReportingManagerID}`
      );
      let table = await dataTable.json();
      let adminTableData = await table.data;
      setApprovalManagerDatatabledata(adminTableData ? adminTableData : "");
    };
    fetchData();
  }, []);

  const handleapprovalfrom =()=>{
    navigate("/approvalform")
  }

  console.log("tabledataManager", approvalManagerDatatabledata);

  return (
    <>
    
    
         <Box  p={2} sx={{ marginLeft: {sm:"85%", xs:"auto"}}}>
    <Button  variant="contained" 
    size="small"
          color="success"   onClick={handleapprovalfrom}>Add Aproval item</Button>
          </Box>
      <Box
        p={0.5}
        sx={{
          height: 620,
          width: "100%",
          backgroundColor: "#f2f2f2",
          minHeight: "620px",
          maxHeight: "100%",
        }}
      >
        <DataGrid
          rows={approvalManagerDatatabledata}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[500]}
          components={{ Toolbar: GridToolbar }}
          rowHeight={28}
          onCellClick={handleEvent}
        />
      </Box>
    
    </>
  )
}

export default ApprovalManagerDataTable