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
    .from("images")
    .select("*")
    .or(`title.ilike.%${query}%,tag.ilike.%${query}%`);

  return { images, error, status };
};

export const deleteImage = async (id: number, urlToRemove: string) => {
  const projectId = id;

  const { data, error } = await supabase.rpc("remove_url_from_array", {
    project_id: projectId,
    url_to_remove: urlToRemove,
  });
  if (error) {
    console.error("Error removing URL:", error);
  } else {
    console.log("URL removed successfully:", data);
  }
  return { data, error, status };
};
