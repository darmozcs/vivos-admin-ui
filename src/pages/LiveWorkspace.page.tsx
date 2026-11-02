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
  // Remount per live and client so the editor draft never leaks between orders.
  const orderEditor = (
    <OrderEditorContainer
      key={`${liveId ?? ""}-${selectedClientId ?? NO_CLIENT_SELECTED_KEY}`}
    />
  );

  return (
    <LiveWorkspaceProvider liveId={liveId}>
      <Stack gap="lg">
        <LiveHeaderContainer />
        <LiveStatsContainer />
        {liveId ? (
          <Grid gap="md" align="flex-start">
            <Grid.Col span={{ base: 12, md: 6, xl: 3 }} order={{ base: 1 }}>
              <ClientsPanelContainer />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xl: 6 }} order={{ base: 2, md: 3, xl: 2 }}>
              {orderEditor}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, xl: 3 }} order={{ base: 3, md: 2, xl: 3 }}>
              <LiveOrdersContainer />
            </Grid.Col>
          </Grid>
        ) : (
          // "Comenzar vivo" is the simplified workspace: no purchases column.
          <Grid gap="md" align="flex-start">
            <Grid.Col span={{ base: 12, md: 5, xl: 4 }}>
              <ClientsPanelContainer />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7, xl: 8 }}>{orderEditor}</Grid.Col>
          </Grid>
        )}
      </Stack>
    </LiveWorkspaceProvider>
  );
};
