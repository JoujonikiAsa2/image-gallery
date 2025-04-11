"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export type TProps = {
  title: string;
  tag: string;
  userId: number;
  url: string;
};



const ImageCard = ({ image }: { image: TProps }) => {
    const [isClicked, setIsClicked] = React.useState(false);

const handlePopoverOpen = () => {
    setIsClicked(!isClicked);
};

  return (
    <React.Fragment>
      <Image
        onClick={handlePopoverOpen}
        src={image.url}
        alt={image.title}
        width={400}
        height={360}
        className="h-full w-full object-cover"
      />
      <Box
        sx={{
          p: 2,
          position: isClicked ? "absolute" : "hidden",
          visibility: !isClicked ? "hidden" : "visible",
          bottom: 0,
          bgcolor: "background.paper",
          width: "100%",
          transform: isClicked ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.5s ease-in",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="body1"
            color="secondary"
            textTransform={"capitalize"}
          >
            Title: {image.title}
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            textTransform={"capitalize"}
          >
           Tag: {image.tag}
          </Typography>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default ImageCard;
