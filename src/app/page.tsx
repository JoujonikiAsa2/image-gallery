/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from "@mui/material";
import { createClient } from "./utils/server";
import { redirect } from "next/navigation";
import UploadAndSearch from "@/components/UploadAndSearch";
import { getAllImages } from "./endpoints/images";
import ImageCard, { TProps } from "@/components/common/ImageCard";

const Home = async () => {
  const supabase = await createClient();
  const res = await supabase.auth.getUser();
  const { images } = await getAllImages();

  const newArray = images?.flatMap((item) =>
    item.url.map((url: string) => ({
      url,
      title: item.title,
      tag: item.tag,
      userId: item.user_id,
      createdAt: item.createdAt,
    }))
  );
  console.log(images, newArray);

  if (!res.data.user) {
    redirect("/login");
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <UploadAndSearch />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          spacing={2}
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
          {newArray?.map((image: TProps, index) => (
            <Grid
            position={"relative"}
              key={index}
              maxHeight={170}
              size={{
                xs: 6,
                sm: 4,
                md: 2,
                lg: 2,
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

export default Home;
