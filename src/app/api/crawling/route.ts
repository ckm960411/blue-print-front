import { NextRequest, NextResponse } from "next/server";
import { get } from "../axios";
import { load } from "cheerio";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) return;
    const { data: html } = await get(url);
    const $ = load(html);

    // 파비콘 가져오기
    const faviconLink = $('link[rel="shortcut icon"]').attr('href') || 
    $('link[rel="icon"]').attr('href');

    // 메타태그 가져오기
    let metaTags: Record<string, string> = {};

    $("meta").each((index, el) => {
      const nameValue = $(el).attr("name");
      const contentValue = $(el).attr("content");
      const propertyValue = $(el).attr("property");

      if (nameValue && contentValue) {
        metaTags[nameValue] = contentValue;
      }

      if (propertyValue && contentValue) {
        metaTags[propertyValue] = contentValue;
      }
    });

    return NextResponse.json({ faviconLink, metaTags });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "문제가 발생했습니다. 다시 시도해 주세요." },
      { status: 500 },
    );
  }
};
