import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Drawer, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Modal, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { addData } from "../../utils/services";
import { collections } from "../../firebase-config";

const Products = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    notes: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
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

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (id) => {
    console.log("Delete ID:", id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    let payload = {
        name : formData.productName,
        notes : formData.notes,
        descriptiom :  formData.description,
        price : formData.price,
        image : formData.image
    }
    // addData(collections.PRODUCTS,payload).then((res)=>{
    //     console.log(res,"sd;fgjndsfiu;h");

    // })
    e.preventDefault();
    console.log("Form data submitted:", payload);
    setDrawerOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price ($)", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewDetails(params.row)} color="primary" size="small">
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleEdit(params.row);
              setDrawerOpen(true);
            }}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
    { id: 2, name: "Smartphone", category: "Electronics", price: 800, stock: 20 },
    { id: 3, name: "Shoes", category: "Fashion", price: 100, stock: 50 },
    { id: 4, name: "Watch", category: "Accessories", price: 150, stock: 30 },
    { id: 5, name: "Headphones", category: "Electronics", price: 200, stock: 15 },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>
        <Button variant="contained" onClick={() => setDrawerOpen(true)}>
          Add Product
        </Button>
      </Box>
      <Box mt={4}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 15, 20]} autoHeight />
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Product Name" variant="outlined" fullWidth margin="normal" name="productName" value={formData.productName} onChange={handleInputChange} />
            <TextField label="Notes" variant="outlined" fullWidth margin="normal" name="notes" value={formData.notes} onChange={handleInputChange} />
            <TextField label="Description" variant="outlined" fullWidth margin="normal" name="description" value={formData.description} onChange={handleInputChange} multiline rows={3} />
            <TextField label="Price" variant="outlined" fullWidth margin="normal" name="price" value={formData.price} onChange={handleInputChange} type="number" />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="category-label">Type/Categories</InputLabel>
              <Select labelId="category-label" label="Type/Categories" name="category" value={formData.category} onChange={handleInputChange}>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
              </Select>
            </FormControl>

            {/* Image Upload Section */}
            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <input type="file" accept="image/*" id="image-upload" style={{ display: "none" }} onChange={handleImageUpload} />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2} sx={{ width: "100%", textAlign: "center" }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }} />
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" type="submit" fullWidth>
                Save Product
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
      <Modal open={open} onClose={handleClose}>
        <Paper style={{ padding: 20, width: 400, margin: "100px auto" }}>
          <Typography variant="h6">Order Details</Typography>
          {selectedOrder && (
            <Box mt={2}>
              <Typography>
                <strong>Order ID:</strong> {selectedOrder.id}
              </Typography>
              <Typography>
                <strong>Customer:</strong> {selectedOrder.name}
              </Typography>
              <Typography>
                <strong>Product:</strong> {selectedOrder.category}
              </Typography>
              <Typography>
                <strong>Amount:</strong> ${selectedOrder.price}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedOrder.stock}
              </Typography>
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default Products;
