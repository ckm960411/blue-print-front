import { Client } from "@notionhq/client";

export const notionApi = new Client({
  auth: process.env.NOTION_AUTH_KEY,
  notionVersion: "2022-06-28",
});

export const Z_INDEX = {
  HEADER: 100,
};
