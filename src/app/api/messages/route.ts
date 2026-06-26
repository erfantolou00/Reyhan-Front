import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'messages', 'messages.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ messages: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileContent);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json(
      { error: 'Failed to read messages' },
      { status: 500 }
    );
  }
}  