'use client';

import { useState } from 'react';
import { Shield, Zap, ExternalLink, AlertCircle } from 'lucide-react';

export default function SOARPage() {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Zap className="w-10 h-10 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold">SOAR Platform</h1>
            <p className="text-gray-400">Security Orchestration, Automation & Response</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      {!showIframe && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold">Tracecat SOAR Integration</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              The SOAR platform receives escalated alerts from SIEM and automates incident response workflows. 
              Click below to access the Tracecat SOAR interface.
            </p>

            <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                SOAR Capabilities:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Automated response playbooks for common incident types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Integration with EDR, SIEM, and ITSM for orchestrated response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Automated threat containment and remediation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Case management and workflow automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Custom playbook builder with drag-and-drop interface</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowIframe(true)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Open SOAR Dashboard
              </button>
              <a
                href="http://34.142.90.169/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* Connection Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Integration Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">SIEM Connection</span>
                <span className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">SOAR Endpoint</span>
                <span className="text-cyan-400 font-mono text-sm">http://34.142.90.169</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Auto-Escalation</span>
                <span className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded SOAR */}
      {showIframe && (
        <div className="h-[calc(100vh-180px)]">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Tracecat SOAR - Live System</span>
            </div>
            <div className="flex gap-2">
              <a
                href="http://34.142.90.169/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </a>
              <button
                onClick={() => setShowIframe(false)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
          
          <iframe
            src="http://34.142.90.169/"
            className="w-full h-full bg-white rounded-lg border border-gray-700"
            title="Tracecat SOAR Platform"
          />
        </div>
      )}
    </div>
  );
}
