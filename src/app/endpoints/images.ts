import { createClient } from "../utils/client";

const supabase = createClient();
export const getAllImages = async () => {
  const {
    data: images,
    error,
    status,
  } = await supabase.from("images").select("*");
  return { images, error, status };
};

export const filterImages = async (query: string) => {
  const {
    data: images,
    error,
    status,
  } = await supabase
    .from("characters")
    .select("*")
    .or(`title.ilike.%${query}%,tag.ilike.%${query}%`);

  return { images, error, status };
};


export const deleteImages = async (id: string) => {
  const {
    data: images,
    error,
    status,
  } = await supabase
    .from("characters")
    .delete()
    .eq('user_id', id)

  return { images, error, status };
};
