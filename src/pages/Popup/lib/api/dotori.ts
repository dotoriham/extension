import { ItemId } from '@atlaskit/tree';
import { MetaData } from '../utils/metaHelper';
import client from './client';

export const createDotoriAPI = async (
  meta: MetaData,
  remind: boolean,
  folderId: ItemId,
) => {
  const response = await client.post(`/api/v1/bookmark?folderId=${folderId}`, {
    title: meta.title,
    link: meta.link,
    description: meta.description,
    image: meta.image,
    remind,
  });

  return response.data;
};
