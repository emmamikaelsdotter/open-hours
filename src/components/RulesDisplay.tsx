import React from 'react';
import { Weekdays } from '../models/weekdays';
import type { Rule } from '../models/rule';

// Props for the RulesDisplay component
interface RulesDisplayProps {
  rules: Rule<any>[]; // Array of rules to display
  onRemoveRule: (index: number) => void; // Function to remove a rule by index
  onEditRule: (index: number) => void; // Function to edit a rule by index
}

// Component that displays the list of current open hours rules
export const RulesDisplay: React.FC<RulesDisplayProps> = ({ rules, onRemoveRule, onEditRule }) => {
  // Helper function to convert weekday numbers to readable names
  const getWeekdayName = (weekdays: number) => {
    const weekdayMap: { [key: number]: string } = {
      [Weekdays.Sunday]: 'Sunday',
      [Weekdays.Monday]: 'Monday', 
      [Weekdays.Tuesday]: 'Tuesday',
      [Weekdays.Wednesday]: 'Wednesday',
      [Weekdays.Thursday]: 'Thursday',
      [Weekdays.Friday]: 'Friday',
      [Weekdays.Saturday]: 'Saturday',
      [Weekdays.All]: 'All Days'
    };
    return weekdayMap[weekdays] || 'Multiple days';
  };

  // Helper function to format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  // Helper function to format date as readable string
  const formatDate = (date: Date) => {
    return date.toDateString();
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
        <h3>Current Open Hours</h3>
        <p>No Open Hours added yet. Add Open Hours using the form.</p>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h3>Current Open Hours ({rules.length})</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Open Hours are processed in order. When multiple hours apply to the same time period, the most recently added hours take priority.
      </p>
      
      {/* List of rules */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {rules.map((rule, index) => (
          // Individual rule card
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
              position: 'relative'
            }}
          >
            {/* Priority indicator */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px',
              fontSize: '12px',
              color: '#666'
            }}>
              Priority: {index + 1}
            </div>
            
            {/* Rule details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <strong>Date Range:</strong><br />
                {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
              </div>
              <div>
                <strong>Time Range:</strong><br />
                {formatTime(rule.startTime)} - {formatTime(rule.endTime)}
              </div>
            </div>
            
            {/* Days and status grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <strong>Days:</strong><br />
                {getWeekdayName(rule.weekdays)}
              </div>
              <div>
                <strong>Status:</strong><br />
                <span style={{ 
                  color: rule.state ? '#28a745' : '#dc3545',
                  fontWeight: 'bold'
                }}>
                  {rule.state ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>
            
            {/* Optional payload display */}
            {rule.payload && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Payload:</strong><br />
                <span style={{ 
                  backgroundColor: '#e9ecef', 
                  padding: '2px 6px', 
                  borderRadius: '3px',
                  fontSize: '14px'
                }}>
                  {rule.payload}
                </span>
              </div>
            )}
            
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => onEditRule(index)}
                style={{ 
                  padding: '5px 10px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Edit
              </button>
              <button 
                onClick={() => onRemoveRule(index)}
                style={{ 
                  padding: '5px 10px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
