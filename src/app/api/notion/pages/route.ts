import { NextResponse } from "next/server";

export interface PageIdAndUrl {
  page_id: string;
  url: string;
}

export const GET = async () => {
  try {
    return NextResponse.json([
      {
        id: 0,
        name: "Language & Framework",
        categories: [
          {
            page_id: "9937903ea017482d873dd3153a9f90f1",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbddf6898-4721-4deb-ab28-c092a444270f%2Fjavascript.png?table=block&id=9937903e-a017-482d-873d-d3153a9f90f1&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            page_id: "6ead6192969f45368b4ef3a9f760f5b6",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F262d1690-797d-4fbf-80de-9774c13bbcfb%2Ftypescript.png?table=block&id=6ead6192-969f-4536-8b4e-f3a9f760f5b6&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            page_id: "285eccf2dba84f448c534bbcb87a435f",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F39fba650-342c-452e-8cca-1d1c29c1c20a%2Freact-icon.png?table=block&id=285eccf2-dba8-4f44-8c53-4bbcb87a435f&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            page_id: "bfc13c9ccdab4aa1b887f16e960415b4",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F050fd6fc-1506-49b5-a530-2f74c8411d7c%2Fnextjs-logo.png?table=block&id=bfc13c9c-cdab-4aa1-b887-f16e960415b4&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
        ],
      },
    ]);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { error: "문제가 발생했습니다. 다시 시도해 주세요." },
      { status: 500 },
    );
  }
};
