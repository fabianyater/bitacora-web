export type Coordinates = {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherConditions = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherType: string;
  samplingTime: Date;
};

export type HabitatDescription = {
  vegetationType: string;
  altitude: number;
  soilType?: string;
  climate?: string;
  notes?: string;
};

export type SamplingSiteImage = {
  url: string;
  description?: string;
  takenAt: Date;
  photographer?: string;
};

export type CollectedSpecies = {
  scientificName?: string;
  commonName: string;
  family?: string;
  sampleQuantity: number;
  plantStatus: string;
  photos: File[];
};

export interface ILogBook {
  _id: string;
  title: string;
  date: Date;
  location: Coordinates;
  weather: WeatherConditions;
  habitat: HabitatDescription;
  images: SamplingSiteImage[];
  collectedSpecies: CollectedSpecies[];
  additionalObservations: string;
}

export interface LogbookRequest {
  title: string;
  date: Date;
  location: Coordinates;
  weather: WeatherConditions;
  habitat: HabitatDescription;
  images: SamplingSiteImage[];
  collectedSpecies: CollectedSpecies[];
  additionalObservations: string;
}

export interface SearchCriterias {
  title: string;
  date: string;
  latitude: number;
  longitude: number;
  species: string;
  order: string;
}
