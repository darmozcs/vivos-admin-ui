import {
  ClientsPanelContainer,
  LiveHeaderContainer,
  LiveOrdersContainer,
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
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }} order={{ base: 1 }}>
            <ClientsPanelContainer />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xl: 6 }} order={{ base: 2, md: 3, xl: 2 }}>
            {/* Remount per live and client so the editor draft never leaks between orders. */}
            <OrderEditorContainer
              key={`${liveId ?? ""}-${selectedClientId ?? NO_CLIENT_SELECTED_KEY}`}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }} order={{ base: 3, md: 2, xl: 3 }}>
            <LiveOrdersContainer />
          </Grid.Col>
        </Grid>
      </Stack>
    </LiveWorkspaceProvider>
  );
};
