import {
  fetchCreateConcept,
  fetchDeleteConcept,
  fetchEditConcept,
} from "@/api/endpoints/concept";
import { useGetConceptsByLevel } from "@/hooks/concept";
import { Concept } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import notify from "@/utils/notify";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  rowSelected: Concept | null;
  setRowSelected: Dispatch<SetStateAction<Concept | null>>;
};

export default function ConceptForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const isEdit = !!rowSelected;
  const [isVisible, setIsVisible] = useState<boolean>(
    isEdit ? rowSelected.visible : false
  );

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: isEdit ? rowSelected.name : "",
      level: isEdit ? rowSelected.level.toString() : "",
      TypeId: isEdit ? rowSelected.TypeId : undefined,
    },
  });

  const isLevelSelected = watch("level") !== undefined;
  const levelToUse = getValues("level") === "2" ? "3" : "2";
  const types = useGetConceptsByLevel(levelToUse);

  async function onSubmit(data: any) {
    data = {
      ...data,
      level: parseInt(data.level),
      type: types?.find((type) => type.value === data.TypeId)?.label,
      visible: parseInt(data.level) !== 1 ? false : isVisible,
    };

    isEdit
      ? await fetchEditConcept(rowSelected.id, data)
      : await fetchCreateConcept(data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(
      `Concepto ${isEdit ? "actualizado" : "creado"} con exito`,
      "success"
    );
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteConcept(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Concepto eliminado con exito", "success");
  }

  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onClose={() => {
        setRowSelected(null);
        onClose();
      }}
      scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isEdit ? "Editar concepto" : "Crear concepto"}
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.name}
            control={control}
            rules={{ required: true }}
            name="name"
            placeholder="Nombre"></ControlledInput>
          <ControlledSelect
            key={isLevelSelected ? "level-selected" : "level-not-selected"}
            rules={{ required: true }}
            options={[
              { label: "Nivel 1", value: "1" },
              { label: "Nivel 2", value: "2" },
              { label: "Nivel 3", value: "3" },
            ]}
            control={control}
            label="Nivel"
            name="level"></ControlledSelect>
          {isLevelSelected && types && getValues("level") !== "3" && (
            <ControlledSelect
              key={"type-select"}
              rules={{ required: true }}
              control={control}
              label="Tipo"
              options={types}
              name="TypeId"></ControlledSelect>
          )}
          {isLevelSelected && getValues("level") === "1" && (
            <Switch onValueChange={setIsVisible} defaultSelected={isVisible}>
              Visible tesoreria nocturna
            </Switch>
          )}
        </ModalBody>
        <ModalFooter>
          {isEdit && (
            <Button color="danger" variant="flat" onPress={handleDelete}>
              Eliminar
            </Button>
          )}
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Editar" : "Crear"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
