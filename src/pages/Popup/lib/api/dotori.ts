import { ItemId } from '@atlaskit/tree';
import { MetaData } from '../utils/metaHelper';
import client from './client';

export const createDotoriAPI = async (meta: MetaData, folderId: ItemId) => {
  const response = await client.post(`/api/v1/bookmark/${folderId}`, {
    title: meta.title,
    url: meta.url,
    description: meta.description,
    image: meta.image,
    remind: true,
  });

  return response.data;
};
