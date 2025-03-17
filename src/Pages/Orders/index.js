import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Typography, Modal, Paper } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";



const rows = [
  { id: 101, customer: "John Doe", product: "Laptop", amount: 1200, status: "Shipped" },
  { id: 102, customer: "Jane Smith", product: "Smartphone", amount: 800, status: "Pending" },
  { id: 103, customer: "David Lee", product: "Shoes", amount: 100, status: "Delivered" },
  { id: 104, customer: "Emily Davis", product: "Watch", amount: 150, status: "Processing" },
  { id: 105, customer: "Michael Brown", product: "Headphones", amount: 200, status: "Cancelled" },
];

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

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "product", headerName: "Product", flex: 1 },
    { field: "amount", headerName: "Amount ($)", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
          <Typography variant="h6">Order Details</Typography>
          {selectedOrder && (
            <Box mt={2}>
              <Typography><strong>Order ID:</strong> {selectedOrder.id}</Typography>
              <Typography><strong>Customer:</strong> {selectedOrder.customer}</Typography>
              <Typography><strong>Product:</strong> {selectedOrder.product}</Typography>
              <Typography><strong>Amount:</strong> ${selectedOrder.amount}</Typography>
              <Typography><strong>Status:</strong> {selectedOrder.status}</Typography>
            </Box>
          )}
        </Paper>
      </Modal>
    </div>
  );
}