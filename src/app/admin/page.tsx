"use client";

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async (passToUse = password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use encodeURIComponent to handle any special characters in your password
      const res = await fetch(`/api/admin/leads?auth=${encodeURIComponent(passToUse)}`);

      if (res.status === 401) {
        throw new Error("Invalid Password");
      }

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();
      setLeads(data);
      setIsAuthorized(true);
      // Optional: Save to session storage so refresh doesn't log you out immediately
      sessionStorage.setItem('admin_auth', passToUse);
    } catch (err: any) {
      setError(err.message);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-login if session exists
  useEffect(() => {
    const savedPass = sessionStorage.getItem('admin_auth');
    if (savedPass) {
      setPassword(savedPass);
      fetchLeads(savedPass);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading text-text">Admin Access</h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Catering Hub Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-accent transition-all text-center font-bold tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-[10px] text-center font-bold uppercase">{error}</p>}
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-text text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-all"
            >
              {isLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading text-text">Leads Dashboard</h1>
            <button 
              onClick={() => { sessionStorage.clear(); window.location.reload(); }}
              className="text-[9px] uppercase tracking-tighter text-red-400 font-bold hover:text-red-600"
            >
              Logout & Lock
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Leads</p>
              <p className="text-2xl font-heading text-accent">{leads.length}</p>
            </div>
            <button 
              onClick={() => fetchLeads()} 
              className="bg-accent text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] hover:bg-text transition-all"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 font-heading text-xs text-gray-400">Captured On</th>
                <th className="py-4 font-heading text-xs text-gray-400">Lead Contact</th>
                <th className="py-4 font-heading text-xs text-gray-400">File Requested</th>
                <th className="py-4 font-heading text-xs text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <td className="py-6 text-sm text-gray-500">
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN') : 'New'}
                  </td>
                  <td className="py-6 font-bold text-text text-lg">
                    {lead.phone}
                  </td>
                  <td className="py-6 text-[10px] uppercase tracking-widest text-gray-400">
                    {lead.catalog_name || 'Main Catalog'}
                  </td>
                  <td className="py-6 text-right">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="bg-green-50 text-green-700 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[9px] hover:bg-green-600 hover:text-white transition-all inline-block"
                    >
                      Dial Now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}