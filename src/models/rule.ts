import { Weekdays } from "./weekdays"
import type { Factory } from "./factory"

// Type definition for a business hours rule
export type Rule<T> = {
  startDate: Date // YYYY-MM-DD - When the rule becomes active
  endDate: Date // YYYY-MM-DD - When the rule expires
  startTime: Date // HH:MM:SS - Opening time
  endTime: Date // HH:MM:SS - Closing time
  weekdays: Weekdays // See weekdays.ts for bit flags - Which days this applies to
  state: boolean // True if the rule is open, false if the rule is closed
  payload?: T // Optional payload for the rule. In case one would want to store some data with the rule. Like prices for example.
}

// Creates a Rule object from raw JSON data
export function createRule<T>(json: any): Rule<T> {
  return {
    startDate: new Date(json.startDate), // Convert string to Date object
    endDate: new Date(json.endDate),     // Convert string to Date object
    startTime: new Date(json.startTime), // Convert string to Date object
    endTime: new Date(json.endTime),     // Convert string to Date object
    weekdays: json.weekdays,             // Keep as number (bit flags)
    state: json.state,                   // Keep as boolean
    payload: json.payload,               // Keep as-is (optional)
  }
}

// Creates a factory for making Rule objects using the Factory pattern
export function getRuleFactory<T>(): Factory<Rule<T>> {
  return {
    // Factory method that creates a Rule from JSON data
    make(json: any): Rule<T> {
      return createRule<T>(json)
    }
  }
}