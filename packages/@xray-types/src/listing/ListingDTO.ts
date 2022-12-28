export interface CreateListingDTO {
  title: string;
  content: string;
  price: string;
  thumbnailMediaID: number;
  imageIDs: number[];
}

export type UpdateListingDTO = Partial<CreateListingDTO>;

export interface FilterListingDTO {
  userID?: number;
  postalCode?: string;
  textContains?: string;
}
