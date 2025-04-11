"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { createClient } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import { logoutAPI } from "@/app/endpoints/auth";

function Navbar() {
  const [user, setUser] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const supabase = createClient();
  
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(!!session?.user);
    });
  }, [supabase.auth]);

  const handleLogout = async () => {
    await logoutAPI();
    router.replace("/login");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PGallery
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="user"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  href="/login"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    ":hover": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  href="/signup"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    ":hover": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={handleLogout}>Log Out</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
