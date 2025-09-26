// Enum for weekdays using bit flags for efficient day combinations
export enum Weekdays {
    All = 0b1111111, // 127 in decimal - All days of the week
    Monday = 0b0000001, // 1 - Monday only
    Tuesday = 0b0000010, // 2 - Tuesday only
    Wednesday = 0b0000100, // 4 - Wednesday only
    Thursday = 0b0001000, // 8 - Thursday only
    Friday = 0b0010000, // 16 - Friday only
    Saturday = 0b0100000, // 32 - Saturday only
    Sunday = 0b1000000, // 64 - Sunday only
  }
  