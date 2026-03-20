// ============================================================
// TYPES — Fakestagram
// ============================================================

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  website?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
}

export interface Post {
  id: string;
  author: User;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
}

export interface Reel {
  id: string;
  author: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  createdAt: string;
  isLiked: boolean;
  audioTrack?: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: string;
  likesCount: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  participant: User;
  messages: DirectMessage[];
  lastMessage: DirectMessage;
  unreadCount: number;
}

export interface CreatePostPayload {
  caption: string;
  imageUrl: string;
  location?: string;
}

export interface CreateReelPayload {
  caption: string;
  videoUrl: string;
  thumbnailUrl: string;
  audioTrack?: string;
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
  mediaUrl?: string;
}
