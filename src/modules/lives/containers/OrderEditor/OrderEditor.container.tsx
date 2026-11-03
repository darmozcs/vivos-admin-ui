import { useTranslation } from "react-i18next";
import {
  AddItemForm,
  LivePanel,
  NoClientSelected,
  OrderEditorHeader,
  OrderItemsTable,
  OrderStatusControls,
  OrderSummary,
  PackageNumberBadge,
  StartLiveHint,
} from "../../components";
import { useOrderEditor, usePackageNumberEditor } from "../../hooks";

export const OrderEditorContainer = () => {
  const { t } = useTranslation("lives");
  const editor = useOrderEditor();
  const packageEditor = usePackageNumberEditor({
    orderId: editor.packageNumber?.orderId ?? null,
    number: editor.packageNumber?.number ?? null,
  });

  if (!editor.client) {
    return (
      <LivePanel emphasis>
        <NoClientSelected />
      </LivePanel>
    );
  }

  return (
    <LivePanel emphasis>
      <OrderEditorHeader
        {...editor.client}
        summary={<OrderSummary units={editor.units} total={editor.total} />}
        packageBadge={
          editor.packageNumber && (
            <PackageNumberBadge
              {...packageEditor}
              label={editor.packageNumber.label}
              liveNumber={editor.packageNumber.liveNumber}
              simplified={editor.simplified}
            />
          )
        }
        statusControls={
          !editor.simplified && (
            <OrderStatusControls
              status={editor.status}
              packageStatus={editor.packageStatus}
              disabled={!editor.started}
              onStatusChange={editor.setStatus}
              onPackageStatusChange={editor.setPackageStatus}
            />
          )
        }
      />
      {!editor.started && <StartLiveHint onStart={editor.onStartLive} />}
      {editor.started && (
        <AddItemForm
          title={editor.ended ? t("addItem.titleEnded") : t("addItem.title")}
          form={editor.addItemForm.form}
          hasErrors={editor.addItemForm.hasErrors}
          simplified={editor.simplified}
          onSubmit={editor.addItemForm.onSubmit}
          onCodeChange={editor.addItemForm.handleCodeChange}
        />
      )}
      <OrderItemsTable
        lines={editor.lines}
        simplified={editor.simplified}
        onFieldChange={editor.updateItemField}
        onIncrement={editor.incrementItem}
        onDecrement={editor.decrementItem}
        onRemove={editor.removeItem}
      />    </LivePanel>
  );
};
