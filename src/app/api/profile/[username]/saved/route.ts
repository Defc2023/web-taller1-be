import { NextRequest, NextResponse } from "next/server";
import { CURRENT_USER, MOCK_POSTS, MOCK_REELS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  // Only the current user can view their saved items
  if (username !== CURRENT_USER.username) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const savedPosts = MOCK_POSTS.filter((p) => p.isSaved);
  const savedReels = MOCK_REELS.filter((r) => r.isSaved);

  return NextResponse.json({ savedPosts, savedReels });
}
