"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/store";
import { signOut } from "@/store/slices/authSlice";
import { createUser, deleteUser, getUser, updateUser } from "@/store/slices/userSlice";
import User from "@repo/shared/src/user"

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector((state: RootState) => state.auth);
  const user = useAppSelector((state) => state.user);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [data, setData] = React.useState<User[]>([]);
  const [userFormData, setUserFormData] = React.useState<User>({ id: "", email: "", password: "", fullName: "", phoneNumber: "" });
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  React.useEffect(() => {
    setData([
      { id: "1", email: "email1@gmail.com", password: "email1", fullName: "Email1", phoneNumber: "123456789" },
      { id: "2", email: "email2@gmail.com", password: "email2", fullName: "Email2", phoneNumber: "234567891" },
      { id: "3", email: "email3@gmail.com", password: "email3", fullName: "Email3", phoneNumber: "345678912" },
      { id: "4", email: "email4@gmail.com", password: "email4", fullName: "Email4", phoneNumber: "456789123" },
    ]);
    dispatch(getUser());
  }, []);
  React.useEffect(() => {
    if (user?.data?.data) {
      setData(user?.data?.data);
    }
  }, [user?.data]);
  React.useEffect(() => {
    if (!auth?.data?.data?.token) {
      router.push("/sign-in");
    }
  }, [auth?.data?.data?.token]);
  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const handleOpenModal = (user?: User) => {
    if (user) {
      setUserFormData(user);
      setIsEditMode(true);
    } else {
      setUserFormData({ id: "", email: "", password: "", fullName: "", phoneNumber: "" });
      setIsEditMode(false);
    }
    setIsOpenModal(true);
  };
  const handleCreateData = async () => {
    if (isEditMode) {
      await dispatch(updateUser(userFormData));
    } else {
      await dispatch(createUser(userFormData));
    }
    setIsOpenModal(false);
  };
  const handleDeleteData = async (id: string) => {
    await dispatch(deleteUser(id));
  };
  const handleSubmitRefreshData = async () => {
    dispatch(getUser());
  };
  const handleSignOut = async () => {
    dispatch(signOut());
  };
  return (
    <div>
      {/*
      Main Page
      */}
      <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)} fullWidth>
        <DialogTitle>{isEditMode ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Email" type="email" margin="normal" value={userFormData.email} onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })} />
          <TextField fullWidth label="Full Name" margin="normal" value={userFormData.fullName} onChange={(e) => setUserFormData({ ...userFormData, fullName: e.target.value })} />
          <TextField fullWidth label="Phone Number" margin="normal" value={userFormData.phoneNumber} onChange={(e) => setUserFormData({ ...userFormData, phoneNumber: e.target.value })} />
          <TextField fullWidth label={isEditMode ? "Password (Leave Blank If Not Want To Update)" : "Password"} type="password" margin="normal" value={userFormData.password} onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsOpenModal(false)} color="secondary">Cancel</Button>
          <Button variant="contained" onClick={handleCreateData} color="primary">{isEditMode ? "Update User" : "Add User"}</Button>
        </DialogActions>
      </Dialog>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <Typography variant="h6">Main Page</Typography>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="contained" color="secondary" onClick={() => handleSignOut()}>Sign Out</Button>
            <Button variant="contained" color="primary" onClick={() => handleSubmitRefreshData()}>Refresh Data</Button>
            <Button variant="contained" color="success" onClick={() => handleOpenModal()}>Create Data</Button>
          </div>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleOpenModal(row)}>Edit</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => handleDeleteData(row.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TablePagination count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, value) => setPage(value)} onRowsPerPageChange={(e) => handleChangeRowsPerPage(parseInt(e.target.value))} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
};

export default Page;
