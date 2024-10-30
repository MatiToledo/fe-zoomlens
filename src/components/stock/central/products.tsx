"use client";
import { fetchBulkCreateProducts } from "@/api/endpoints/stock/product";
import GridComponent from "@/components/treasury/central/grid";
import { useAllProductsByBranchId } from "@/hooks/stock/product";
import { BackIcon } from "@/ui/icons/back";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { floatColumn, keyColumn, textColumn } from "react-datasheet-grid";

export default function StockCentralProductsComponent() {
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const { products, setProducts, mutate } = useAllProductsByBranchId(
    user.BranchId
  );
  const columns = [
    { ...keyColumn("name", textColumn), title: "Nombre" },
    { ...keyColumn("price", floatColumn), title: "Precio" },
    { ...keyColumn("observation", textColumn), title: "Observacion" },
  ];

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative">
      <h1 className="text-4xl font-bold tracking-tight mb-4 ">Productos</h1>
      <div
        className="absolute top-[32px]"
        onClick={() => push("/")}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <BackIcon className="cursor-pointer" fontSize="inherit" />
      </div>
      {products && (
        <GridComponent
          data={products}
          setData={setProducts}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={fetchBulkCreateProducts}
        />
      )}
    </div>
  );
}
