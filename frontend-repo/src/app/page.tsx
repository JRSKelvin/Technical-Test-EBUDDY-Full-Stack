"use client";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/store";
import { signOut } from "@/store/slices/authSlice";

interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector((state: RootState) => state.auth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [data, setData] = React.useState<User[]>([]);
  if (!auth?.data?.token) {
    router.push("/sign-in");
  }
  React.useEffect(() => {
    setData([
      { id: "1", email: "email1@gmail.com", password: "email1", fullName: "Email1", phoneNumber: "123456789" },
      { id: "2", email: "email2@gmail.com", password: "email2", fullName: "Email2", phoneNumber: "234567891" },
      { id: "3", email: "email3@gmail.com", password: "email3", fullName: "Email3", phoneNumber: "345678912" },
      { id: "4", email: "email4@gmail.com", password: "email4", fullName: "Email4", phoneNumber: "456789123" },
    ]);
  }, []);
  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const handleSubmitRefreshData = async () => {
  };
  const handleSignOut = async () => {
    dispatch(signOut());
  }
  return (
    <div>
      {/*
      Main Page
      */}
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <Typography variant="h6">Main Page</Typography>
          <Button variant="contained" color="secondary" onClick={() => handleSignOut()}>Sign Out</Button>
          <Button variant="contained" color="primary" onClick={() => handleSubmitRefreshData()}>Refresh Data</Button>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, value) => setPage(value)} onRowsPerPageChange={(e) => handleChangeRowsPerPage(parseInt(e.target.value))} />
      </div>
    </div>
  )
};

export default Page;
