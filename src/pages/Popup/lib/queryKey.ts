export enum QueryKey {
  FOLDER_LIST = 'folderList',
}

export const ReactQueryKey = {
  folderList: () => [QueryKey.FOLDER_LIST] as const,
};
