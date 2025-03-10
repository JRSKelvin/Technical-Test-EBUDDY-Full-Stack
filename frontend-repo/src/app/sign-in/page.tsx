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
  const handleSubmitSignIn = () => {
  };
  return (
    <div>
      {/*
      Sign In Page
      */}
      <AuthContainerComponent direction="column" justifyContent="space-between">
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <CardComponent variant="outlined">
            <Typography variant="h4" gutterBottom>Sign In</Typography>
            <Tabs value={0} onChange={() => router.push("/sign-up")} centered>
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
                  <TextField fullWidth label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <Button variant="contained" color="primary" fullWidth onClick={handleSubmitSignIn}>Sign In</Button>
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
