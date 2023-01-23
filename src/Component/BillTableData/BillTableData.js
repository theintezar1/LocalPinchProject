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

function BillTableData() {
  const [idMM, setIDMM] = useState("");
  const handleEvent = (
    params, // GridRowParams
    event // MuiEvent<React.MouseEvent<HTMLElement>>
    // GridCallbackDetails
  ) => {
    //  navigate(`admin/${params.row.invoiceId}`)

    if (params.field === "showItem") {
      navigate(`/billtable/admin/${params.row.invoiceId}`);
    }
    if (params.field === "updatePayment") {
      navigate(`/billtable/updatepagment/${params.row.invoiceId}`);
    }
    if (params.field === "showBill") {
      setIDMM(params.row.invoiceId);
      // navigate(`${params.row.invoiceId}`)
    }

    if (params.field === "invoiceStatusupdate") {
      navigate(`/billtable/updatestatusremark/${params.row.invoiceId}`);
    }
  };


  const columns = [
    {
      field: "isReimbursement",
      headerName: "Is Reimbursement?",
      width: 100,
      editable: true,
      description:"Reimbursement",
    },
    {
      field: "invoiceId",
      headerName: "Invoice Id",
      width: 100,
      editable: true,
      description:"Invoice Id",
    },
    {
      field: "invoiceType",
      headerName: "Invoice Type",
      width: 100,
      editable: true,
      description:"Invoice Type",
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 110,
      editable: true,
      description:"Employee Name",
    },
    {
      field: "employeeCode",
      headerName: "Employee Code",
      width: 100,
      editable: true,
      description:"Employee Code",
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
      description:"Email",
    },

    {
      field: "reportingManager",
      headerName: "Reporting Manager",
      description: "Reporting Manager",
      sortable: false,
      width: 110,
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      width: 130,
      editable: true,
      description:"Invoice Number",
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 130,
      editable: true,
      description:"Invoice Date",
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 120,
      editable: true,
      description:"Payment Status",
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 120,
      editable: true,
      description:"Payment Date",
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      editable: true,
      description:"Brand",
    },
    {
      field: "subBrand",
      headerName: "Sub Brand",
      width: 110,
      editable: true,
      description:"Sub Brand",
    },

    {
      field: "subCatagory1",
      headerName: "Sub Catagory 1",
      width: 140,
      editable: true,
      description:"Sub Catagory 1",
    },
    {
      field: "subCatagory2",
      headerName: "Sub Catagory 2",
      width: 80,
      editable: true,
      description:"Sub Catagory 2",
    },

    {
      field: "utrMendatory",
      headerName: "UTR Mendatory",
      width: 120,
      editable: true,
      description:"UTR Mendatory",
    },

    {
      field: "tdsPercentage",
      headerName: "TDS Percentage",
      width: 120,
      editable: true,
      description:"TDS Percentage",
    },

    {
      field: "tdsAmount",
      headerName: "TDS Amount",
      width: 120,
      editable: true,
      description:"TDS Amount",
    },
    {
      field: "location",
      headerName: "Location",
      width: 140,
      editable: true,
      description:"Location",
    },
    {
      field: "expensesType",
      headerName: "Expense Type",
      width: 140,
      editable: true,
      description:"Expense Type",
    },
    {
      field: "preTaxAmount",
      headerName: "Pre Tax Amount",
      width: 100,
      editable: true,
      description:"Pre Tax Amount",
    },
    {
      field: "gstAmount",
      headerName: "GST Amount",
      width: 100,
      editable: true,
      description:"GST Amount",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 100,
      editable: true,
      description:"Total Amount",
    },

    {
      field: "netAmount",
      headerName: "Net Amount",
      width: 100,
      editable: true,
      description:"Net Amount",
    },
    {
      field: "paymentMode",
      headerName: "Payment Mode",
      width: 120,
      editable: true,
      description:"Payment Mode",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 120,
      editable: true,
      description:"Payment Method",
    }, 
    {
      field: "payDirectCard",
      headerName: "Pay Direct Card Details",
      width: 150,
      editable: true,
      description:"Pay Direct Card Details",
    },
    // {
    //   field: "utr",
    //   headerName: "UTR",
    //   width: 120,
    //   editable: true,
    // },
      {
      field: "tdsApplicable",
      headerName: "TDS Applicable",
      width: 120,
      editable: true,
      description:"TDS Applicable",
    },
      {
      field: "gstApplicable",
      headerName: "GST Applicable",
      width: 120,
      editable: true,
      description:"GST Applicable",
    },
    {
      field: "partnerNameCode",
      headerName: "Partner/Vendor Name",
      width: 120,
      editable: true,
      description:"Partner/Vendor Name",
    },
    {
      field: "otherPartner",
      headerName: "New Partner/Vendor",
      width: 110,
      editable: true,
      description:"New Partner/Vendor",
    },

    {
      field: "invoiceDescription",
      headerName: "Invoice Description",
      width: 130,
      editable: true,
      description:"Invoice Description",
    },
    {
      field: "approvalId",
      headerName: "ApprovalId ID",
      width: 80,
      editable: true,
      description:"ApprovalId ID",
    },
    {
      field: "taskId",
      headerName: "Task ID",
      width: 80,
      editable: true,
      description:"Task ID",
    },
    {
      field: "serviceCategory",
      headerName: "Service Category",
      width: 80,
      editable: true,
      description:"Service Category",
    },
    {
      field: "invoiceStatus",
      headerName: "Invoice Status",
      width: 180,
      editable: true,
      description:"Invoice Status",
    },
    {
      field: "transactionDetail",
      headerName: "Transaction Detail",
      width: 120,
      editable: true,
      description:"Transaction Detail",
    },
    {
      field: "paidAmount",
      headerName: "Update Paid Amount",
      width: 80,
      editable: true,
      description:"Update Paid Amount",
    },
    {
      field: " updatePaymentStatus",
      headerName: "Update Payment Status",
      width: 100,
      editable: true,
      description:"Update Payment Status",
    },
   
    {
      field: "reimbursementDate",
      headerName: "Reimbursement Date",
      width: 100,
      editable: true,
      description:"Reimbursement Date",
    },

 
    {
      field: "showBill",
      headerName: "Show Bill",
      description: "This column has a value getter and is not sortable.",
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

    {
      field: "showItem",
      headerName: "Items Details",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      type: "action",
      renderCell: () => (
        <p style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}>
          Item Details
        </p>
      ),
    },
    {
      field: "updatePayment",
      headerName: "Update Payment",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      type: "action",
      renderCell: () => (
        <p style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}>
          Update Payment
        </p>
      ),
    },
    {
      field: "invoiceStatusupdate",
      headerName: "Invoice Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      type: "action",
      renderCell: () => (
        <p style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}>
          Invoice Status
        </p>
      ),
    },
  ];

  let navigate = useNavigate();
  const [billtabledata, setBillTabledata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let dataTable = await fetch(
        "http://13.126.160.155:8088/bill/bill/get/data/all"
      );
      let table = await dataTable.json();
      let adminTableData = await table.data;
      setBillTabledata(adminTableData ? adminTableData : "");
    };
    fetchData();
  }, []);
  console.log("tabledata", billtabledata);

  // const [pinnedColumns, setPinnedColumns] = React.useState({
  //   left: ['invoiceId'],
  // });

  // const handlePinnedColumnsChange = React.useCallback((updatedPinnedColumns) => {
  //   setPinnedColumns(updatedPinnedColumns);
  // }, []);



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
            Add Bill
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
          rows={billtabledata}
          columns={columns}
          //====================Old Pagination code==========
          pageSize={100}
          rowsPerPageOptions={[500]}
          //====================New Pagination code============
          //     rowsPerPageOptions={[5, 10, 20]}
          //     pageSize={pageSize}
          //    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          //====================New Pagination Code End========
          // checkboxSelection
          // disableSelectionOnClick
          // experimentalFeatures={{ newEditingApi: true }}    (rows)=>{setid(rows.email}
          //==============On Row Click event ===================
          //  onRowClick={handleEvent}
          //==============On Row Click event ===================
          //==============On Cell Click event ==================
          onCellClick={handleEvent}
          //============== On cell Click event =================
          //============== On Export Csv Click event ===========
          components={{ Toolbar: GridToolbar }}
          //==============On Export Csv Click event ============
          rowHeight={26}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'submissionDate',
                  sort: 'desc',
                },
              ],
            },
          }}
        />
      </Box>
    </>
  );
}

export default BillTableData;
