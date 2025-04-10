import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { API_URL } from "../utils/constant";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  CircularProgress, 
} from "@mui/material";

const AuthForm = ({ setToken }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const url = isSignup
        ? `${API_URL}/auth/signup`
        : `${API_URL}/auth/login`;
      const res = await axios.post(url, data);
      const token = res.data.token;
      setToken(token); 
      localStorage.setItem("token", token); 
      reset(); 
      navigate("/dashboard"); 
    } catch (err) {
      alert(
        err.response?.data?.message || `${isSignup ? "Signup" : "Login"} failed`
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          maxHeight: 400,
          margin: 8,
          padding: 2,
          boxShadow: 5,
          backgroundColor: "#F6f2f2",
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isSignup ? "Sign Up" : "Login"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              disabled={loading} // Disable during loading
            />
            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              disabled={loading} 
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading} 
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                isSignup ? "Sign Up" : "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(!isSignup);
              reset();
            }}
            sx={{ textDecoration: "none" }}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AuthForm;