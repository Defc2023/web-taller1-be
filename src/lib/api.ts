// ============================================================
// API REFERENCE — Fakestagram
//
// This file is NOT imported anywhere. It exists as a reference
// showing students the exact fetch calls they need to wire up.
//
// Copy the relevant function into the component or page where
// you see a "TODO: Connect to your backend" comment, then call
// it instead of using the mock data.
//
// The mock API routes at /src/app/api/* are already implemented
// and match these request/response shapes exactly.
// ============================================================

// ── Posts ────────────────────────────────────────────────────

export async function getPosts() {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function createPost(payload: {
  imageUrl: string;
  caption: string;
  location?: string;
}) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function likePost(postId: string) {
  const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to like post");
  return res.json(); // { isLiked: boolean, likesCount: number }
}

export async function savePost(postId: string) {
  const res = await fetch(`/api/posts/${postId}/save`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to save post");
  return res.json(); // { isSaved: boolean }
}

// ── Reels ────────────────────────────────────────────────────

export async function getReels() {
  const res = await fetch("/api/reels");
  if (!res.ok) throw new Error("Failed to fetch reels");
  return res.json();
}

export async function createReel(payload: {
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  audioTrack?: string;
}) {
  const res = await fetch("/api/reels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create reel");
  return res.json();
}

// ── Messages ─────────────────────────────────────────────────

export async function getConversations() {
  const res = await fetch("/api/messages");
  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

export async function getConversation(id: string) {
  const res = await fetch(`/api/messages/${id}`);
  if (!res.ok) throw new Error("Conversation not found");
  return res.json();
}

export async function sendMessage(payload: {
  conversationId: string;
  text: string;
  mediaUrl?: string;
}) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

// ── Profile ──────────────────────────────────────────────────

export async function getProfile(username: string) {
  const res = await fetch(`/api/profile/${username}`);
  if (!res.ok) throw new Error("Profile not found");
  return res.json(); // { user: User, posts: Post[] }
}

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}) {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

// ── Follow / Followers / Following ───────────────────────────

export async function followUser(username: string) {
  const res = await fetch(`/api/profile/${username}/follow`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to follow/unfollow user");
  return res.json(); // { isFollowing: boolean }
}

export async function getFollowers(username: string) {
  const res = await fetch(`/api/profile/${username}/followers`);
  if (!res.ok) throw new Error("Failed to fetch followers");
  return res.json(); // Array of { id, username, name, avatar, isVerified }
}

export async function getFollowing(username: string) {
  const res = await fetch(`/api/profile/${username}/following`);
  if (!res.ok) throw new Error("Failed to fetch following");
  return res.json(); // Array of { id, username, name, avatar, isVerified }
}
