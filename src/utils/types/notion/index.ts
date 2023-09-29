export type TextColor =
  | "default"
  | "gray"
  | "gray_background"
  | "red"
  | "red_background"
  | "purple"
  | "purple_background"
  | "yellow"
  | "yellow_background"
  | "green"
  | "green_background";
export type BlockType =
  | "table_of_contents"
  | "quote"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "callout"
  | "pragraph"
  | "column"
  | "column_list"
  | "code"
  | "divider"
  | "to_do"
  | "table"
  | "table_row"
  | "toggle"
  | "image"
  | "bookmark";
export interface BlockContent {
  color?: TextColor;
  rich_text?: RichText[];
  is_toggleable?: boolean; // heading
  icon?: {
    type: "text" | "emoji";
    emoji?: string;
  }; // 콜아웃의 경우 이모지
  caption?: RichText[]; // code, image, bookmark
  url?: string; // bookmark
  file?: {
    expiry_time: Date | string;
    url: string;
  }; // image
  checked?: boolean; // to_do
  has_column_header: boolean; // table
  has_row_header: boolean; // table
  table_width: number; // table: 테이블 컬럼 개수
  cells: RichText[]; // table_row
}
export type BlockTypeContent = {
  [key in BlockType]: BlockContent;
};

export interface RichText {
  type: "text";
  annotations: {
    bold: boolean;
    code: boolean;
    color: TextColor;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  href: string | null;
  palin_text: string;
  text: {
    content: string;
    link: string | null;
  };
}

export type Block = {
  id: string;
  object: "block" | "list";
  type: BlockType;
  archived: boolean;
  created_time: Date | string;
  last_edited_time: Date | string;
  has_children: boolean;
  parent: {
    type: "page_id";
    page_id: string;
  };
} & BlockTypeContent;

export interface GetBlockListResDto {
  block: any;
  type: "block";
  has_more: boolean;
  next_cursor: null;
  object: "list";
  results: Block[];
}

export type PageIcon =
  | {
      type: "file";
      file: { expiry_time: string; url: string };
    }
  | { type: "emoji"; emoji: string };

export interface GetPageResDto {
  id: string;
  archived: boolean;
  cover:
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { expiry_time: string; url: string } }
    | null;
  created_time: Date | string;
  last_edited_time: Date | string;
  icon?: PageIcon;
  parent: {
    type: "page_id";
    page_id: string;
  };
  properties: {
    title: {
      id: "title";
      title: RichText[];
      type: "title";
    };
  };
  public_urL: string;
  url: string;
}
