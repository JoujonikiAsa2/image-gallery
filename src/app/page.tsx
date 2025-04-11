/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { createClient } from "./utils/server";
import { redirect } from "next/navigation";
import UploadAndSearch from "@/components/UploadAndSearch";
import { getAllImages } from "./endpoints/images";
import React from "react";

const Home = async () => {
  const supabase = await createClient();
  const res = await supabase.auth.getUser();
  const { images } = await getAllImages();

  const newArray = images?.flatMap((item) =>
    item?.url?.map((url: string) => ({
      url,
      title: item.title,
      tag: item.tag,
      userId: item.user_id,
      createdAt: item.createdAt,
      id: item.id,
    }))
  );

  if (!res?.data?.user) {
    redirect("/login");
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <UploadAndSearch imagesArray={newArray}/>
    </Box>
  );
};

export default Home;
