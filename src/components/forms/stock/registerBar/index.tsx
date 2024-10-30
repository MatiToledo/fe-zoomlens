import {
  fetchDeleteStockCentral,
  fetchEditStockCentral,
} from "@/api/endpoints/stock/central";
import { fetchCreateStockRegisterBarClosure } from "@/api/endpoints/stock/registerBarClosure";
import { useAllProductsByBranchId } from "@/hooks/stock/product";
import { StockCentral, StockRegisterBar } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { ControlledTextArea } from "@/ui/inputs/textarea";
import notify from "@/utils/notify";
import { rulesAmount } from "@/utils/rules/amount";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { set, useForm } from "react-hook-form";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  mutate: any;
  setObservation: Dispatch<SetStateAction<string>>;
  downloadPDF: () => void;
  stocks: StockRegisterBar[];
};

export default function StockRegisterBarForm({
  isOpen,
  onClose,
  mutate,
  downloadPDF,
  setObservation,
  stocks,
}: PropsType) {
  const defaultValues = stocks.reduce(
    (acc: any, stock) => {
      acc[`${stock.id}_final`] = "";
      return acc;
    },
    { observation: "" }
  );
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  async function onSubmit(data: any) {
    const StockRegisterBars = stocks.map((stock) => {
      const final = parseFloat(data[`${stock.id}_final`]);
      return {
        id: stock.id,
        entries: stock.entries,
        exits: stock.exits,
        final,
        ProductPrice: stock.ProductPrice,
        consumed: stock.initial + stock.entries - stock.exits - final,
      };
    });
    const body = {
      StockRegisterBarClosure: {
        observation: data.observation,
        date: stocks[0].date,
      },
      StockRegisterBars,
    };
    const failedConsumptions = StockRegisterBars.filter(
      (stock) => stock.consumed < 0
    );
    if (failedConsumptions.length > 0 && data.observation === "") {
      const productIds = failedConsumptions.map((stock) => stock.id);
      const productsNames = stocks
        .filter((stock) => productIds.includes(stock.id))
        .map((stock) => stock.ProductName);

      notify(
        `El consumo de los productos no puede ser menor a 0 para los siguientes productos: ${productsNames.join(
          ", "
        )}`,
        "error"
      );
      return;
    }

    await fetchCreateStockRegisterBarClosure(body);
    setObservation(data.observation);
    await mutate();
    downloadPDF();
    reset();
    onClose();
    notify(`Cierre de stock central creado con exito`, "success");
  }

  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Cargar stock final
        </ModalHeader>
        <ModalBody className="gap-6">
          {stocks.map((stock) => (
            <div key={stock.id}>
              <ControlledInput
                control={control}
                name={`${stock.id}_final`}
                rules={rulesAmount}
                error={errors[`${stock.id}_final`]}
                placeholder={stock.ProductName}></ControlledInput>
            </div>
          ))}
          <ControlledTextArea
            control={control}
            name={`observation`}
            rules={{ required: false }}
            placeholder={"Observacion"}></ControlledTextArea>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Cerrar stock
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
