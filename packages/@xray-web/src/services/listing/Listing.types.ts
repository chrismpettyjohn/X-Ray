import {
  CreateListingDTO,
  FilterListingDTO,
  Listing,
  UpdateListingDTO,
} from '@xray/types';

export interface ListingService {
  getListings(filterListingDTO?: FilterListingDTO): Promise<Listing[]>;
  createListing(createListingDTO: CreateListingDTO): Promise<Listing>;
  getListingByID(listingID: number): Promise<Listing>;
  updateListingByID(
    listingID: number,
    updateListingDTO: UpdateListingDTO
  ): Promise<void>;
  deleteListingByID(listingID: number): Promise<void>;
}
