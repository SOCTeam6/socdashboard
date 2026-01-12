'use client';

import { Database } from 'lucide-react';

export default function SIEMPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Database className="w-16 h-16 text-red-500" />
          <div>
            <h1 className="text-4xl font-bold">SIEM Dashboard</h1>
            <p className="text-gray-400">Security Information and Event Management</p>
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4">SIEM Tool Operational</h2>
          <p className="text-gray-400 mb-6">The SIEM dashboard is deployed separately.</p>
          <a href="https://websocnov-siem.vercel.app" target="_blank" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold">
            Open SIEM Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
