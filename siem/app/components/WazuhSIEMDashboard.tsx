"use client";

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, FileText, Search, Filter, TrendingUp, Database, Network, Lock, Cloud, Server, Terminal, Eye, CheckCircle, XCircle, AlertOctagon, Clock, ArrowUpRight, BarChart3, Layers, GitBranch, Target, Zap } from 'lucide-react';

interface  Alert {
  id: string;
  timestamp: string;
  severity: string;
  source: string;
  category: string;
  description: string;
  mitre: string;
  status: string;
  correlated_events: number;
}

interface Log {
  id: number;
  timestamp: string;
  level: string;
  source: string;
  message: string;
  host: string;
}

interface Incident {
  id: string;
  title: string;
  severity: string;
  status: string;
  created: string;
  assigned_to: string;
  alerts_count: number;
  affected_hosts: string[];
}

interface Correlation {
  id: string;
  name: string;
  confidence: number;
  events: number;
  timespan: string;
  pattern: string;
  severity: string;
}
// Sample MITRE ATT&CK techniques
const mitreTechniques = {
  'T1110': 'Brute Force',
  'T1078': 'Valid Accounts',
  'T1021': 'Remote Services',
  'T1059': 'Command and Scripting Interpreter',
  'T1071': 'Application Layer Protocol',
  'T1003': 'OS Credential Dumping',
  'T1087': 'Account Discovery',
  'T1083': 'File and Directory Discovery'
};

// Sample threat intelligence IOCs
const threatIntel = [
  { ioc: '192.168.1.100', type: 'IP', threat_score: 85, category: 'C2 Server', last_seen: '2min ago' },
  { ioc: 'evil.powershell.exe', type: 'File Hash', threat_score: 92, category: 'Malware', last_seen: '5min ago' },
  { ioc: 'malicious-domain.com', type: 'Domain', threat_score: 78, category: 'Phishing', last_seen: '15min ago' }
];

const WazuhSIEMDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [correlations, setCorrelations] = useState<Correlation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    setIsMounted(true);
    
    const initialAlerts = [
      {
        id: 'ALT-001',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        severity: 'critical',
        source: 'EDR-Agent-01',
        category: 'Malware Detection',
        description: 'Ransomware execution detected on WORKSTATION-05',
        mitre: 'T1486',
        status: 'active',
        correlated_events: 3
      },
      {
        id: 'ALT-002',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        severity: 'high',
        source: 'Network-IDS',
        category: 'Lateral Movement',
        description: 'Multiple RDP connections from compromised host',
        mitre: 'T1021',
        status: 'investigating',
        correlated_events: 5
      },
      {
        id: 'ALT-003',
        timestamp: new Date(Date.now() - 450000).toISOString(),
        severity: 'medium',
        source: 'Identity-Monitor',
        category: 'Brute Force Attack',
        description: '15 failed login attempts detected for admin account',
        mitre: 'T1110',
        status: 'active',
        correlated_events: 2
      }
    ];

    const initialLogs = [
      { id: 1, timestamp: new Date().toISOString(), level: 'ERROR', source: 'Windows-Security', message: 'Failed login attempt for user: admin from 192.168.1.100', host: 'DC-01' },
      { id: 2, timestamp: new Date(Date.now() - 30000).toISOString(), level: 'WARNING', source: 'Firewall', message: 'Outbound connection blocked to known C2 server', host: 'FW-01' },
      { id: 3, timestamp: new Date(Date.now() - 60000).toISOString(), level: 'INFO', source: 'EDR-Agent', message: 'Process monitoring started on endpoint', host: 'WKS-05' }
    ];

    const initialIncidents = [
      {
        id: 'INC-2025-001',
        title: 'Ransomware Outbreak - WORKSTATION-05',
        severity: 'critical',
        status: 'active',
        created: new Date(Date.now() - 120000).toISOString(),
        assigned_to: 'Tier 2 Analyst',
        alerts_count: 3,
        affected_hosts: ['WORKSTATION-05', 'FILE-SERVER-02']
      }
    ];

    const initialCorrelations = [
      {
        id: 'CORR-001',
        name: 'Credential Stuffing Campaign',
        confidence: 89,
        events: 12,
        timespan: '15 minutes',
        pattern: 'Multiple failed logins → Successful login → Privilege escalation',
        severity: 'high'
      }
    ];

    setAlerts(initialAlerts);
    setLogs(initialLogs);
    setIncidents(initialIncidents);
    setCorrelations(initialCorrelations);
  }, []);

  // Simulate real-time log streaming
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const sources = ['Windows-Security', 'Firewall', 'EDR-Agent', 'Network-IDS', 'Proxy', 'DNS-Server'];
      const levels = ['INFO', 'WARNING', 'ERROR'];
      const messages = [
        'User authentication successful',
        'Network connection established',
        'File access denied',
        'Suspicious process detected',
        'Port scan detected from external IP',
        'SSL certificate validation failed'
      ];

      const newLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        level: levels[Math.floor(Math.random() * levels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        host: `HOST-${Math.floor(Math.random() * 20) + 1}`
      };

      setLogs(prev => [newLog, ...prev].slice(0, 100));
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch(level) {
      case 'ERROR': return 'text-red-400';
      case 'WARNING': return 'text-yellow-400';
      case 'INFO': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesSearch = !searchQuery || 
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const escalateToSOAR = (alert: Alert | Incident) => {
    window.alert('Incident escalated to SOAR system for automated response playbook execution.');
  };

  const createIncident = (alert: Alert) => {
    const newIncident = {
      id: `INC-2025-${String(incidents.length + 1).padStart(3, '0')}`,
      title: alert.description,
      severity: alert.severity,
      status: 'active',
      created: new Date().toISOString(),
      assigned_to: 'Tier 2 Analyst',
      alerts_count: 1,
      affected_hosts: [alert.source]
    };
    setIncidents([newIncident, ...incidents]);
    window.alert('Incident created successfully');
  };
if (!isMounted) {
    return <div className="min-h-screen bg-slate-950"></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Wazuh SIEM Platform</h1>
              <p className="text-gray-400">Tier 2 Security Analysis & Incident Response</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-400">Operational</span>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Active Alerts</div>
              <div className="text-2xl font-bold text-white">{alerts.filter(a => a.status === 'active').length}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mt-6 border-b border-slate-700">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'alerts', label: 'Alert Inbox', icon: AlertTriangle },
            { id: 'logs', label: 'Log Viewer', icon: FileText },
            { id: 'correlation', label: 'Correlation Engine', icon: GitBranch },
            { id: 'incidents', label: 'Incidents', icon: AlertOctagon },
            { id: 'threat-intel', label: 'Threat Intel', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Dashboard */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Critical Alerts', value: alerts.filter(a => a.severity === 'critical').length, icon: AlertOctagon, color: 'red' },
              { label: 'Active Incidents', value: incidents.filter(i => i.status === 'active').length, icon: Shield, color: 'orange' },
              { label: 'Correlated Events', value: correlations.reduce((sum, c) => sum + c.events, 0), icon: GitBranch, color: 'blue' },
              { label: 'Events/Min', value: '847', icon: Activity, color: 'green' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                    <div className="text-3xl font-bold text-white mt-1">{stat.value}</div>
                  </div>
                  <div className={`bg-${stat.color}-500/10 p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                Recent Critical Alerts
              </h3>
              <div className="space-y-3">
                {alerts.filter(a => a.severity === 'critical').slice(0, 3).map(alert => (
                  <div key={alert.id} className="bg-slate-900/50 border border-red-500/30 rounded p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-white">{alert.description}</div>
                        <div className="text-sm text-gray-400 mt-1">{alert.source} • {alert.id}</div>
                      </div>
                      <span className="px-2 py-1 text-xs rounded bg-red-500/10 text-red-400 border border-red-500/30">
                        CRITICAL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <GitBranch className="w-5 h-5 mr-2 text-cyan-400" />
                Active Correlations
              </h3>
              <div className="space-y-3">
                {correlations.map(corr => (
                  <div key={corr.id} className="bg-slate-900/50 border border-slate-600 rounded p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-white">{corr.name}</div>
                      <span className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-400">
                        {corr.confidence}% confidence
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{corr.pattern}</div>
                    <div className="text-xs text-gray-500 mt-2">{corr.events} events over {corr.timespan}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MITRE ATT&CK Coverage */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              MITRE ATT&CK Techniques Detected (Last 24h)
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(mitreTechniques).map(([id, name]) => (
                <div key={id} className="bg-slate-900/50 border border-slate-600 rounded p-3 hover:border-purple-500/50 transition-all cursor-pointer">
                  <div className="text-purple-400 font-mono text-sm">{id}</div>
                  <div className="text-white text-sm mt-1">{name}</div>
                  <div className="text-xs text-gray-500 mt-2">{Math.floor(Math.random() * 5) + 1} detections</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alert Inbox */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search alerts by ID, description, source..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`bg-slate-800/50 border rounded-lg p-4 hover:border-cyan-400/50 transition-all cursor-pointer ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="font-mono text-sm text-gray-400">{alert.id}</span>
                      <span className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-lg font-semibold text-white mb-2">{alert.description}</div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-400">Source: <span className="text-cyan-400">{alert.source}</span></span>
                      <span className="text-gray-400">Category: <span className="text-white">{alert.category}</span></span>
                      <span className="text-gray-400">MITRE: <span className="text-purple-400">{alert.mitre}</span></span>
                      <span className="text-gray-400">Correlated: <span className="text-orange-400">{alert.correlated_events} events</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <button 
                      onClick={() => createIncident(alert)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-all"
                    >
                      Create Incident
                    </button>
                    <button 
                      onClick={() => escalateToSOAR(alert)}
                      className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-sm font-medium transition-all flex items-center space-x-1"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Escalate to SOAR</span>
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm font-medium transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Viewer */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-green-400" />
                Real-Time Log Stream
              </h3>
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSimulating ? 'Stop Streaming' : 'Start Streaming'}
              </button>
            </div>
            
            <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
              {logs.map(log => (
                <div key={log.id} className="mb-2 hover:bg-slate-900 p-2 rounded">
                  <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className={`ml-3 font-bold ${getLogLevelColor(log.level)}`}>[{log.level}]</span>
                  <span className="ml-3 text-cyan-400">{log.source}</span>
                  <span className="ml-3 text-gray-400">({log.host})</span>
                  <span className="ml-3 text-white">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Correlation Engine */}
      {activeTab === 'correlation' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-cyan-400" />
              Event Correlation & Pattern Detection
            </h3>
            <div className="space-y-4">
              {correlations.map(corr => (
                <div key={corr.id} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-white">{corr.name}</div>
                      <div className="text-sm text-gray-400 mt-1">{corr.id} • Detected over {corr.timespan}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded border ${getSeverityColor(corr.severity)}`}>
                        {corr.severity.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 text-xs rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {corr.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 border border-slate-700 rounded p-3 mb-3">
                    <div className="text-sm text-gray-400 mb-2">Attack Pattern:</div>
                    <div className="text-white font-mono text-sm">{corr.pattern}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <span className="text-orange-400 font-bold">{corr.events}</span> correlated events
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Investigate
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Create Incident
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
{/* Incidents */}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <AlertOctagon className="w-5 h-5 mr-2 text-red-400" />
                Active Security Incidents
              </h3>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-all">
                Create New Incident
              </button>
            </div>

            <div className="space-y-4">
              {incidents.map(incident => (
                <div key={incident.id} className={`bg-slate-900/50 border rounded-lg p-4 ${getSeverityColor(incident.severity)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-sm text-cyan-400">{incident.id}</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 text-xs rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                          {incident.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-white mb-2">{incident.title}</div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Created: {new Date(incident.created).toLocaleString()}</span>
                        <span>Assigned: <span className="text-cyan-400">{incident.assigned_to}</span></span>
                        <span>Alerts: <span className="text-orange-400">{incident.alerts_count}</span></span>
                        <span>Hosts: <span className="text-red-400">{incident.affected_hosts.join(', ')}</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Investigate
                      </button>
                      <button 
                        onClick={() => escalateToSOAR(incident)}
                        className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-sm font-medium transition-all flex items-center space-x-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Escalate to SOAR</span>
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Threat Intelligence */}
      {activeTab === 'threat-intel' && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-red-400" />
              Threat Intelligence & IOC Database
            </h3>
            
            {/* IOC Search */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search IOCs (IP, domain, file hash)..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
                <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-medium transition-all">
                  Search
                </button>
              </div>
            </div>

            {/* IOC List */}
            <div className="space-y-3">
              {threatIntel.map((ioc, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-lg text-cyan-400">{ioc.ioc}</span>
                        <span className="px-2 py-1 text-xs rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                          {ioc.type}
                        </span>
                        <span className="px-2 py-1 text-xs rounded bg-red-500/10 text-red-400 border border-red-500/30">
                          {ioc.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">Threat Score: <span className="text-red-400 font-bold">{ioc.threat_score}/100</span></span>
                        <span className="text-gray-400">Last Seen: <span className="text-orange-400">{ioc.last_seen}</span></span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Details
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-all">
                        Block
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WazuhSIEMDashboard;