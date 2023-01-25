import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridEventListener,
  useGridApiEventHandler,
  GridToolbar,
} from "@mui/x-data-grid";
import { useParams } from "react-router";

const columns = [
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    width: 120,
    editable: true,
  },
  {
    field: "itemNameCode",
    headerName: "Item Name",
    width: 100,
    editable: true,
  },
  {
    field: "addNewItem",
    headerName: "Add New Item",
    width: 100,
    editable: true,
  },
  {
    field: "categoryItem",
    headerName: "Item Category",
    width: 100,
    editable: true,
  },
  {
    field: "dateOfInvoice",
    headerName: "Invoice Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 60,
    editable: true,
  },
  
  {
    field: "unit",
    headerName: "Unit",
    width: 80,
    editable: true,
  },

  {
    field: "rate",
    headerName: "Rate",
    width: 90,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 120,
    editable: true,
  },

  {
    field: "redeemed",
    headerName: "Redeemed",
    width: 80,
    editable: true,
  },
  {
    field: "sgst",
    headerName: "SGST",
    width: 80,
    editable: true,
  },
  {
    field: "cgst",
    headerName: "CGST",
    width: 80,
    editable: true,
  },
  {
    field: "igst",
    headerName: "IGST",
    width: 80,
    editable: true,
  },
  {
    field: "tds",
    headerName: "TDS",
    width: 80,
    editable: true,
  },
  {
    field: "tdsAmount",
    headerName: "TDS Amount",
    width: 80,
    editable: true,
  },


  {
    field: "amountPaid",
    headerName: "Total Amount",
    width: 80,
    editable: true,
  },
];

function ItemDataTable() {
  const { id } = useParams();
  const [billtabledata, setBillTabledata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let dataTable = await fetch(
        `http://192.168.1.22:8083/bill/item/get/${id}`
      );
      let table = await dataTable.json();
      let adminTableData = await table.data;
      setBillTabledata(adminTableData ? adminTableData : "");
    };
    fetchData();
  }, []);
  console.log("tabledata", billtabledata);
  console.log("length", billtabledata.length);

  const INVTOTELAMOUNT = billtabledata
    .map((item) => item.amountPaid)
    .reduce((prev, curr) => prev + curr, 0);

   console.log("1234",INVTOTELAMOUNT)


  return (
    <>


<Box  p={2} sx={{ marginLeft: {sm:"85%", xs:"auto"}, color:"green", fontWeight:600, fontSize:"18px"}}>
   Total Amount - {INVTOTELAMOUNT}
          </Box>
      <Box p={0.5} sx={{ height: 636, width: "100%", minHeight: "636px" }}>
        <DataGrid
          rows={billtabledata}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[500]}
          components={{ Toolbar: GridToolbar }}
          rowHeight={32}
        />
      </Box>
    </>
  );
}

export default ItemDataTable;
