
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridEventListener,
  useGridApiEventHandler,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ReimbursementUserTable() {


    const [idMM, setIDMM] = useState("");
    const handleEvent = (
      params, // GridRowParams
      event // MuiEvent<React.MouseEvent<HTMLElement>>
      // GridCallbackDetails
    ) => {
      //  navigate(`admin/${params.row.invoiceId}`)
  
     
      if (params.field === "showBill") {
        setIDMM(params.row.invoiceId);
        // navigate(`${params.row.invoiceId}`)
      }
    };
  
  
      const columns = [
      {
        field: "approvalId",
        headerName: " Approval Id",
       width:100,
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
          field: "paymentMode",
          headerName: "Payment Mode",
          width: 140,
          editable: true,
        },
        {
          field: "paymentMethod",
          headerName: "Payment Method",
          width: 140,
          editable: true,
        },
        {
          field: "paymentTags",
          headerName: "payment Tag",
          width: 140,
          editable: true,
        },
        {
          field: "urgentPaymentRemarks",
          headerName: "Urgent Payment Remarks",
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
        headerName: "HOD Approval Date",
        width: 160,
        editable: true,
      },
      {
        field: "finalApproval",
        headerName: "Final Approval",
        width: 140,
        editable: true,
      },
      {
        field: "finalRemarks",
        headerName: "Final Remarks",
        width: 140,
        editable: true,
      },
      {
        field: "finalApprovalDate",
        headerName: "Final Approval Date",
        width: 160,
        editable: true,
      },
  
      {
          field: "paymentStatus",
          headerName: "Payment Status",
          width: 140,
          editable: true,
        },
      {
          field: "paidAmount",
          headerName: "Paid Amount",
          width: 140,
          editable: true,
        },
        {
          field: "transactionDetails",
          headerName: "Transaction Details",
          width: 140,
          editable: true,
        },
      
        {
          field: "rembursementPaymentDate",
          headerName: "Rembursement Payment Date",
          width: 140,
          editable: true,
        },
  
           {
        field: "showBill",
        headerName: "Show Bill",
        description: "Bill.",
        sortable: false,
        width: 100,
        type: "action",
        renderCell: () => (
          <a
            style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}
            href={`http://13.126.160.155:8088/bill/files/get/file/?invoiceId=${idMM}`}
            target="_blank"
          >
            Show Bill
          </a>
        ),
      },
        
   
  
    ];
  
  
    let navigate = useNavigate();
    const [reimbursementbilltabledata, setReimbursementBillTabledata] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        let dataTable = await fetch(
          "http://13.126.160.155:8088/bill/bill/get/data/all"
        );
        let table = await dataTable.json();
        let adminTableData = await table.data;
        setReimbursementBillTabledata(adminTableData ? adminTableData : "");
      };
      fetchData();
    }, []);
    console.log("tabledata", reimbursementbilltabledata);



  return (

    <>


<Box p={1} sx={{ marginLeft: { sm: "85%", xs: "auto" } }}>
        <Link style={{ fontWeight: "600", color: "white" }} to="/mainform">
          {" "}
          <Button
            color="success"
            variant="contained"
            sx={{ width: "170px" }}
            size="small"
          >
        New Request
          </Button>
        </Link>
      </Box>
      <Box
        p={0.5}
        sx={{
          height: 636,
          width: "100%",
          backgroundColor: "#f2f2f2",
          minHeight: "636px",
          maxHeight: "100%",
        }}
      >
        <DataGrid
          rows={reimbursementbilltabledata}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[500]}
          onCellClick={handleEvent}
          components={{ Toolbar: GridToolbar }}
          rowHeight={26}

        />
      </Box>

    </>
  )
}

export default ReimbursementUserTable