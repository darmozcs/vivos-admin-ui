import {
  ClientsPanelContainer,
  LiveHeaderContainer,
  LiveStatsContainer,
  OrderEditorContainer,
} from "@/modules/lives/containers";
import { LiveWorkspaceProvider } from "@/modules/lives/contexts";
import { NO_CLIENT_SELECTED_KEY } from "@/modules/lives/const/lives.const";
import { useLiveWorkspaceStore } from "@/store";
import { Grid, Stack } from "@mantine/core";

interface LiveWorkspaceProps {
  /** Live opened from the history; without it the current live is shown. */
  liveId?: string;
}

export const LiveWorkspace = ({ liveId }: LiveWorkspaceProps) => {
  const selectedClientId = useLiveWorkspaceStore((s) => s.selectedClientId);

  return (
    <LiveWorkspaceProvider liveId={liveId}>
      <Stack gap="lg">
        <LiveHeaderContainer />
        <LiveStatsContainer />
        <Grid gap="md" align="flex-start">
          <Grid.Col span={{ base: 12, md: 5, xl: 4 }}>
            <ClientsPanelContainer />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7, xl: 8 }}>
            {/* Remount per live and client so the editor draft never leaks between orders. */}
            <OrderEditorContainer
              key={`${liveId ?? ""}-${selectedClientId ?? NO_CLIENT_SELECTED_KEY}`}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </LiveWorkspaceProvider>
  );
};
