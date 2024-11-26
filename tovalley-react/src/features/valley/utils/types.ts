export interface Place {
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  formatted_address: string
  rating: number
  user_ratings_total: number
}
