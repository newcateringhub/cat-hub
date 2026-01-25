"use client";

import { useState } from 'react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchLeads = async () => {
    const res = await fetch(`/api/admin/leads?auth=${encodeURIComponent(password)}`);
    if (res.ok) {
      const data = await res.json();
      setLeads(data);
      setIsLoggedIn(true);
    } else {
      alert("Invalid Password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-heading mb-6 text-center">Admin Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="w-full p-4 mb-4 border rounded-lg outline-none focus:border-accent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={fetchLeads}
            className="w-full bg-text text-white py-4 rounded-lg font-bold uppercase tracking-widest text-[10px]"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-heading">Lead Dashboard</h1>
          <button onClick={() => window.location.reload()} className="text-[10px] uppercase tracking-widest text-accent font-bold">Log Out</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 font-heading text-sm text-gray-400">Date</th>
                <th className="py-4 font-heading text-sm text-gray-400">Phone Number</th>
                <th className="py-4 font-heading text-sm text-gray-400">Catalog Accessed</th>
                <th className="py-4 font-heading text-sm text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-6 text-sm text-gray-600">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-6 font-bold text-text">
                    {lead.phone}
                  </td>
                  <td className="py-6 text-sm text-gray-500 uppercase tracking-tighter">
                    {lead.catalog_name}
                  </td>
                  <td className="py-6">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-[10px] bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all"
                    >
                      Call Lead
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="text-center py-12 text-gray-400 font-light italic">No leads collected yet.</p>}
        </div>
      </div>
    </div>
  );
}