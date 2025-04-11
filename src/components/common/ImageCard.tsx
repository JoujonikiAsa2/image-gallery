"use client";

import { Box, Modal, Stack, Typography } from "@mui/material";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export type TProps = {
  url: string;
  title: string;
  tag: string;
  userId: number;
  createdAt: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageCard = ({ image }: { image: TProps }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Image
        src={image.url}
        alt={image.title}
        width={400}
        height={160}
        className="h-full w-full object-contain cursor-pointer"
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
        {image.url.split("/")[image.url.split("/").length - 1].slice(0, 40)}
        {image.url.split("/")[image.url.split("/").length - 1].length > 40
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
    width: 200,
    height: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p:2
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
          right: 35,
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
        <Box sx={{ ...childModalStyle, width: 1000, fontFamily:'roboto' }}>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body2" textTransform={"capitalize"}>
              Title: {image.title}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              Tag: {image.tag}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              User: {image.userId}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
              Date: {new Date(image.createdAt).toLocaleDateString()}, {new Date(image.createdAt).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" textTransform={"capitalize"}>
             URL: <span className="text-blue-500"><Link onCopy={(e) => e.preventDefault()} href={image.url} target="_blank">{image.url}</Link></span>
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ImageCard;
