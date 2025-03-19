import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Drawer, TextField,  IconButton, Modal, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { addData, deleteData, getData, updateData } from "../../utils/services";
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

  // const [imagePreview, setImagePreview] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState("");

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleEdit = (row) => {
    setDrawerOpen(true);
    setFormData({
      productName: row.name,
      notes: row?.notes,
      description: row?.notes,
      price: row?.price,
      // category: "",
      image: row?.image,
    })
    setEdit(row.id);
    console.log("Edit:", row);
  };

  const handleDelete = (id) => {
    deleteData(collections.PRODUCTS,id).then((res)=>{
      alert("successfully deleted")
      getDatas()
    }).catch((err)=>{
      alert("something went wrong")
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, image: file });
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  const handleSubmit = async (e) => {
    let payload = {
      name: formData.productName,
      notes: formData.notes,
      description: formData.description, // Fixed typo from 'descriptiom' to 'description'
      price: formData.price,
      image: formData.image,
    };
    e.preventDefault(); // Prevent default form submission behavior

    if(edit !== ""){
      updateData(collections.PRODUCTS,payload,edit).then((res)=>{
        alert("successfully updated")
        setEdit("")
        setDrawerOpen(false);
        getDatas()
        
      }).catch((err)=>{
        alert("something went wrong")
        setEdit("")
      })
    } else {

      try {
        const response = await addData(collections.PRODUCTS, payload, ""); // Awaiting the async function
        console.log(response);
        alert("Product added successfully");
        getDatas();
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product to cart.");
      } finally {
        console.log("Form data submitted:", payload);
        setDrawerOpen(false);
      }
    }


  };

  // const rows = [
  //   { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
  //   { id: 2, name: "Smartphone", category: "Electronics", price: 800, stock: 20 },
  //   { id: 3, name: "Shoes", category: "Fashion", price: 100, stock: 50 },
  //   { id: 4, name: "Watch", category: "Accessories", price: 150, stock: 30 },
  //   { id: 5, name: "Headphones", category: "Electronics", price: 200, stock: 15 },
  // ];
  const [originalRows, setOriginalRows] = useState([]);

  const handleSearch = (e) => {
    let searchQuery = e.target.value.trim().toLowerCase();
  
    if (!searchQuery) {
      setRows(originalRows);
      return;
    }
  
    const filtered = originalRows.filter((row) =>
      row.id?.toLowerCase().includes(searchQuery)
    );
  
    setRows(filtered);
  };
  

  const getDatas = () => {
    getData(collections.PRODUCTS, "")
    .then((res) => {
      let response = res;
      const tempArray = response.map((item, index) => {
        return {
          id: item?.info?.id,
          name: item?.name,
          // category: item?.category,
          price: item?.price,
          notes: item?.notes,
          image: item?.image,
        };
      });
      setRows(tempArray);
      setOriginalRows(tempArray); // Store original data for filtering
    })
    .catch((err) => {
      console.log(err, "sfkuh");
    });
  }

  useEffect(() => {
    getDatas();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 1 },
    // { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price ($)", flex: 1 },
    { field: "notes", headerName: "Description", flex: 1, width: "300" },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        console.log(params?.row, "sidjoishnoi");
        return (
          <>
            <img src={params?.row?.image} width={"100px"} height={"100px"} alt="imageX"/>
          </>
        );
      },
    },
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

  // const [filteredData, setFilteredData] = useState(rows);



  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>
        <Button variant="contained" onClick={() => {setDrawerOpen(true); setFormData({})}}>
          Add Product
        </Button>
      </Box>
      <Typography>search</Typography>
      <TextField type="search" onChange={handleSearch} />
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
            <TextField label="Image Url" variant="outlined" fullWidth margin="normal" name="image" value={formData.image} onChange={handleInputChange} type="text" />


            {/* Image Upload Section */}
            {/* <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <input type="file" accept="image/*" id="image-upload" style={{ display: "none" }} onChange={handleImageUpload} />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2} sx={{ width: "100%", textAlign: "center" }}>
                  <img src={formData.image}} alt="Preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }} />
                </Box>
              )}
            </Box> */}
             <Box mt={2} sx={{ width: "100%", textAlign: "center" }}>
                  <img src={formData.image} alt="Preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }} />
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
        <Paper style={{ padding: 20, width: 600, margin: "100px auto" }} className="d-flex justify-content-start ">
          <div>
          <Typography variant="h6">Order Details</Typography>
          {selectedOrder && (
            <Box mt={2}>
              <Typography>
                <strong>Product ID:</strong> {selectedOrder.id}
              </Typography>
              <Typography>
                <strong>Product Name:</strong> {selectedOrder.name}
              </Typography>
              <Typography>
                <strong>description:</strong> {selectedOrder.notes}
              </Typography>
              <Typography>
                <strong>Amount:</strong> ${selectedOrder.price}
              </Typography>
              <Typography>
                <strong>Status:</strong> <img src={selectedOrder.image} alt="image2" width={"100"} height={"100"}/>
              </Typography>
            </Box>
          )}
          </div>
        </Paper>
      </Modal>
    </Box>
  );
};

export default Products;
