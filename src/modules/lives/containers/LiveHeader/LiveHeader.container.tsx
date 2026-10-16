import { EmptyState } from "@/modules/common/components";
import { Button, Group, Skeleton, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  BackToLivesButton,
  LiveControls,
  LiveTitle,
  PrepareLiveModal,
} from "../../components";
import { useLiveHeader, usePrepareLiveForm } from "../../hooks";

const HEADER_SKELETON_HEIGHT = 64;

export const LiveHeaderContainer = () => {
  const { t } = useTranslation("lives");
  const header = useLiveHeader();
  const prepareForm = usePrepareLiveForm({ onDone: header.closePrepare });

  const prepareModal = (
    <PrepareLiveModal
      opened={header.prepareOpened}
      title={t(header.noCurrentLive ? "prepare.firstTitle" : "prepare.title")}
      onClose={header.closePrepare}
      form={prepareForm.form}
      onSubmit={prepareForm.onSubmit}
      isLoading={prepareForm.isLoading}
      tagOptions={prepareForm.tagOptions}
    />
  );

  if (header.noCurrentLive) {
    return (
      <>
        <EmptyState
          message={t("empty.noCurrentLive")}
          action={<Button onClick={header.openPrepare}>{t("actions.prepareFirst")}</Button>}
        />
        {prepareModal}
      </>
    );
  }

  if (header.notFound) {
    return (
      <EmptyState
        message={t("errors.notFound")}
        action={<Button onClick={header.goBack}>{t("actions.backToLives")}</Button>}
      />
    );
  }

  if (!header.live) {
    return <Skeleton h={HEADER_SKELETON_HEIGHT} radius="lg" />;
  }

  return (
    <Stack gap="xs">
      {header.fromHistory && <BackToLivesButton onClick={header.goBack} />}
      <Group component="header" justify="space-between" align="center" gap="md">
        <LiveTitle
          number={header.live.number}
          title={header.live.title || t("untitled")}
          clock={header.clock}
          subtitle={header.subtitle}
          status={header.live.status}
        />
        <LiveControls
          started={header.started}
          active={header.active}
          canPrepareNext={header.canPrepareNext}
          isRunning={header.isRunning}
          isPending={header.isPending}
          savedLabel={header.savedLabel}
          onStart={header.onStart}
          onToggleRun={header.onToggleRun}
          onEnd={header.onEnd}
          onPrepareNext={header.openPrepare}
        />
        {prepareModal}
      </Group>
    </Stack>
  );
};
