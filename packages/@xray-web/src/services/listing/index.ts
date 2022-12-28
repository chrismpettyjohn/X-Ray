import {ListingService} from './Listing.types';
import {ListingServiceImplementation} from './Listing';

export const listingService: ListingService =
  new ListingServiceImplementation();
