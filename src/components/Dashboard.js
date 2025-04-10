import React, { useEffect, useState } from "react"; // Add useEffect
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidates, updateStatus, deleteCandidate } from "../redux/actions";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const candidates = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ jobTitle: "", status: "" });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {

    if (!candidates.length) {
      setLoading(true);
      dispatch(fetchCandidates())
        .then(() => setLoading(false))
        .catch((err) => {
          setError("Failed to load candidates");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, candidates.length]);

  const handleStatusChange = (id, status) => {
    dispatch(updateStatus(id, status));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await dispatch(deleteCandidate(id));
        toast.success("Candidate deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (err) {
        toast.error("Failed to delete candidate: " + (err.message || "Unknown error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const filteredCandidates = candidates.filter((c) =>
    (!filters.jobTitle || c.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
    (!filters.status || c.status === filters.status)
  );

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4">Candidate Dashboard</h2>
      <div className="flex space-x-4 mb-4">
        <TextField
          value={filters.jobTitle}
          onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
          placeholder="Filter by Job Title"
          variant="outlined"
          size="small"
        />
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Reviewed">Reviewed</MenuItem>
          <MenuItem value="Hired">Hired</MenuItem>
        </Select>
      </div>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCandidates.map((candidate) => (
            <TableRow key={candidate._id}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>{candidate.jobTitle}</TableCell>
              <TableCell>
                <Select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                  size="small"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Reviewed">Reviewed</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                {candidate.resumeUrl ? (
                  <Button
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    color="primary"
                  >
                    View
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(candidate._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;