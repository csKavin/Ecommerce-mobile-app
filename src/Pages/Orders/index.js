import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Typography, Modal, Paper } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getData } from "../../utils/services";
import { collections } from "../../firebase-config";

// const rows = [
//   { id: 101, customer: "John Doe", product: "Laptop", amount: 1200, status: "Shipped" },
//   { id: 102, customer: "Jane Smith", product: "Smartphone", amount: 800, status: "Pending" },
//   { id: 103, customer: "David Lee", product: "Shoes", amount: 100, status: "Delivered" },
//   { id: 104, customer: "Emily Davis", product: "Watch", amount: 150, status: "Processing" },
//   { id: 105, customer: "Michael Brown", product: "Headphones", amount: 200, status: "Cancelled" },
// ];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };


  const [rows, setRows] = useState([]);

  const getDatas = () => {
    getData(collections.ORDERS, "").then((res) => {
      let response = res;
      console.log(response,"skjbsb");
      
      const tempArray = response.map((item, index) => {
        return {
          id: item?.info?.id,
          productName: item?.name,
          phone: item?.phone,
          price : item?.price,
          paymentId : item?.paymentId,
          address : item?.address,
          city : item?.city,
          createdAt : item?.createdAt,
          state : item?.state,
          productId : item?.id
        }
      });
      console.log(tempArray,"skfjbsdiybsifyb");
      

      setRows(tempArray);
    });
  };

  useEffect(() => {
    getDatas();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "phone", headerName: "phone", flex: 1 },
    { field: "price", headerName: "Amount ($)", flex: 1 },
    { field: "paymentId", headerName: "payment Id", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleViewDetails(params.row)} color="primary" size="small">
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Order List
        </Typography>
      </Box>
      <DataGrid rows={rows} columns={columns} pageSize={5} />

      {/* Order Details Modal */}
      <Modal open={open} onClose={handleClose}>
        <Paper style={{ padding: 20, width: 400, margin: "100px auto" }}>
          <Typography variant="h6" className="fw-bold" color="primary">Order Details</Typography>
          {selectedOrder && (
            <Box mt={2}>
              <Typography>
                <strong>Order ID:</strong> {selectedOrder.id}
              </Typography>
              <Typography>
                <strong>Product ID:</strong> {selectedOrder.productId}
              </Typography>
              <Typography>
                <strong>product Name:</strong> {selectedOrder.productName}
              </Typography>
              <Typography>
                <strong>phone:</strong> {selectedOrder.phone}
              </Typography>
              <Typography>
                <strong>Amount:</strong> ${selectedOrder.price}
              </Typography>
              <Typography>
                <strong>paymentId:</strong> {selectedOrder.paymentId}
              </Typography>
              <Typography>
                <strong>address:</strong> {selectedOrder.address}
              </Typography>
              <Typography>
                <strong>city:</strong> {selectedOrder.city}
              </Typography>
              <Typography>
                <strong>state:</strong> {selectedOrder.state}
              </Typography>
              <Typography>
                <strong>createdAt:</strong> {selectedOrder.createdAt}
              </Typography>
            </Box>
          )}
        </Paper>
      </Modal>
    </div>
  );
}
