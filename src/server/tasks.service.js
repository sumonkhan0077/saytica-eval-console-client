"use server";

import serverFetch from "@/utils/server-fetch";

export const getTasks = async () => {
  try {
    const response = await serverFetch.get("/tasks");
    const json = await response.json();
    return {
      success: true,
      data: json.data ?? json,
      message: json.message || "",
    };
  } catch (error) {
    return { success: false, data: [], message: error.message };
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await serverFetch.patch(`/tasks/${id}`, {
      body: JSON.stringify({ status }),
    });
    const json = await response.json();
    return {
      success: true,
      data: json.data ?? json,
      message: json.message || "",
    };
  } catch (error) {
    return { success: false, data: null, message: error.message };
  }
};
