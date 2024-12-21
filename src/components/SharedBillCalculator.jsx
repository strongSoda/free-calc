import React, { useState } from 'react';

const SharedBillCalculator = () => {
  const [totalBill, setTotalBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState([
    { name: "Person 1", items: [{ description: "", amount: "" }] }
  ]);

  const addPerson = () => {
    setPeople([...people, { 
      name: `Person ${people.length + 1}`, 
      items: [{ description: "", amount: "" }] 
    }]);
  };

  const addItemToPerson = (personIndex) => {
    const newPeople = [...people];
    newPeople[personIndex].items.push({ description: "", amount: "" });
    setPeople(newPeople);
  };

  const updatePersonName = (index, name) => {
    const newPeople = [...people];
    newPeople[index].name = name;
    setPeople(newPeople);
  };

  const updateItem = (personIndex, itemIndex, field, value) => {
    const newPeople = [...people];
    newPeople[personIndex].items[itemIndex][field] = value;
    setPeople(newPeople);
  };

  const calculatePersonTotal = (personItems) => {
    return personItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const calculateSubtotal = () => {
    return people.reduce((sum, person) => 
      sum + calculatePersonTotal(person.items), 0
    );
  };

  const calculateTip = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (tipPercentage / 100);
  };

  const calculatePersonShare = (personTotal) => {
    const subtotal = calculateSubtotal();
    const tip = calculateTip();
    return personTotal + (tip * (personTotal / subtotal));
  };

  return (
    <div className="space-y-8">
      {/* Tip Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tip Percentage</label>
        <input
          type="number"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          min="0"
          max="100"
        />
      </div>

      {/* People and Their Items */}
      <div className="space-y-6">
        {people.map((person, personIndex) => (
          <div key={personIndex} className="p-4 rounded-lg bg-surface-light-hover dark:bg-surface-dark-hover">
            <input
              type="text"
              value={person.name}
              onChange={(e) => updatePersonName(personIndex, e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            />
            
            {person.items.map((item, itemIndex) => (
              <div key={itemIndex} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(personIndex, itemIndex, "description", e.target.value)}
                  placeholder="Item description"
                  className="px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItem(personIndex, itemIndex, "amount", e.target.value)}
                  placeholder="Amount"
                  className="px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            ))}
            
            <button
              onClick={() => addItemToPerson(personIndex)}
              className="mt-2 px-4 py-2 text-sm rounded-lg bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary transition-colors"
            >
              Add Item
            </button>
          </div>
        ))}
        
        <button
          onClick={addPerson}
          className="w-full px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors"
        >
          Add Person
        </button>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        {people.map((person, index) => {
          const personTotal = calculatePersonTotal(person.items);
          const finalShare = calculatePersonShare(personTotal);
          return (
            <div key={index} className="flex justify-between mb-2">
              <span>{person.name}:</span>
              <span className="font-medium">${finalShare.toFixed(2)}</span>
            </div>
          );
        })}
        <div className="border-t border-gray-200/10 dark:border-gray-800/10 mt-4 pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tip ({tipPercentage}%):</span>
            <span className="font-medium">${calculateTip().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${(calculateSubtotal() + calculateTip()).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedBillCalculator;