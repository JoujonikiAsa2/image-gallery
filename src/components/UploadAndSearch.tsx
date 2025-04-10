"use client"
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";

const UploadAndSearch = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        height: "20vh",
      }}
    >
        <Paper
          component="form"
          sx={{
            p: "2px 2px",
            display: "flex",
            alignItems: "center",
            width: 400,
            height: 50,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          sx={{ height: 50 }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<UploadIcon />}
        >
          Upload files
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => console.log(e.target.files)}
          />
        </Button>
    </Box>
  );
};

export default UploadAndSearch;
