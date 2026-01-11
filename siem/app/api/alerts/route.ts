import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const alertData = await request.json();
    console.log('Received alert:', alertData);
    
    return NextResponse.json({
      success: true,
      message: 'Alert received',
      alert_id: `ALT-${Date.now()}`,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process alert'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    service: 'SIEM Alert Ingestion',
    timestamp: new Date().toISOString()
  });
}