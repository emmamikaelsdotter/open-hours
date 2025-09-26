import type { Rule } from "./rule"
import type { Factory } from "./factory"

// Wrapper function that creates a Rules collection with utility methods
export function Rules<T>(rules: Rule<T>[]) {
  return {
    // Rules are stored in an array where the last rule has the highest priority and the first rule has the lowest priority.
    rules,
    
    // Creates a single rule using the factory pattern
    createRule(ruleFactory: Factory<Rule<T>>, ruleData: any): Rule<T> {
      return ruleFactory.make(ruleData);
    },
    
    // Creates multiple rules from a JSON array using the factory pattern
    createRulesFromJson(ruleFactory: Factory<Rule<T>>, rulesData: any[]): Rule<T>[] {
      return rulesData.map(ruleData => ruleFactory.make(ruleData));
    }
  }
}