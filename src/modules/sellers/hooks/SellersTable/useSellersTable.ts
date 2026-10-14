import { useTradesQuery, useSellersQuery } from "@/DAL";
import type { DeliveryType, Department } from "@/types";
import { useMemo, useState } from "react";
import { useSellersQueryParams } from "../SellersFilters/useSellersQueryParams";
import { useSellerDelete } from "./useSellerDelete";

export interface SellerRow {
  id: string;
  fullName: string;
  account: string;
  phone: string;
  address: string;
  department: Department | null;
  deliveryType: DeliveryType | null;
  /** Sellers with trades are kept to preserve the trades history. */
  canDelete: boolean;
}

export const useSellersTable = () => {
  const { params, hasActiveFilters } = useSellersQueryParams();
  const { data: sellers = [], isLoading, isPlaceholderData } = useSellersQuery(params);
  // The delete guard always counts every trade of the store, never filtered ones.
  const { data: trades = [] } = useTradesQuery();
  const [editingSellerId, setEditingSellerId] = useState<string | null>(null);
  const { requestDelete } = useSellerDelete();

  const records = useMemo<SellerRow[]>(() => {
    // Any trade is history that blocks deleting the seller.
    const sellersWithHistory = new Set(trades.map((trade) => trade.sellerId));
    return sellers.map((seller) => ({
      id: seller.id,
      fullName: seller.fullName,
      account: seller.account,
      phone: seller.phone,
      address: seller.address,
      department: seller.department,
      deliveryType: seller.deliveryType,
      canDelete: !sellersWithHistory.has(seller.id),
    }));
  }, [sellers, trades]);

  return {
    records,
    // Placeholder data means the rows still belong to the previous filters.
    isLoading: isLoading || isPlaceholderData,
    hasActiveFilters,
    editingSeller: sellers.find((seller) => seller.id === editingSellerId) ?? null,
    openEdit: setEditingSellerId,
    closeEdit: () => setEditingSellerId(null),
    requestDelete,
  };
};
