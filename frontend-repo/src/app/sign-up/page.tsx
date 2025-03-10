"use client";

import React from "react";
import { Box, Button, FormControl, FormGroup, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AuthContainerComponent from "@/components/AuthContainer";
import CardComponent from "@/components/Card";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const handleSubmitSignUp = async () => {
  };
  return (
    <div>
      {/*
      Sign Up Page
      */}
      <AuthContainerComponent direction="column" justifyContent="space-between">
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <CardComponent variant="outlined">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <Tabs value={1} onChange={() => router.push("/sign-in")} centered>
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
            <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <TextField fullWidth label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <TextField fullWidth label="Full Name" name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <TextField fullWidth label="Phone Number" name="phoneNumber" type="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <TextField fullWidth label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <Button variant="contained" color="primary" fullWidth onClick={handleSubmitSignUp}>Sign Up</Button>
                </FormGroup>
              </FormControl>
            </Box>
          </CardComponent>
        </Box>
      </AuthContainerComponent>
    </div>
  )
};

export default Page;
