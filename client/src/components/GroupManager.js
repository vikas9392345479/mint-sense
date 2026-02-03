import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupManager = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [participants, setParticipants] = useState(['', '', '']); // Max 3

  useEffect(() => { fetchGroups(); }, []);

  const fetchGroups = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/groups', {
      headers: { 'x-auth-token': token }
    });
    setGroups(res.data);
  };

  const createGroup = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // Filter out empty participant names
    const filteredParticipants = participants.filter(p => p.trim() !== '');
    
    try {
      await axios.post('http://localhost:5000/api/groups', 
        { name: groupName, participants: filteredParticipants },
        { headers: { 'x-auth-token': token } }
      );
      setGroupName('');
      setParticipants(['', '', '']);
      fetchGroups();
    } catch (err) {
      alert("Error creating group. Max 3 participants.");
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f4f7f6', borderRadius: '8px' }}>
      <h3>Step 1: Create a Group</h3>
      <form onSubmit={createGroup}>
        <input 
          type="text" placeholder="Group Name (e.g. MNNIT Roommates)" 
          value={groupName} onChange={e => setGroupName(e.target.value)} required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <p>Add Participants (Max 3):</p>
        {participants.map((p, i) => (
          <input 
            key={i} type="text" placeholder={`Participant ${i + 1}`} 
            value={p} onChange={e => {
              const newP = [...participants];
              newP[i] = e.target.value;
              setParticipants(newP);
            }}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Create Group
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h4>Your Groups:</h4>
        {groups.map(g => (
          <div 
            key={g._id} 
            onClick={() => onGroupSelect(g)}
            style={{ padding: '10px', background: 'white', border: '1px solid #ddd', marginBottom: '5px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <strong>{g.name}</strong> ({g.participants.length} members)
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupManager;