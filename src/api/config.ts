import { getLSToken } from "@/utils/localStorage";
import { MethodType } from "../types";
import notify from "@/utils/notify";

export async function fetchAPI(path: RequestInfo, config: object) {
  const BASE_API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3080/v1"
      : "https://zoomlens.com.ar:3080/v1";
  // const BASE_API_URL = "https://zoomlens.com.ar:3080/v1";
  const url = BASE_API_URL + path;

  const fullConfig = {
    ...config,
  };
  const res = await fetch(url, fullConfig);

  const status = res.status;
  const resJson = await res.json();

  if (status >= 400) throw new Error(resJson.message);

  if (status >= 200 && status < 300) return resJson;
}

function setConfig(method: MethodType, path: string, body?: object) {
  const isBackOfficeFetch = path.includes("backoffice");
  const token = getLSToken(isBackOfficeFetch ? "backoffice" : "user");
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `bearer ${token}` : "",
    },
    body: body ? JSON.stringify({ ...body }) : null,
  };
  return config;
}

function handleApiError(error: any) {
  if (error.message === "Failed to fetch")
    error.message = "Error en el servidor, intente nuevamente";
  notify(error.message, "error");
  throw error;
}

export async function fetchApiPost(path: string, body?: object) {
  try {
    return await fetchAPI(path, setConfig("POST", path, body));
  } catch (error: any) {
    handleApiError(error);
  }
}
export async function fetchApiPatch(path: string, body?: object) {
  try {
    return await fetchAPI(path, setConfig("PATCH", path, body));
  } catch (error: any) {
    handleApiError(error);
  }
}
export async function fetchApiPut(path: string, body?: object) {
  try {
    return await fetchAPI(path, setConfig("PUT", path, body));
  } catch (error: any) {
    handleApiError(error);
  }
}
export async function fetchApiGet(path: string) {
  try {
    return await fetchAPI(path, setConfig("GET", path));
  } catch (error: any) {
    handleApiError(error);
  }
}
export async function fetchApiDelete(path: string) {
  try {
    return await fetchAPI(path, setConfig("DELETE", path));
  } catch (error: any) {
    handleApiError(error);
  }
}
