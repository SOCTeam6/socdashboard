import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to SOAR
    const response = await fetch(
      'http://34.142.90.169/api/webhooks/wf_7Fq86B311b1xEiYRDJ52Uy/b1c9ab8719e2e63945f0fdc45b31f5db5d35965772ed294690062f70c94b5de0',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tracecat-api-key': 'tc_sk_7BN1f20ynwRu980EZGoBGZ3Zu3jzN0TR5CpgErFrJbJ'
        },
        body: JSON.stringify(body)
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Alert escalated to SOAR' });
    } else {
      return NextResponse.json({ success: false, message: 'SOAR API error' }, { status: response.status });
    }
  } catch (error) {
    console.error('SOAR proxy error:', error);
    return NextResponse.json({ success: false, message: 'Failed to connect to SOAR' }, { status: 500 });
  }
}
