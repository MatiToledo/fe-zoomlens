import { QueryTables } from "@/types";
import { Pagination } from "@nextui-org/pagination";
import { Dispatch, SetStateAction } from "react";

type PaginationComponentProps = {
  page: number;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
  total: number;
};

export default function PaginationComponent({
  page,
  setQueries,
  total,
}: PaginationComponentProps) {
  return (
    <div
      // key={`${identifier}_${total}_pagination`}
      className="py-2 px-2 flex justify-center items-end">
      <Pagination
        // aria-label={`${identifier}_pagination`}
        isCompact
        showControls
        dotsJump={5}
        loop={true}
        color="primary"
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        page={page}
        total={total}
        variant="light"
        onChange={(page: number) => {
          setQueries((prev) => {
            return { ...prev, page: page };
          });
        }}
      />
    </div>
  );
}
