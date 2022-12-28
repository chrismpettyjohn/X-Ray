import {FilterListingDTO, Listing} from '@xray/types';
import {createFetchHook} from '../fetch-hook.base';
import {listingService} from '../../services/listing';

export function useFetchListings(
  filterListingDTO?: FilterListingDTO,
  refresh = 0
): Listing[] | undefined {
  return createFetchHook(
    () => listingService.getListings(filterListingDTO),
    JSON.stringify(filterListingDTO) + refresh
  );
}
