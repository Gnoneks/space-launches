export interface Launch {
  id: string;
  name: string;
  window_start: string;
  status: {
    id: number;
    name: string;
    description: string;
  };
  pad: {
    id: number;
    name: string;
    location: {
      id: number;
      name: string;
    };
  };
}