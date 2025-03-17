import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Phone Number", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
];

const rows = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 123 456 7890", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 8901", role: "User" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 345 678 9012", role: "User" },
  { id: 4, name: "Sara Wilson", email: "sara@example.com", phone: "+1 456 789 0123", role: "Moderator" },
];

const Users = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Users List
        </Typography>
      </Box>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Box>
  );
};

export default Users;
