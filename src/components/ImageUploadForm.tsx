/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};
const closeButtonStyle = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "1px solid #000",
};

const ImageUploadForm = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fieldValues, setFieldValues] = React.useState<{
    title: string;
    tag: string;
  }>({ title: "", tag: "" });
  const [fileList, setFileList] = React.useState([] as any);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const handleOnChange = (e: any) => {
    setFieldValues({ ...fieldValues, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    console.log(files);
    setLoading(true);
    Object.values(files).forEach((file) => {
      setFileList((prev: any) => [...prev, file]);
    });
    setLoading(false);
  };

  console.log(fieldValues, fileList);
  return (
    <Box>
      <Button
        variant="contained"
        sx={{ height: 50 }}
        onClick={() => handleOpen(true)}
      >
        Upload Image
      </Button>
      <Modal
        open={open}
        onClose={() => handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box sx={closeButtonStyle} onClick={() => handleOpen(false)}>
              <CloseIcon />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>Upload Image</Typography>
            <TextField
              name="title"
              label="Title"
              size="small"
              fullWidth
              onChange={(e) => handleOnChange(e)}
            />
            <TextField
              name="tag"
              label="tag"
              size="small"
              fullWidth
              onChange={(e) => handleOnChange(e)}
            />
            <Box sx={{ textAlign: "center" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image-button"
                multiple
                type="file"
                onChange={handleUpload}
                disabled={loading}
              />
              <label htmlFor="upload-image-button">
                <Button
                  component="span"
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CollectionsOutlinedIcon />
                    )
                  }
                  disabled={loading}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ px: 3 }}
                >
                  Choose Images
                </Button>
              </label>
            </Box>
            <Button
              component="span"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CloudUploadIcon />
                )
              }
              disabled={loading}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ px: 3 }}
            >
              Upload
            </Button>
            <Box>
              {fileList?.length > 0 && (
                <List>
                  {fileList.map((file: File, index: number) => (
                    <ListItem key={index}>
                      <Typography variant="body2" color="textSecondary">
                        {index + 1}.{file.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUploadForm;
