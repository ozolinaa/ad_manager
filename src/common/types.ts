export type IPLocation = {
    city: {
      id: number;
      lat: number;
      lon: number;
      name_en: string;
    };
    region: {
      id: number;
      name_en: string;
    };
    country: {
      id: number;
      name_en: string;
    };
  };


  export type AsyncFunction = (req: any) => Promise<any>; 

export type AsyncOperationsOnly = { [key: symbol]:  AsyncFunction }; 