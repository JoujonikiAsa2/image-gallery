/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
import { createClient } from "./utils/server";
import { redirect } from "next/navigation";
import UploadAndSearch from "@/components/UploadAndSearch";

const Home = async () => {
  const supabase = await createClient();
  const res = await supabase.auth.getUser();

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
          {[...Array(6)].map((_, index) => (
            <Grid
            p={2}
              key={index}
              minHeight={360}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  height:"90%",
                  p: 2,
                }}
              >
                {index}
              </Box>
              <Typography>Tag</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
