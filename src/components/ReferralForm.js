import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCandidate } from "../redux/actions";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify"; 

const ReferralForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("jobTitle", data.jobTitle);
      if (data.resume[0]) formData.append("resume", data.resume[0]);

      await dispatch(addCandidate(formData));
      reset();
      toast.success("Candidate referred successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      toast.error("Failed to refer candidate: " + (err.message || "Unknown error"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 4 ,backgroundColor:"#FFF8F8" }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Refer a Candidate
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
            />
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
            />
            <TextField
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^\d{10}$/, message: "Must be 10 digits" },
              })}
              label="Phone"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              variant="outlined"
            />
            <TextField
              {...register("jobTitle", { required: "Job Title is required" })}
              label="Job Title"
              fullWidth
              margin="normal"
              error={!!errors.jobTitle}
              helperText={errors.jobTitle?.message}
              variant="outlined"
            />
            <TextField
              {...register("resume")}
              type="file"
              inputProps={{ accept: ".pdf" }}
              fullWidth
              margin="normal"
              variant="outlined"
              label="Resume (PDF)"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Refer Candidate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReferralForm;