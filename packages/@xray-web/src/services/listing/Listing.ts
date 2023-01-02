import {AxiosResponse} from 'axios';
import {ListingService} from './Listing.types';
import {backendAPI} from '../../api/API.axios';
import {
  CreateListingDTO,
  FilterListingDTO,
  Listing,
  UpdateListingDTO,
} from '@xray/types';

export class ListingServiceImplementation implements ListingService {
  async getListings(
    filterListingDTO: FilterListingDTO = {}
  ): Promise<Listing[]> {
    const matchingListings: AxiosResponse<Listing[]> = await backendAPI.get(
      `listings?${new URLSearchParams(filterListingDTO as any).toString()}`
    );
    return matchingListings.data;
  }

  async createListing(createListingDTO: CreateListingDTO): Promise<Listing> {
    const newListing: AxiosResponse<Listing> = await backendAPI.post(
      'listings',
      createListingDTO
    );
    return newListing.data;
  }

  async getListingByID(listingID: number): Promise<Listing> {
    const matchingListing: AxiosResponse<Listing> = await backendAPI.get(
      `listings/${listingID}`
    );
    return matchingListing.data;
  }

  async updateListingByID(
    listingID: number,
    updateListingDTO: UpdateListingDTO
  ): Promise<void> {
    await backendAPI.patch(`listings/${listingID}`, updateListingDTO);
  }

  async deleteListingByID(listingID: number): Promise<void> {
    await backendAPI.delete(`listings/${listingID}`);
  }
}
