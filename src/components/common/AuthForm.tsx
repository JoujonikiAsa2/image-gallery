/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import Link from "next/link";
import { loginAPI } from "@/app/endpoints/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TProps = {
  isLogin: boolean;
};

const AuthForm = ({ isLogin }: TProps) => {
  const [data, setData] = React.useState<Record<string, unknown>>({
    name: "",
    email: "joujonikiasaroy@gmail.com",
    password: "111111",
  });
  const router = useRouter();
  const handleOnchange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!isLogin) {
    //   const error = await signupAPI(data);
    //   console.log(error);
    //   if (error === null) {
    //     toast.success("Check your email to verify your account");
    //     router.push("/login");
    //   } else {
    //     toast.error("Something went wrong");
    //   }
    // } else {
    const error = await loginAPI(data);
    toast.error(error?.message);
    if (!error) {
      toast.success("Logged in successfully");
      router.push("/");
    }
    // }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Card
          sx={{
            width: 400,
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                color: "primary.main",
                width: "content-fit",
              }}
            >
              {!isLogin ? "Sign Up" : "Login"}
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack spacing={2}>
                {!isLogin && (
                  <TextField
                    name="name"
                    label="Name*"
                    size="small"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnchange(e)
                    }
                  />
                )}
                <TextField
                  name="email"
                  label="Email*"
                  size="small"
                  type="email"
                  defaultValue={isLogin ? data.email : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnchange(e)
                  }
                />
                <TextField
                  name="password"
                  label="Password*"
                  size="small"
                  type="password"
                  defaultValue={isLogin ? data.password : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnchange(e)
                  }
                />

                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  {!isLogin ? "Sign Up" : "Login"}
                </Button>
              </Stack>
            </form>
          </CardContent>
          <CardActions
            sx={{
              px: 2,
            }}
          ></CardActions>
          <Box
            sx={{
              px: 2,
              pb: 2,
            }}
          >
            {/* <Typography
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              {!isLogin ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-blue-500">
                    Sign Up
                  </Link>
                </>
              )}
            </Typography> */}
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default AuthForm;
