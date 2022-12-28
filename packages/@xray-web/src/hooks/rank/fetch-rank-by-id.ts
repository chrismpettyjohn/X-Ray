import {PermissionGroup} from '@xray/types';
import {useEffect, useState} from 'react';
import {permissionGroupService} from '../../services/permission-group';

export function useFetchRankByID(rankID: string): PermissionGroup | undefined {
  const [rank, setRank] = useState<PermissionGroup>();

  useEffect(() => {
    setRank(undefined);
    async function fetchRank() {
      const rankData = await permissionGroupService.getByID(rankID);
      setRank(rankData);
    }

    fetchRank();
  }, [rankID]);

  return rank;
}
