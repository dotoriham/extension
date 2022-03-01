import { ItemId } from '@atlaskit/tree';

export interface ICreateFolderRequest {
  parentId: ItemId;
  name: string;
  index: number;
}

export interface ICreateFolderResponse {
  folderId: number;
}
