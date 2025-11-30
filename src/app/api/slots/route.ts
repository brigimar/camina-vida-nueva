import { NextResponse } from 'next/server';
import { getSlots } from '@/lib/controllers/slotsController';

export async function GET() {
  try {
    const data = await getSlots();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
