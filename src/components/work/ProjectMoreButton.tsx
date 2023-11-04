import DeletePopup from "@/components/work/components/DeletePopup";
import { keyDownEventWrapper } from "@/utils/common/etc/keyDownEventWrapper";
import React, { useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { Toast } from "primereact/toast";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createProject, deleteProject } from "@/utils/services/project";
import IconButton from "@/components/components/IconButton";

export default function ProjectMoreButton() {
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
      id: 0,
      title: "추가하기",
      Icon: BsPencil,
      onClick: handleCreate,
      show: true,
    },
    {
      id: 1,
      title: "삭제하기",
      Icon: BsTrash,
      onClick: handleDelete,
      show: !!project,
    },
  ] as const;

  return (
    <>
      <Toast ref={toast} />

      <div className="absolute right-16px top-16px">
        <IconButton
          onClick={openDropdown}
          className="bg-white hover:bg-gray-50"
        >
          <BiDotsVerticalRounded />
        </IconButton>

        {dropdownOpened && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-10 w-100px rounded-10px border border-gray-200 bg-white py-8px shadow-md"
          >
            {menus
              .filter((menu) => menu.show)
              .map(({ id, title, Icon, onClick }) => (
                <div
                  key={id}
                  onClick={onClick}
                  onKeyDown={keyDownEventWrapper(onClick)}
                  className="flex-center w-full cursor-pointer gap-8px bg-white p-8px text-14px hover:bg-gray-50"
                >
                  <Icon />
                  <span>{title}</span>
                </div>
              ))}
          </div>
        )}

        <DeletePopup
          open={isDeletePopupOpen}
          title="정말 이 프로젝트를 삭제할까요?"
          onClose={closeDeletePopup}
          onComplete={handleDeleteProject}
        />
      </div>
    </>
  );
}
