import {Listing} from '@xray/types';
import {createFetchHook} from '../fetch-hook.base';
import {listingService} from '../../services/listing';

export function useFetchListingByID(
  listingID: number,
  refresh = 0
): Listing | undefined {
  return createFetchHook(
    () => listingService.getListingByID(listingID),
    refresh
  );
}
