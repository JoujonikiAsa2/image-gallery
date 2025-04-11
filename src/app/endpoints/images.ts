import { createClient } from "../utils/client";

const supabase = createClient();
export const getAllImages = async () => {
  const { data: images, error, status } = await supabase.from("images").select("*");
  return { images, error, status };
};
