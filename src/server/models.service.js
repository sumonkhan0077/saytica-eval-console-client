"use server";

import serverFetch from "@/utils/server-fetch";

export const getModels = async () => {
  try {
    const response = await serverFetch.get("/models");

    const json = await response.json();

    return {
      success: true,
      data: json.data ?? json,   // 🔥 important fix
      message: json.message || "",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};