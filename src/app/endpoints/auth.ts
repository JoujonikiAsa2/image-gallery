/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "../utils/client";

const supabase = createClient();

// export const signupAPI = async (data: any) => {
//   try {
//     const res = await supabase.auth.signUp(data);
//     if (!res.error) {
//       const isAdded = await supabase.from("user").insert({
//         id: res?.data?.user?.id,
//         name: data.name,
//         email: data.email,
//       });
//       console.log(isAdded);
//       return isAdded.error;
//     }
//     return res;
//   } catch (err: any) {
//     console.log({
//       message: err.message,
//       status: err.status,
//       code: err.code,
//       name: err.name,
//     });
//     return {
//       message: err.message,
//       status: err.status,
//       code: err.code,
//       name: err.name,
//     };
//   }
// };

export const loginAPI = async (data: any) => {
  const res = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return res.error;
};

export const logoutAPI = async () => await supabase.auth.signOut();
