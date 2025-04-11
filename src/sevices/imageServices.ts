/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const uploadImage = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "POST",
    body: data,
  });

  return res.json();
};

export const getImages = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "GET",
  });
  if (!res.ok) {
    return res.statusText;
  } else {
    return res.json();
  }
};
