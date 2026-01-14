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
              <a
                href="http://34.142.90.169/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
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

      {/* Direct Access Info */}
      {showIframe && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-purple-500 rounded-lg p-8">
            <div className="text-center mb-6">
              <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Opening SOAR System</h2>
              <p className="text-gray-400">
                Due to security restrictions, the SOAR interface opens in a new tab.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 text-purple-400">Access Information:</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• The Tracecat SOAR system will open in a new browser tab</p>
                <p>• You may need to log in with your SOAR credentials</p>
                <p>• All escalated alerts from SIEM will appear in the workflow system</p>
                <p>• Automated playbooks run on received incidents</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="http://34.142.90.169/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-lg"
              >
                <ExternalLink className="w-6 h-6" />
                Launch SOAR Platform
              </a>
              <button
                onClick={() => setShowIframe(false)}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-lg font-medium transition-all"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
