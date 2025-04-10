import { createClient } from "../utils/client";

const supabase = createClient();

export const getUser = async () => {
  const { data, error } = await supabase.from("users").select("*");
  return { data, error };
};
