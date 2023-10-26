import IconButton from "@/components/components/IconButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createProject, deleteProject } from "@/utils/services/project";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

interface ProjectMoreButtonProps {}
export default function ProjectMoreButton({}: ProjectMoreButtonProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();
  useOnClickOutside(dropdownRef, closeDropdown);

  const [project, setProject] = useRecoilState(projectState);

  const { mutate: createProjectRequest } = useMutation(
    ["create-project"],
    createProject,
    {
      onSuccess: (project) => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
        toast.current?.show({
          severity: "success",
          summary: "생성 완료",
          detail: "프로젝트 생성이 완료되었습니다.",
        });
        closeDropdown();
        setProject(project);
      },
      onError: console.error,
    },
  );

  const { mutate: deleteProjectRequest } = useMutation(
    ["delete-project"],
    (id: number) => deleteProject(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
        toast.current?.show({
          severity: "success",
          summary: "삭제 완료",
          detail: "프로젝트가 삭제되었습니다.",
        });
        setProject(undefined);
        closeDeletePopup();
      },
      onError: console.error,
    },
  );

  const handleCreate = () => {
    createProjectRequest("");
  };

  const handleDelete = () => {
    if (!project) return;
    closeDropdown();
    openDeletePopup();
  };

  const handleDeleteProject = () => {
    if (!project) return;
    deleteProjectRequest(project.id);
  };

  const menus = [
    {
      title: "추가하기",
      Icon: () => <BsPencil />,
      onClick: handleCreate,
    },
    {
      title: "삭제하기",
      Icon: () => <BsTrash />,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Toast ref={toast} />

      <div className="absolute right-16px top-16px">
        <Popover isOpen={isDeletePopupOpen} placement="bottom-end">
          <PopoverTrigger>
            <IconButton
              onClick={openDropdown}
              className="bg-white hover:bg-gray-50"
            >
              <BiDotsVerticalRounded />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent className="max-w-[240px] p-16px text-14px font-medium text-gray-800">
            <div>정말 이 프로젝트를 삭제할까요?</div>
            <div className="mt-16px flex items-center justify-end gap-8px">
              <button
                onClick={closeDeletePopup}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleDeleteProject}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                확인
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {dropdownOpened && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-10 w-100px rounded-10px border border-gray-200 bg-white py-8px shadow-md"
          >
            {menus.map(({ title, Icon, onClick }, i) => (
              <div
                key={i}
                onClick={onClick}
                className="flex-center w-full cursor-pointer gap-8px bg-white p-8px text-14px hover:bg-gray-50"
              >
                <Icon />
                <span>{title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
