export enum SearchingType {
  new = "new",
  event = "event",
}

export interface IPost {
  event_date: number;
  title: string;
  description: string;
  type: SearchingType;
}

export interface IFetchPostsResponse {
  data: IPost[];
}
