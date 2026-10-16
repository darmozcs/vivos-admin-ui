import { TAG_DETAIL_PATH, TAGS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs/http";
import type { Tag } from "@/models";
import type { AxiosResponse } from "axios";

/** Name (unique within the store) and hex color "#RRGGBB". */
export interface SaveTagPayload {
  name: string;
  color: string;
}

export const getTagsService = async (): Promise<AxiosResponse<Tag[]>> =>
  await httpClient.get<Tag[]>(TAGS_PATH);

export const createTagService = async (payload: SaveTagPayload): Promise<AxiosResponse<Tag>> =>
  await httpClient.post<Tag>(TAGS_PATH, payload);

export const updateTagService = async ({
  id,
  payload,
}: {
  id: string;
  payload: SaveTagPayload;
}): Promise<AxiosResponse<Tag>> => await httpClient.patch<Tag>(TAG_DETAIL_PATH({ id }), payload);

export const deleteTagService = async (id: string): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(TAG_DETAIL_PATH({ id }));

/** Tag ids as the comma separated query param the API filters by. */
export const toTagIdsParam = (tagIds: string[]) => (tagIds.length > 0 ? tagIds.join(",") : undefined);
