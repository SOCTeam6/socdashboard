'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Terminal, Network, HardDrive, Settings, CheckCircle, Send, Clock, Eye } from 'lucide-react';

export default function EDRDashboard() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [endpoints] = useState([
    { id: 'EP001', name: 'WS-SALES-01', ip: '192.168.1.45', os: 'Windows 10', status: 'active', risk: 'high' },
    { id: 'EP002', name: 'WS-HR-02', ip: '192.168.1.67', os: 'Windows 11', status: 'active', risk: 'low' },
    { id: 'EP003', name: 'SRV-WEB-01', ip: '10.0.2.15', os: 'Ubuntu 22.04', status: 'active', risk: 'medium' },
    { id: 'EP004', name: 'WS-DEV-03', ip: '192.168.1.89', os: 'macOS 14', status: 'isolated', risk: 'critical' },
  ]);
  const [filter, setFilter] = useState('all');
  const [siemEndpoint, setSiemEndpoint] = useState('https://websocnov-siem.vercel.app/api/alerts');
  const [showSettings, setShowSettings] = useState(false);

  const generateAlert = () => {
    const alertTypes = [
      {
        type: 'Suspicious Process',
        severity: 'high',
        description: 'powershell.exe spawned from winword.exe with encoded command',
        endpoint: 'WS-SALES-01',
        indicators: ['Process: powershell.exe', 'Parent: winword.exe', 'Command: -encodedCommand', 'User: john.smith'],
        mitre: 'T1059.001 - PowerShell'
      },
      {
        type: 'File Modification',
        severity: 'medium',
        description: 'Suspicious registry modification in Run key',
        endpoint: 'WS-HR-02',
        indicators: ['Path: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', 'Value: malware.exe', 'Process: svchost.exe'],
        mitre: 'T1547.001 - Registry Run Keys'
      },
      {
        type: 'Network Connection',
        severity: 'critical',
        description: 'Outbound connection to known C2 infrastructure',
        endpoint: 'SRV-WEB-01',
        indicators: ['Destination: 185.220.101.45:443', 'Process: apache2', 'Protocol: HTTPS', 'Bytes Out: 2.4MB'],
        mitre: 'T1071.001 - Web Protocols'
      },
      {
        type: 'Persistence Mechanism',
        severity: 'high',
        description: 'Scheduled task created with system privileges',
        endpoint: 'WS-DEV-03',
        indicators: ['Task: SystemUpdate', 'Trigger: Daily 02:00', 'Action: C:\\Temp\\update.bat', 'User: SYSTEM'],
        mitre: 'T1053.005 - Scheduled Task'
      },
      {
        type: 'Credential Access',
        severity: 'critical',
        description: 'LSASS memory dump detected',
        endpoint: 'WS-SALES-01',
        indicators: ['Process: rundll32.exe', 'Target: lsass.exe', 'Action: MiniDumpWriteDump', 'File: lsass.dmp'],
        mitre: 'T1003.001 - LSASS Memory'
      }
    ];

    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const newAlert = {
      id: `ALR-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'new',
      ...alert
    };

    setAlerts(prev => [newAlert, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(generateAlert, 8000);
    for (let i = 0; i < 3; i++) {
      setTimeout(generateAlert, i * 1000);
    }
    return () => clearInterval(interval);
  }, []);

  const handleTriage = (alertId: string, action: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: action } : alert
    ));

    const alert = alerts.find(a => a.id === alertId);
    
    if (action === 'escalated' && siemEndpoint) {
      fetch(siemEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'EDR-Wazuh',
          alert: alert,
          escalated_at: new Date().toISOString(),
          analyst: 'Tier1-EDR'
        })
      }).catch(err => console.log('SIEM endpoint not available'));
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.status === filter);

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[severity] || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-purple-100 text-purple-800',
      investigating: 'bg-blue-100 text-blue-800',
      escalated: 'bg-red-100 text-red-800',
      'false-positive': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Wazuh EDR Dashboard</h1>
            <p className="text-gray-400">Tier 1 Analyst - Endpoint Detection & Response</p>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {showSettings && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Network className="w-5 h-5" />
              SIEM Integration Settings
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter SIEM Webhook URL"
                value={siemEndpoint}
                onChange={(e) => setSiemEndpoint(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Escalated alerts will be sent to this SIEM endpoint automatically
            </p>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Alerts</p>
              <p className="text-2xl font-bold">{alerts.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">New Alerts</p>
              <p className="text-2xl font-bold">{alerts.filter(a => a.status === 'new').length}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Escalated</p>
              <p className="text-2xl font-bold">{alerts.filter(a => a.status === 'escalated').length}</p>
            </div>
            <Send className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Endpoints</p>
              <p className="text-2xl font-bold">{endpoints.filter(e => e.status === 'active').length}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              EDR Alerts
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('new')}
                className={`px-3 py-1 rounded-lg text-sm ${filter === 'new' ? 'bg-purple-600' : 'bg-gray-700'}`}
              >
                New
              </button>
              <button 
                onClick={() => setFilter('escalated')}
                className={`px-3 py-1 rounded-lg text-sm ${filter === 'escalated' ? 'bg-red-600' : 'bg-gray-700'}`}
              >
                Escalated
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No alerts to display</p>
            ) : (
              filteredAlerts.map(alert => (
                <div 
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 cursor-pointer transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(alert.status)}`}>
                          {alert.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{alert.type}</h3>
                      <p className="text-sm text-gray-300">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Terminal className="w-4 h-4" />
                      {alert.endpoint}
                    </span>
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Alert Details & Triage */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-500" />
            Alert Details
          </h2>

          {selectedAlert ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedAlert.type}</h3>
                <p className="text-sm text-gray-300 mb-3">{selectedAlert.description}</p>
                
                <div className="bg-gray-900 p-3 rounded-lg mb-3">
                  <p className="text-xs font-semibold text-gray-400 mb-2">MITRE ATT&CK</p>
                  <p className="text-sm text-blue-400">{selectedAlert.mitre}</p>
                </div>

                <div className="bg-gray-900 p-3 rounded-lg mb-3">
                  <p className="text-xs font-semibold text-gray-400 mb-2">Indicators</p>
                  {selectedAlert.indicators.map((ind: string, i: number) => (
                    <p key={i} className="text-sm font-mono text-green-400">{ind}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Triage Actions</p>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleTriage(selectedAlert.id, 'investigating')}
                    className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Mark Investigating
                  </button>
                  <button 
                    onClick={() => handleTriage(selectedAlert.id, 'escalated')}
                    className="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Escalate to SIEM
                  </button>
                  <button 
                    onClick={() => handleTriage(selectedAlert.id, 'false-positive')}
                    className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    False Positive
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Select an alert to view details</p>
          )}
        </div>
      </div>

      {/* Endpoints Status */}
      <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-green-500" />
          Monitored Endpoints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {endpoints.map(endpoint => (
            <div key={endpoint.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{endpoint.name}</h3>
                <span className={`w-3 h-3 rounded-full ${endpoint.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
              <p className="text-sm text-gray-400">{endpoint.ip}</p>
              <p className="text-sm text-gray-400">{endpoint.os}</p>
              <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${getSeverityColor(endpoint.risk)}`}>
                {endpoint.risk.toUpperCase()} RISK
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
