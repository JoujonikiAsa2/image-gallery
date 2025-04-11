/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageUploadForm from "./ImageUploadForm";
import { filterImages } from "@/app/endpoints/images";
import ImageCard, { TProps } from "./common/ImageCard";

const UploadAndSearch = ({ imagesArray }: any) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredImages, setFilteredImages] = React.useState<
    TProps[] | undefined
  >(imagesArray);
  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    const res = await filterImages(searchQuery as string);
    const newImagesArray = res?.images?.flatMap((item) =>
      item.url.map((url: string) => ({
        url,
        title: item.title,
        tag: item.tag,
        userId: item.user_id,
        createdAt: item.createdAt,
        id: item.id,
      }))
    );
    setFilteredImages(newImagesArray);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Paper
          component="form"
          sx={{
            height: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputBase
            size="small"
            placeholder="Search image"
            inputProps={{ "aria-label": "search image" }}
            onChange={handleOnChange}
            sx={{ ml: 2 }}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon onClick={(e: any) => handleSearchSubmit(e)} />
          </IconButton>
        </Paper>
        <ImageUploadForm />
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, width: "100%" }}>
        <Grid
          spacing={6}
          width={"100%"}
          container
          sx={{
            "--Grid-borderWidth": "1px",
            "& > div": {
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
          }}
        >
          {filteredImages?.map((image: TProps, index: number) => (
            <Grid
              position={"relative"}
              key={index}
              maxHeight={240}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
                xl: 2,
              }}
            >
              <ImageCard image={image} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UploadAndSearch;
