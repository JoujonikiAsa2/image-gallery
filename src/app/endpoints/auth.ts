/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "../utils/client";

const supabase = createClient();

export const signupAPI = async (data: any) => {
  try {
    const res = await supabase.auth.signUp(data);
    console.log(res);
    if (!res.error) {
      const isAdded = await supabase.from("user").insert({
        id: res?.data?.user?.id,
        name: data.name,
        email: data.email,
      });
      console.log(isAdded);
      return isAdded.error;
    }
  } catch (err) {
    return err;
  }
};

export const loginAPI = async (data: any) => {
  const res = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  console.log(res);
  return res.error;
};

export const logoutAPI = async () => await supabase.auth.signOut();
