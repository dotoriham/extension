import { useQuery } from 'react-query';
import { getFolderListAPI } from '../lib/api/folder';
import { ReactQueryKey } from '../lib/queryKey';

export default function useFolderListQuery() {
  const query = useQuery(ReactQueryKey.folderList(), () => getFolderListAPI(), {
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return query;
}
