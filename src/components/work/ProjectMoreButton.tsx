import DropdownMenu from "@/components/work/components/task-card/DropdownMenu";
import VerticalDotsButton from "@/components/work/components/VerticalDotsButton";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoolean } from "usehooks-ts";
import { useDisclosure } from "@chakra-ui/hooks";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useRecoilState } from "recoil";

import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createProject, deleteProject } from "@/utils/services/project";

import DeletePopup from "@/components/work/components/DeletePopup";

export default function ProjectMoreButton() {
  const { openToast } = useToastMessage();
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

  const [project, setProject] = useRecoilState(projectState);

  const { mutate: createProjectRequest } = useMutation(
    ["create-project"],
    createProject,
    {
      onSuccess: (project) => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
        openToast({
          title: "생성 완료",
          description: "프로젝트 생성이 완료되었습니다.",
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
        openToast({
          title: "삭제 완료",
          description: "프로젝트가 삭제되었습니다.",
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
      icon: <BsPencil />,
      onClick: handleCreate,
      show: true,
    },
    {
      id: 1,
      title: "삭제하기",
      icon: <BsTrash />,
      onClick: handleDelete,
      show: !!project,
    },
  ];

  return (
    <>
      <div className="absolute right-16px top-16px">
        <VerticalDotsButton onClick={openDropdown} />

        <DropdownMenu
          open={dropdownOpened}
          menus={menus}
          onClose={closeDropdown}
        />

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
