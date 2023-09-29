import { notionApi } from "@/utils/common/notion";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { block_id } }: { params: { block_id: string } },
) => {
  const page_size = Number(req.nextUrl.searchParams.get("page_size")) ?? 100;

  try {
    const response = await notionApi.blocks.children.list({
      block_id,
      page_size,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      { error: "문제가 발생했습니다. 다시 시도해 주세요." },
      { status: 500 },
    );
  }
};
