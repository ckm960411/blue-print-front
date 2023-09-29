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
  | "green_background"
  | "orange"
  | "orange_background"
  | "blue"
  | "blue_background"
  | "pink"
  | "pink_background";
export enum BlockType {
  table_of_contents = "table_of_contents",
  quote = "quote",
  heading_1 = "heading_1",
  heading_2 = "heading_2",
  heading_3 = "heading_3",
  bulleted_list_item = "bulleted_list_item",
  numbered_list_item = "numbered_list_item",
  callout = "callout",
  pragraph = "pragraph",
  column = "column",
  column_list = "column_list",
  code = "code",
  divider = "divider",
  to_do = "to_do",
  table = "table",
  table_row = "table_row",
  toggle = "toggle",
  image = "image",
  bookmark = "bookmark",
}

export interface Icon {
  type: "text" | "emoji" | "file" | "external";
  emoji?: string;
  file?: { url: string; expiry_time: string };
  external?: { url: string };
}

export interface BlockContent {
  color?: TextColor;
  rich_text?: RichText[];
  is_toggleable?: boolean; // heading
  icon?: Icon; // 콜아웃의 경우 이모지
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

export type PageIcon = {
  type: "emoji" | "file ";
  emoji?: string;
  file?: { expiry_time: string; url: string };
};

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
