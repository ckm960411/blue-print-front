import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json([
      {
        id: 0,
        name: "Language & Framework",
        categories: [
          {
            title: "HTML & CSS & SCSS 마스터",
            page_id: "177c52c8d6954ca5ba7a56d44b386688",
            url: "https://w7.pngwing.com/pngs/509/571/png-transparent-cascading-style-sheets-logo-css3-html-web-development-world-wide-web-blue-angle-web-design.png",
          },
          {
            title: "JavaScript 마스터",
            page_id: "9937903ea017482d873dd3153a9f90f1",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbddf6898-4721-4deb-ab28-c092a444270f%2Fjavascript.png?table=block&id=9937903e-a017-482d-873d-d3153a9f90f1&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            title: "TypeScript 마스터",
            page_id: "6ead6192969f45368b4ef3a9f760f5b6",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F262d1690-797d-4fbf-80de-9774c13bbcfb%2Ftypescript.png?table=block&id=6ead6192-969f-4536-8b4e-f3a9f760f5b6&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            title: "React 마스터",
            page_id: "285eccf2dba84f448c534bbcb87a435f",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F39fba650-342c-452e-8cca-1d1c29c1c20a%2Freact-icon.png?table=block&id=285eccf2-dba8-4f44-8c53-4bbcb87a435f&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            title: "Next JS 마스터",
            page_id: "bfc13c9ccdab4aa1b887f16e960415b4",
            url: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F050fd6fc-1506-49b5-a530-2f74c8411d7c%2Fnextjs-logo.png?table=block&id=bfc13c9c-cdab-4aa1-b887-f16e960415b4&spaceId=8c6716f5-9c87-4a36-ad4f-8be11a05349d&width=250&userId=0a8cf6c1-9ede-41dd-8106-1abc670c1c1c&cache=v2",
          },
          {
            title: "Nest JS 마스터",
            page_id: "5767a2885e394665a1abd1d686469eae",
            url: "https://static-00.iconduck.com/assets.00/nestjs-icon-512x510-9nvpcyc3.png",
          },
          {
            title: "Three JS 마스터",
            page_id: "67950b4e296345f5ad3a37dd65907496",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/1200px-Three.js_Icon.svg.png",
          },
          {
            title: "DB & SQL 마스터",
            page_id: "d3e495eed3f347e5b60c9d3128441387",
            url: "https://www.ibm.com/content/dam/adobe-cms/instana/media_logo/Azure-SQL-Server-Monitoring.component.complex-narrative-xl.ts=1692649117803.png/content/adobe-cms/kr/ko/products/instana/supported-technologies/microsoft-sql-server-monitoring/_jcr_content/root/table_of_contents/body/content_section_styled/content-section-body/complex_narrative/logoimage",
          },
          {
            title: "Node JS 마스터",
            page_id: "81cffc50279949768ad10166ea35cf2f",
            url: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
          },
        ],
      },
      {
        id: 1,
        name: "Development",
        categories: [
          {
            title: "GitHub 마스터 & Markdown 문법",
            page_id: "bdccaf5475d746179170e8e375875f74",
            url: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
          },
          {
            title: "HTTP 완벽 가이드",
            page_id: "d433673447f940f7a182a21f868eaf89",
            url: "https://cdn-icons-png.flaticon.com/512/1674/1674969.png",
          },
          {
            title: "CS 마스터",
            page_id: "ab76275627fc426cbb76680ae9a14553",
            url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/computer-science-1847495-1567216.png",
          },
          {
            title: "TDD 테스트코드",
            page_id: "47d1bc0f27de48f6bc431b7cd1ceb608",
            url: "https://hanamon.kr/tdd%EB%9E%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C/tdd-%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%8C%E1%85%AE%E1%84%80%E1%85%B5/",
          },
          {
            title: "AWS 마스터",
            page_id: "2a74ae11fb6d430d95e861cc7b740674",
            url: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
          },
          {
            title: "블렌더 마스터",
            page_id: "36a0fff09b4941458c4052241464344e",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCH5Eoj3ojDyyNGIskvS6YMA8V7r_65jjkvtiJ-Fsr5CPAY3Omau1Tc0Y0PBfp_OpltlY&usqp=CAU",
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
