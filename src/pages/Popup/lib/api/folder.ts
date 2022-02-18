import { TreeData } from '@atlaskit/tree';
import client from './client';

export const getFolderListAPI = async () => {
  const response = await client.get<TreeData>(`/api/v1/folder`);
  return response.data;
};
