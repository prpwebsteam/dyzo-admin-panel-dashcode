import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Cookies from "js-cookie";
const apiBaseURL = "https://api.dyzo.ai";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({}),
});

export const fetchGET = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // throw new Error(`HTTP error! status: ${error.response.status}`);
  }
};

// Post Data without token
export const fetchPOST = async (url, data) => {
  try {
    const response = await axios.post(url, data.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error(`HTTP error! status: ${error.response.status}`);
  }
};

// Post with authorization token
export const fetchAuthPost = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.post(url, data.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error in API call");
  }
};

export const fetchAuthFilePost = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.post(url, data.body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error in API call");
  }
};

// GET with authorization token
export const fetchAuthGET = async (url) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// PUT with authorization token
export const fetchAuthPut = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.put(url, data.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchAuthFilePut = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.put(url, data.body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error in API call");
  }
};

// PUT with authorization token
export const fetchAuthPutFile = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.put(url, data.body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error in API call");
  }
};

export const fetchAuthPatch = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.patch(url, data.body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchAuthPatchFile = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.patch(url, data.body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// DELETE with authorization token
export const fetchDelete = async (url) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteAPI = async (endpoint, data) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const isAdmin = () => {
  const userInfoString = Cookies.get("userInfo");
  if (!userInfoString) {
    // If userInfoString is undefined, null, or an empty string, return false
    return false;
  }

  try {
    const userInfo = JSON.parse(userInfoString);
    return userInfo?.isAdmin || false;
  } catch (error) {
    // Handle the error or return false if JSON parsing fails
    return false;
  }
};

// Post Data without token
export const postAPI = async (endpoint, data) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.post(url, data.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
// Post Data without token Files
export const postAPIFiles = async (endpoint, data) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.post(url, data.body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
// Get Data without token
export const fetchAPI = async (endpoint) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const fetchAPIOption = async (endpoint, options = {}) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};
// Post Data without token
export const patchAPI = async (endpoint, data) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
    return response.data;
  } catch (error) {
    // Better to throw an error or handle it more explicitly

    throw error; // Rethrow or handle as needed
  }
};

export const patchUpdateAPI = async (endpoint, { body }) => {
  const url = `${apiBaseURL}/${endpoint}`;
  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export const fetchJsonAuthPatch = async (url, data) => {
  const token = Cookies.get("userToken");
  try {
    const response = await axios.patch(url, data.body, {
      headers: {
        "Content-Type": "application/json", // Changed from 'multipart/form-data' to 'application/json'
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const exportToCSV = (data, filename, selectedCols, newHeaders) => {
  const csvRows = [];

  // Create the header row using new headers
  csvRows.push(newHeaders.join(","));

  for (const row of data) {
    // Create a row with only the selected columns
    const values = selectedCols.map((col) => {
      const value = row[col];
      // Enclose values in double quotes if they contain commas
      if (typeof value === "string" && value.includes(",")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(","));
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const uploadtoS3 = async (
  uploadUrl,
  companyId,
  userId,
  taskId,
  folder,
  name,
  file
) => {
  const getPresignedUrl = async () => {
    const raw = JSON.stringify({
      fileName: `${companyId}/${userId}/${taskId}/${folder}/${name}`,
      fileType: file.type,
    });
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  try {
    const presignedUrl = await getPresignedUrl();
    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type, // Set the correct MIME type of the file
      },
      body: file,
    });
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Image upload failed: ${errorText}`);
    }
    return presignedUrl.split("?")[0];
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const fetchAuthAPI = async (endpoint, authToken) => {
  const url = `${apiBaseURL}/${endpoint}`;
  console.log(`Fetching ${url} with token ${authToken}`);
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response); // Log the error response
    return error;
  }
};

export const askChatGPT = async (inputText) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      { model: "gpt-4", messages: [{ role: "user", content: `${inputText}` }] },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_CHATGPT_API_KEY}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};