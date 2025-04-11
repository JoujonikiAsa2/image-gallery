/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const uploadImage = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    return res.statusText;
  } else {
    return res.json();
  }
};
