import { useState } from 'react';
import { RuleForm } from './components/RuleForm';
import { RulesDisplay } from './components/RulesDisplay';
import { WeeklySchedule } from './components/WeeklySchedule';
import type { Rule } from './models/rule';
import { Rules } from './models/rules';

// Main application component that manages open hours rules
function App() {
  // State for managing rules using the Rules wrapper
  const [rulesWrapper, setRulesWrapper] = useState(() => Rules<any>([]));
  // State for tracking which rule is being edited
  const [editingRule, setEditingRule] = useState<{ rule: Rule<any>; index: number } | null>(null);

  // Adds a new rule to the rules collection
  const handleAddRule = (newRule: Rule<any>) => {
    setRulesWrapper(prev => {
      const newRules = [...prev.rules, newRule];
      return Rules(newRules);
    });
  };

  // Updates an existing rule in the rules collection
  const handleUpdateRule = (index: number, updatedRule: Rule<any>) => {
    setRulesWrapper(prev => {
      const newRules = [...prev.rules];
      newRules[index] = updatedRule;
      return Rules(newRules);
    });
    setEditingRule(null); // Exit editing mode
  };

  // Removes a rule from the rules collection by index
  const handleRemoveRule = (index: number) => {
    setRulesWrapper(prev => {
      const newRules = prev.rules.filter((_, i) => i !== index);
      return Rules(newRules);
    });
  };

  // Starts editing a rule by index
  const handleEditRule = (index: number) => {
    const rule = rulesWrapper.rules[index];
    setEditingRule({ rule, index });
  };

  // Cancels editing mode
  const handleCancelEdit = () => {
    setEditingRule(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Application title */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Open Hours
      </h1>
      
      {/* Main content grid - form and rules display side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          {/* Form for adding and editing open hours rules */}
          <RuleForm 
            onAddRule={handleAddRule}
            onUpdateRule={handleUpdateRule}
            rules={rulesWrapper.rules}
            editingRule={editingRule}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div>
          {/* Display current rules with edit and remove functionality */}
          <RulesDisplay 
            rules={rulesWrapper.rules}
            onRemoveRule={handleRemoveRule}
            onEditRule={handleEditRule}
          />
        </div>
      </div>
      
      {/* Weekly schedule view showing effective hours for each day */}
      <div style={{ marginTop: '20px' }}>
        <WeeklySchedule 
          rules={rulesWrapper.rules}
        />
      </div>
    </div>
  );
}

export default App
