import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Dashboard = ({ selectedGroup }) => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Requirement #7

  // Stable fetch function using useCallback to satisfy ESLint
  const fetchExpenses = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/expenses/${selectedGroup._id}`, {
        headers: { 'x-auth-token': token }
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  }, [selectedGroup._id]);

  useEffect(() => {
    if (selectedGroup) {
      fetchExpenses();
      if (selectedGroup.participants && selectedGroup.participants.length > 0) {
        setPayer(selectedGroup.participants[0].name);
      }
    }
  }, [selectedGroup, fetchExpenses]);

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const participantNames = selectedGroup.participants.map(p => p.name);
      
      const expenseData = {
        groupId: selectedGroup._id,
        description: title,
        amount: Number(amount),
        payerName: payer,
        participants: participantNames,
        splitMode: 'equal'
      };

      await axios.post('http://localhost:5000/api/expenses', expenseData, {
        headers: { 'x-auth-token': token }
      });

      setTitle('');
      setAmount('');
      fetchExpenses();
    } catch (err) {
      alert("Error adding expense");
    }
  };

  // Requirement #5: Balance Engine Logic
  const calculateBalances = () => {
    const balances = {};
    selectedGroup.participants.forEach(p => balances[p.name] = 0);

    expenses.forEach(exp => {
      balances[exp.payer] += exp.amount;
      exp.splits.forEach(split => {
        balances[split.participantName] -= split.share;
      });
    });
    return balances;
  };

  const groupBalances = calculateBalances();

  // Requirement #7: Filter Logic
  const filteredExpenses = expenses.filter(exp => 
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ color: '#1877f2' }}>{selectedGroup.name} Dashboard</h2>

      {/* Requirement #6: Visual Balance Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        {Object.entries(groupBalances).map(([name, bal]) => (
          <div key={name} style={{ 
            padding: '10px', borderRadius: '5px', border: '1px solid #ddd',
            background: bal >= 0 ? '#f0fff4' : '#fff5f5' 
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{name}</div>
            <div style={{ color: bal >= 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
              {bal >= 0 ? `+₹${bal.toFixed(2)}` : `-₹${Math.abs(bal).toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>

      {/* Expense Form */}
      <form onSubmit={addExpense} style={{ background: '#fff', border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="What was it for?" value={title} onChange={e => setTitle(e.target.value)} required style={{flex: '2', padding: '10px'}} />
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required style={{flex: '1', padding: '10px'}} />
          <select value={payer} onChange={e => setPayer(e.target.value)} style={{flex: '1', padding: '10px'}}>
            {selectedGroup.participants.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
          </select>
          <button type="submit" style={{ width: '100%', background: '#1877f2', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Add Expense</button>
        </div>
      </form>

      {/* Requirement #7: Search Bar */}
      <input 
        type="text" 
        placeholder="🔍 Search transactions..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
      />

      {/* Transaction History */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredExpenses.map(exp => (
          <div key={exp._id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{exp.description}</strong>
              <div style={{ fontSize: '11px', color: '#777' }}>Paid by {exp.payer}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#28a745', fontWeight: 'bold' }}>₹{exp.amount}</div>
              <div style={{ fontSize: '10px' }}>₹{(exp.amount / selectedGroup.participants.length).toFixed(2)} per person</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;