// Factory pattern interface for creating objects from raw data
export interface Factory<T> {
    // Creates an object of type T from raw JSON data
    make(json: any): T
  }
  