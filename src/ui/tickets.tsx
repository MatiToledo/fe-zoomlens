export interface Tickets {
  id: string;
  name: string;
  quantity: number;
}
import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { DeleteIcon } from "./icons/delete";
import { PlusIcon } from "./icons/plus";

export default function TicketsInput({
  tickets,
  setTickets,
}: {
  tickets: Tickets[];
  setTickets: Dispatch<SetStateAction<Tickets[]>>;
}) {
  const handleAddTicket = () => {
    setTickets([...tickets, { id: uuid(), name: "", quantity: 0 }]);
  };

  const handleTicketChange = (
    id: string,
    field: "name" | "quantity",
    value: any
  ) => {
    const updatedConsumptions = tickets.map((consumption) =>
      consumption.id === id
        ? {
            ...consumption,
            [field]:
              field === "quantity"
                ? parseInt(value === "" ? "0" : value)
                : value,
          }
        : consumption
    );
    setTickets(updatedConsumptions);
  };

  const handleDeleteTicket = (id: string) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto">
      <h3 className="text-xl mb-2">Tickets</h3>
      {tickets.map((ticket) => (
        <div className="flex gap-2 items-center" key={ticket.id}>
          <Input
            label="Nombre"
            fullWidth
            value={ticket.name}
            onChange={(e) =>
              handleTicketChange(ticket.id, "name", e.target.value)
            }
            name="consumptions"
          />
          <div className="max-w-[10px]">
            <Input
              label="Cant"
              fullWidth
              value={ticket.quantity.toString()}
              onChange={(e) =>
                handleTicketChange(ticket.id, "quantity", e.target.value)
              }
              name="cant"
            />
          </div>
          <div className="min-w-[30px] cursor-pointer">
            <DeleteIcon
              onClick={() => handleDeleteTicket(ticket.id)}></DeleteIcon>
          </div>
        </div>
      ))}
      <div
        className="flex gap-2 justify-end "
        onClick={handleAddTicket}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <p className="text-sm">Agregar ticket</p>
        <PlusIcon className="cursor-pointer" fontSize="inherit" />
      </div>
    </div>
  );
}
