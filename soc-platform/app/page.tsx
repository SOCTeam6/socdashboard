'use client';

import { Shield, Activity, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const tools = [
    {
      name: 'EDR',
      path: '/edr',
      description: 'Endpoint Detection & Response',
      status: 'operational',
      role: 'Tier 1 Analyst',
      icon: Activity,
      color: 'blue'
    },
    {
      name: 'SIEM',
      path: '/siem',
      description: 'Security Information & Event Management',
      status: 'operational',
      role: 'Tier 2 Analyst',
      icon: Shield,
      color: 'red'
    },
    {
      name: 'SOAR',
      path: '/soar',
      description: 'Security Orchestration & Automated Response',
      status: 'development',
      role: 'Automation',
      icon: AlertTriangle,
      color: 'purple'
    }
  ];

  const stats = [
    { label: 'Total Alerts', value: '2,847', icon: AlertTriangle, change: '+12%' },
    { label: 'Active Incidents', value: '23', icon: Activity, change: '-5%' },
    { label: 'Endpoints Monitored', value: '456', icon: Shield, change: '+8%' },
    { label: 'Avg Response Time', value: '4.2m', icon: Clock, change: '-15%' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Security Operations Center</h1>
        <p className="text-gray-400">WebSocNov - Unified SOC Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-6 h-6 text-gray-400" />
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* SOC Tools Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SOC Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const colorClasses = {
              blue: 'border-blue-500 hover:border-blue-400',
              red: 'border-red-500 hover:border-red-400',
              purple: 'border-purple-500 hover:border-purple-400'
            };

            return (
              <Link
                key={tool.name}
                href={tool.path}
                className={`bg-gray-800 p-6 rounded-lg border-2 ${colorClasses[tool.color as keyof typeof colorClasses]} transition-all hover:scale-105 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-10 h-10 text-white" />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tool.status === 'operational' 
                      ? 'bg-green-900/30 text-green-400 border border-green-800'
                      : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                  }`}>
                    {tool.status === 'operational' ? 'Operational' : 'In Development'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{tool.description}</p>
                <p className="text-xs text-gray-500">{tool.role}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Team Info */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Team Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Project:</p>
            <p className="font-semibold">SOC Simulation Assignment</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Repository:</p>
            <a href="https://github.com/SOCTeam6/socdashboard" target="_blank" className="text-blue-400 hover:underline">
              github.com/SOCTeam6/socdashboard
            </a>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Deployment:</p>
            <p className="font-semibold">Vercel (Production)</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Status:</p>
            <p className="text-green-400 font-semibold">● Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
