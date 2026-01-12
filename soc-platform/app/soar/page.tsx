'use client';

import { Zap, Wrench } from 'lucide-react';

export default function SOARPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Zap className="w-16 h-16 text-purple-500" />
          <div>
            <h1 className="text-4xl font-bold">SOAR Platform</h1>
            <p className="text-gray-400">Security Orchestration, Automation & Response</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-6">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-yellow-900/30 rounded-full mb-4">
              <Wrench className="w-12 h-12 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">SOAR Tool In Development</h2>
            <p className="text-gray-400 mb-6">
              The SOAR automation platform is currently under development.
              <br />
              This tool will automate incident response workflows and playbook execution.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Planned SOAR Capabilities</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-purple-500">●</span>
              <span>Automated response playbooks for common incident types</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">●</span>
              <span>Integration with EDR, SIEM, and ITSM for orchestrated response</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">●</span>
              <span>Automated threat containment and remediation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">●</span>
              <span>Case management and workflow automation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">●</span>
              <span>Custom playbook builder with drag-and-drop interface</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-900/20 border border-blue-800 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="text-sm text-blue-400 font-semibold mb-1">For Developers</p>
              <p className="text-sm text-gray-300">
                To add the SOAR tool, create your dashboard and place it in 
                <code className="mx-1 px-2 py-1 bg-gray-800 rounded text-xs">app/soar/page.tsx</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
