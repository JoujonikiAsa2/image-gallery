/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "../utils/client";

const supabase = createClient();

const uploadFile = async (files: any) => {
  const allFiles = files as File[];
  const uploadResults: { success: boolean; url?: string; error?: string }[] =
    [];

  for (const file of allFiles) {
    const filePath = `${new Date().getTime()}-${file.name}`;

    // Add upsert option to handle RLS
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });
    if (error) {
      uploadResults.push({ success: false, error: error.message });
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);
      uploadResults.push({ success: true, url: publicUrl });
    }
  }

  return uploadResults;
};

export const createImage = async (formData: any) => {
  const data = formData?.data;
  const files = formData?.files;

  const uploadResults: any = await uploadFile(files);

  const {
    data: images,
    error,
    status,
  } = await supabase.from("images").insert({
    title: data.title,
    tag: data.tag,
    url: uploadResults?.map((result: any) => result.url),
    user_id: data.user_id,
  });
  return { images, error, status };
};

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
  return { data, error, status };
};
