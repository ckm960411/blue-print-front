import { LoginButton } from "@/components/common/sidebar/index";

interface SidebarBottomProps {}
export default function SidebarBottom({}: SidebarBottomProps) {
  return (
    <div className="p-16px">
      <LoginButton />
    </div>
  );
}
