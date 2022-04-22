export enum SortingType {
  new = "new",
  event = "event",
}

export interface IPost {
  event_date: number;
  title: string;
  description: string;
  type: SortingType;
}

export interface IFetchPostsResponse {
  data: IPost[];
}
