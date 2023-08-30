import lib from "axios";

export const axios = lib.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "",
});
