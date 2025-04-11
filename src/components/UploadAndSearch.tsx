"use client";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageUploadForm from "./ImageUploadForm";

const UploadAndSearch = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        py: 4,
      }}
    >
      <Paper
        component="form"
        sx={{
        height: 35,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          size="small"
          placeholder="Search image"
          inputProps={{ "aria-label": "search image" }}
        />
      </Paper>
      <ImageUploadForm />
    </Box>
  );
};

export default UploadAndSearch;
