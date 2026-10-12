import type { OrderItem } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { INITIAL_ITEM_QUANTITY } from "../../const/lives.const";
import {
  ADD_ITEM_DEFAULT_VALUES,
  addItemSchema,
  type AddItemFormData,
} from "../../schemas/addItem.schema";
import { findKnownItem } from "../../utils/live.utils";

interface UseAddItemFormProps {
  knownItems: Map<string, OrderItem>;
  onAdd: (item: OrderItem) => void;
}

export const useAddItemForm = ({ knownItems, onAdd }: UseAddItemFormProps) => {
  const form = useForm<AddItemFormData>({
    resolver: yupResolver(addItemSchema),
    defaultValues: ADD_ITEM_DEFAULT_VALUES,
  });

  /** Typing a code already used in the live autocompletes the rest of the garment. */
  const handleCodeChange = (code: string) => {
    form.setValue("code", code);
    const known = findKnownItem(knownItems, code);
    if (known) {
      form.setValue("name", known.name);
      form.setValue("color", known.color);
      form.setValue("price", known.price);
    }
    form.clearErrors();
  };

  const onSubmit = form.handleSubmit((data) => {
    onAdd({
      code: data.code,
      name: data.name,
      color: data.color ?? "",
      price: data.price,
      quantity: INITIAL_ITEM_QUANTITY,
    });
    form.reset(ADD_ITEM_DEFAULT_VALUES);
  });

  return {
    form,
    onSubmit,
    handleCodeChange,
    hasErrors: Object.keys(form.formState.errors).length > 0,
  };
};
