import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { getData } from "../../utils/services";
import { collections } from "../../firebase-config";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  { field: "createdAt", headerName: "CreatedAt", flex: 1 },
];

// const rows = [
//   { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 123 456 7890", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 8901", role: "User" },
//   { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 345 678 9012", role: "User" },
//   { id: 4, name: "Sara Wilson", email: "sara@example.com", phone: "+1 456 789 0123", role: "Moderator" },
// ];

const Users = () => {

  const [rows, setRows] = useState([]);
  useEffect(()=>{
    getData(collections.USERS).then((res)=>{
      let response = res;
      console.log(response,"sdljfnsfdj");
      
      let tempArray = response.map((item,index)=>{


        return {
          email : item.email,
          id : item.uid,
          createdAt : item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleString() : "NA",
          role: item.role
          
        }
      })
      setRows(tempArray);
    })
  },[])

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
