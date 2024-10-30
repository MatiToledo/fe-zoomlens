import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { StockCentral } from "@/types/models";
import { UUID } from "crypto";

export async function fetchStockCentralsByBranchIdAndDateIncludedProducts(
  url: string
): Promise<
  { id: UUID | null; ProductName: string; ProductId: UUID; initial: number }[]
> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchUpdateStockCentral(
  body: Partial<StockCentral>
): Promise<StockCentral> {
  const res = await fetchApiPut("/stock/central", body);
  return res.data;
}

export async function fetchBulkCreateStockCentral(body: {
  items: Partial<StockCentral>[];
}): Promise<StockCentral[]> {
  body.items = body.items.map((item) => {
    return {
      id: item.id,
      month: item.month,
      week: item.week,
      ProductId: item.ProductId,
      initial: item.initial,
    };
  });
  const res = await fetchApiPost("/stock/central/bulk", body);
  return res.data;
}

export async function fetchAllStockCentrals(
  url: string
): Promise<{ rows: StockCentral[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchEditStockCentral(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/stock/central/${id}`, body);
  return res.data;
}

export async function fetchDeleteStockCentral(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/stock/central/${id}`);
  return res.data;
}
