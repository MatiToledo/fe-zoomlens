import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ModalComponent({
  title,
  isOpen,
  isLoading,
  isDisabled,
  handleClose,
  children,
  onCreate,
  onEdit,
  onDelete,
}: any) {
  return (
    <Modal
      backdrop={"opaque"}
      placement="bottom-center"
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody className="gap-6 min-h-[312px]">{children}</ModalBody>
        <ModalFooter>
          {onDelete && (
            <Button
              onClick={onDelete}
              isDisabled={isDisabled}
              variant="flat"
              color="danger">
              Eliminar
            </Button>
          )}
          {onCreate && (
            <Button
              onClick={onCreate}
              isLoading={isLoading}
              isDisabled={isDisabled}
              color="primary">
              Crear
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={onEdit}
              isLoading={isLoading}
              isDisabled={isDisabled}
              color="primary">
              Editar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
