"use client";

import { Box, Modal, Stack, Typography } from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { deleteImage } from "@/app/endpoints/images";
import { toast } from "sonner";

export type TProps = {
  url: string;
  title: string;
  tag: string;
  userId: string;
  createdAt: string;
  id: number;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  maxWidth: 900,
  maxHeight: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageCard = ({ image }: { image: TProps }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const res = await deleteImage(image.id, image.url);
    if (res.error == null) {
      toast.success("Image deleted successfully");
      window.location.reload();
    } else {
      toast.error("Something went wrong");
    }
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Image
        src={image.url}
        alt={image.title}
        width={400}
        height={160}
        className="h-full w-full object-cover cursor-pointer"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src={image.url}
            alt={image.title}
            width={1200}
            height={1160}
            className="h-full w-full object-contain cursor-pointer"
            onClick={handleOpen}
          />
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              position: "absolute",
              bgcolor: "white",
              top: 10,
              right: 8,
            }}
          >
            <DeleteIcon
              onClick={() => handleDelete()}
              sx={{
                ":hover": {
                  transform: "scale(1.2)",
                },
                transition: "transform 0.5s ease-in",
                cursor: "pointer",
              }}
            />
            <CloseIcon
              onClick={handleClose}
              sx={{
                ":hover": {
                  transform: "scale(1.2)",
                },
                transition: "transform 0.5s ease-in",
                cursor: "pointer",
              }}
            />
          </Stack>
          <ChildModal image={image} />
        </Box>
      </Modal>
      <Typography
        variant="body2"
        fontFamily="inherit"
        sx={{
          mt: 1,
          bgcolor: "white",
          color: "black",
          fontSize: "11px",
          fontWeight: "bold",
        }}
      >
        {image?.url?.split("/")[image?.url?.split("/").length - 1].slice(0, 40)}
        {image?.url?.split("/")[image?.url?.split("/").length - 1].length > 40
          ? "..."
          : ""}
      </Typography>
    </React.Fragment>
  );
};

const ChildModal = ({ image }: { image: TProps }) => {
  const [open, setOpen] = React.useState(false);

  const childModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 300,
    maxHeight: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <InfoSharpIcon
        onClick={handleOpen}
        sx={{
          position: "absolute",
          bgcolor: "white",
          borderRadius: "50%",
          top: 10,
          right: 70,
          ":hover": {
            transform: "scale(1.2)",
          },
          transition: "transform 0.5s ease-in",
          cursor: "pointer",
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...childModalStyle, width: 1000, fontFamily: "roboto" }}>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body2" textTransform={"capitalize"}>
              <span className="text-primary font-bold">Title:</span> {image.title}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              <span className="text-primary font-bold">Tag:</span> {image.tag}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              <span className="text-primary font-bold">User:</span> {image.userId}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              <span className="text-primary font-bold">Uploaded At:</span> {new Date(image.createdAt).toLocaleDateString()},{" "}
              {new Date(image.createdAt).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              <span className="text-primary font-bold">URL:</span> <span className="text-blue-500">
                <Link
                  onCopy={(e) => e.preventDefault()}
                  href={image.url}
                  target="_blank"
                >
                  Image url
                </Link>
              </span>
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ImageCard;
