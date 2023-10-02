import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface BreadCrumbProps {
  linkDatas: {
    id: string;
    title: string;
  }[];
}
export default function BreadCrumb({ linkDatas }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      {linkDatas.map(({ id, title }, i) => {
        const linkDatasUntilIndex = linkDatas.slice(0, i + 1);
        const link = `/study/${linkDatasUntilIndex
          .map(({ id }) => id)
          .join("/")}`;
        const isLast = i === linkDatas.length - 1;

        return (
          <BreadcrumbItem key={id}>
            <Link
              href={link}
              className={`text-14px text-gray-600 ${
                isLast ? "font-medium text-main" : ""
              }`}
            >
              {title}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
