import React from 'react';
import type { Rule } from '../models/rule';
import { Weekdays } from '../models/weekdays';

// Props for the WeeklySchedule component
interface WeeklyScheduleProps {
  rules: Rule<any>[]; // Array of rules to display in weekly view
}

// Component that shows the weekly schedule based on open hours rules
export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ rules }) => {
  // Array of weekdays for display
  const weekdays = [
    { name: 'Monday', value: Weekdays.Monday },
    { name: 'Tuesday', value: Weekdays.Tuesday },
    { name: 'Wednesday', value: Weekdays.Wednesday },
    { name: 'Thursday', value: Weekdays.Thursday },
    { name: 'Friday', value: Weekdays.Friday },
    { name: 'Saturday', value: Weekdays.Saturday },
    { name: 'Sunday', value: Weekdays.Sunday }
  ];

  // Helper function to format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  // Helper function to format date as readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get all rules that apply to a specific weekday
  const getRulesForDay = (weekday: number) => {
    return rules.filter(rule => {
      // Check if the rule applies to this weekday using bitwise AND
      return (rule.weekdays & weekday) !== 0;
    }).sort((a, b) => {
      // Sort by rule order (priority) - earlier rules have lower priority
      return rules.indexOf(a) - rules.indexOf(b);
    });
  };

  // Get the effective rule for a day (highest priority rule)
  const getEffectiveRuleForDay = (weekday: number) => {
    const dayRules = getRulesForDay(weekday);
    if (dayRules.length === 0) return null;
    
    // Return the last rule (highest priority) that applies to this day
    return dayRules[dayRules.length - 1];
  };

  // Show empty state if no rules exist
  if (rules.length === 0) {
    return (
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '20px', 
        margin: '10px', 
        borderRadius: '8px',
        textAlign: 'center',
        color: '#666'
      }}>
        <h3>Weekly Schedule</h3>
        <p>No Open Hours defined yet. Add Open Hours to see your weekly schedule.</p>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h3>Weekly Schedule</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Shows the effective opening hours for each day of the week based on the Open Hours added.
      </p>
      
      {/* Weekly schedule grid */}
      <div style={{ display: 'grid', gap: '10px' }}>
        {weekdays.map((day) => {
          const effectiveRule = getEffectiveRuleForDay(day.value);
          const allRules = getRulesForDay(day.value);
          
          return (
            // Individual day card
            <div 
              key={day.value}
              style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '6px',
                backgroundColor: effectiveRule?.state ? '#f8fff8' : '#fff8f8'
              }}
            >
              {/* Day header with status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#333' }}>{day.name}</h4>
                <span style={{ 
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: effectiveRule?.state ? '#d4edda' : '#f8d7da',
                  color: effectiveRule?.state ? '#155724' : '#721c24'
                }}>
                  {effectiveRule?.state ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              
              {/* Rule details or no rules message */}
              {effectiveRule ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '14px' }}>
                  <div>
                    <strong>Time:</strong><br />
                    {formatTime(effectiveRule.startTime)} - {formatTime(effectiveRule.endTime)}
                  </div>
                  <div>
                    <strong>Date Range:</strong><br />
                    {formatDate(effectiveRule.startDate)} - {formatDate(effectiveRule.endDate)}
                  </div>
                  <div>
                    <strong>Priority:</strong><br />
                    #{rules.indexOf(effectiveRule) + 1}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#666', fontStyle: 'italic' }}>
                  No Open Hours defined for this day
                </div>
              )}
              
              {/* Show details if multiple rules exist for this day */}
              {allRules.length > 1 && (
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#666' }}>
                    View all {allRules.length} Open Hours for {day.name}
                  </summary>
                  {/* List of all rules for this day */}
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {allRules.map((rule, index) => (
                      <div key={index} style={{ 
                        marginBottom: '8px', 
                        padding: '8px', 
                        backgroundColor: 'white', 
                        borderRadius: '4px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                          Open Hours #{rules.indexOf(rule) + 1} (Priority: {rules.indexOf(rule) + 1})
                        </div>
                        <div style={{ fontSize: '13px' }}>
                          {formatTime(rule.startTime)} - {formatTime(rule.endTime)} | 
                          {formatDate(rule.startDate)} - {formatDate(rule.endDate)} | 
                          <span style={{ 
                            color: rule.state ? '#28a745' : '#dc3545',
                            fontWeight: 'bold'
                          }}>
                            {rule.state ? 'OPEN' : 'CLOSED'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
