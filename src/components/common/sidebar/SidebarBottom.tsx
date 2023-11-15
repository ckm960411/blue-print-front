import { LoginButton } from "@/components/common/sidebar/index";

interface SidebarBottomProps {
  isSidebarOpen: boolean;
}
export default function SidebarBottom({
  isSidebarOpen,
}: Readonly<SidebarBottomProps>) {
  return (
    <div className="flex items-center justify-end p-16px">
      <LoginButton isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
