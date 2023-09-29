import { notionApi } from "@/utils/common";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params: { page_id } }: { params: { page_id: string } },
) => {
  try {
    const response = await notionApi.pages.retrieve({ page_id });

    return NextResponse.json(response);
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      { error: "문제가 발생했습니다. 다시 시도해 주세요." },
      { status: 500 },
    );
  }
};
