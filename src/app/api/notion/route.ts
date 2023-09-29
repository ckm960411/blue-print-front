import { NextResponse } from "next/server";
import { NotionAPI } from "notion-client";

const notionApi = new NotionAPI();

export const GET = async () => {
  try {
    const response = await notionApi.getPage(
      "9937903ea017482d873dd3153a9f90f1",
    );
    return NextResponse.json(response);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { error: "문제가 발생했습니다. 다시 시도해 주세요." },
      { status: 500 },
    );
  }
};
