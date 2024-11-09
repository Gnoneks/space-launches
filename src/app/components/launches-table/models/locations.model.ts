export interface LocationsList {
  count: number;
  next: string;
  previous: string;
  results: Location[];
}

export interface Location {
  id: number;
  url: string;
  name: string;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  total_landing_count: number;
}
