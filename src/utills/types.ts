export type FetchCities = {
  AdministrativeArea: {
    ID: string
    LocalizedName: string
  },
  Country: {
    ID: string
    LocalizedName: string
  },
  Key: string
  LocalizedName: string,
  Rank: number,
  Type: string,
  Version: number,
}

// ----------- weather type
export type WeatherType = {
  EpochTime?: number,
  LocalObservationDateTime: string,
  WeatherIcon: number,
  WeatherText: string,
  Temperature: {
    Imperial?: object,
    Metric: {
      Unit: string,
      Value: number
    },
  }
}

// ---- firecast single type
export type ForecastType = {
  Date: string,
  Day: {
    Icon: number,
    IconPhrase: string,
  },
  Night?: {
    Icon: number,
    IconPhrase: string,
  },
  Temperature: {
    Maximum: {
      Unit: string,
      Value: number
    },
    Minimum: {
      Unit: string,
      Value: number
    }
  }
}