import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONVERSATIONS, CURRENT_USER } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  // Mark all messages as read when the conversation is opened
  conversation.messages.forEach((msg) => {
    if (msg.senderId !== CURRENT_USER.id) {
      msg.isRead = true;
    }
  });
  conversation.unreadCount = 0;

  return NextResponse.json(conversation);
}
