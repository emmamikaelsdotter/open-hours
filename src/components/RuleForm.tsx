import React, { useState } from 'react';
import { Weekdays } from '../models/weekdays';
import type { Rule } from '../models/rule';
import { getRuleFactory } from '../models/rule';

// Props for the RuleForm component
interface RuleFormProps {
  onAddRule: (rule: Rule<any>) => void; // Function to add a new rule
  onUpdateRule: (index: number, rule: Rule<any>) => void; // Function to update an existing rule
  rules: Rule<any>[]; // Current list of rules (for console logging)
  editingRule?: { rule: Rule<any>; index: number } | null; // Currently editing rule and its index
  onCancelEdit: () => void; // Function to cancel editing mode
}

// Form component for creating and editing open hours rules
export const RuleForm: React.FC<RuleFormProps> = ({ onAddRule, onUpdateRule, rules, editingRule, onCancelEdit }) => {
  // Form state - holds all input values
  const [formData, setFormData] = useState({
    startDate: '', // Date when rule starts (YYYY-MM-DD)
    endDate: '', // Date when rule ends (YYYY-MM-DD)
    startTime: '', // Opening time (HH:MM)
    endTime: '', // Closing time (HH:MM)
    weekdays: Weekdays.All, // Which days of the week (bit flags)
    state: true, // true = open, false = closed
    payload: '' // Optional extra data (like pricing info)
  });

  // Populate form with existing rule data when editing
  React.useEffect(() => {
    if (editingRule) {
      const rule = editingRule.rule;
      setFormData({
        startDate: rule.startDate.toISOString().split('T')[0], // Convert Date to YYYY-MM-DD
        endDate: rule.endDate.toISOString().split('T')[0],     // Convert Date to YYYY-MM-DD
        startTime: rule.startTime.toTimeString().slice(0, 5),  // Convert Date to HH:MM
        endTime: rule.endTime.toTimeString().slice(0, 5),      // Convert Date to HH:MM
        weekdays: rule.weekdays,                               // Keep as number
        state: rule.state,                                     // Keep as boolean
        payload: rule.payload || ''                            // Keep as string or empty
      });
    } else {
      // Reset form when not editing
      setFormData({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        weekdays: Weekdays.All,
        state: true,
        payload: ''
      });
    }
  }, [editingRule]);

  // Handles changes to form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox (open/closed state)
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'weekdays') {
      // Handle weekday selection (convert string to number)
      setFormData(prev => ({ ...prev, weekdays: parseInt(value) }));
    } else {
      // Handle text inputs (dates, times, payload)
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  // Handles form submission - creates and adds new rule or updates existing rule
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use factory pattern to create rule
    const ruleFactory = getRuleFactory<any>();
    const ruleData = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: `2000-01-01T${formData.startTime}:00`, // Add dummy date for time-only value
      endTime: `2000-01-01T${formData.endTime}:00`,     // Add dummy date for time-only value
      weekdays: formData.weekdays,
      state: formData.state,
      payload: formData.payload || undefined
    };
    
    // Create the rule using factory pattern
    const rule = ruleFactory.make(ruleData);

    if (editingRule) {
      // Update existing rule
      onUpdateRule(editingRule.index, rule);
    } else {
      // Add new rule
      onAddRule(rule);
      
      // Create the new rules array with the new rule added
      const newRules = [...rules, rule];
      
      // Convert rules to console-friendly format for debugging
      const exportedRules = newRules.map(rule => {
        // Helper function to convert weekday numbers to readable names
        const getWeekdayName = (weekdays: number) => {
          const weekdayMap: { [key: number]: string } = {
            [Weekdays.Sunday]: 'Weekdays.Sunday',
            [Weekdays.Monday]: 'Weekdays.Monday', 
            [Weekdays.Tuesday]: 'Weekdays.Tuesday',
            [Weekdays.Wednesday]: 'Weekdays.Wednesday',
            [Weekdays.Thursday]: 'Weekdays.Thursday',
            [Weekdays.Friday]: 'Weekdays.Friday',
            [Weekdays.Saturday]: 'Weekdays.Saturday',
            [Weekdays.All]: 'Weekdays.All'
          };
          return weekdayMap[weekdays] || `Weekdays.Unknown(${weekdays})`;
        };

        return {
          startDate: rule.startDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD
          endDate: rule.endDate.toISOString().split('T')[0],     // Convert to YYYY-MM-DD
          startTime: rule.startTime.toTimeString().slice(0, 8),  // Convert to HH:MM:SS
          endTime: rule.endTime.toTimeString().slice(0, 8),      // Convert to HH:MM:SS
          weekdays: getWeekdayName(rule.weekdays),
          state: rule.state,
          ...(rule.payload && { payload: rule.payload })
        };
      });

      // Log rules for debugging
      console.log('Exported Rules:', exportedRules);
      console.log('Individual Rules:');
      exportedRules.forEach((rule, index) => {
        console.log(`Rule ${index + 1}:`, rule);
      });
    }
    
    // Reset form to initial state after successful submission
    if (!editingRule) {
      setFormData({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        weekdays: Weekdays.All,
        state: true,
        payload: ''
      });
    }
  };

  // Options for weekday dropdown
  const weekdayOptions = [
    { value: Weekdays.All, label: 'All Days' },
    { value: Weekdays.Monday, label: 'Monday' },
    { value: Weekdays.Tuesday, label: 'Tuesday' },
    { value: Weekdays.Wednesday, label: 'Wednesday' },
    { value: Weekdays.Thursday, label: 'Thursday' },
    { value: Weekdays.Friday, label: 'Friday' },
    { value: Weekdays.Saturday, label: 'Saturday' },
    { value: Weekdays.Sunday, label: 'Sunday' }
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h3>{editingRule ? 'Edit Open Hours' : 'Add Open Hours'}</h3>
      <form onSubmit={handleSubmit}>
        {/* Start Date Input */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>

        {/* End Date Input */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>

        {/* Start Time Input */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>

        {/* End Time Input */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>

        {/* Weekdays Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Weekdays:
            <select
              name="weekdays"
              value={formData.weekdays}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              {weekdayOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Open/Closed Checkbox */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="state"
              checked={formData.state}
              onChange={handleInputChange}
              style={{ marginRight: '10px' }}
            />
            Open (uncheck for closed)
          </label>
        </div>

        {/* Optional Payload Input */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Payload (optional):
            <input
              type="text"
              name="payload"
              value={formData.payload}
              onChange={handleInputChange}
              placeholder="e.g., Special pricing info"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {editingRule ? 'Update' : 'Add'}
          </button>
          
          {editingRule && (
            <button 
              type="button"
              onClick={onCancelEdit}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
