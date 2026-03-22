"use client";

import Link from "next/link";
import { Conversation } from "@/lib/types";
import { formatDistanceToNow } from "@/lib/utils";
import { CURRENT_USER } from "@/lib/mock-data";

interface Props {
  conversations: Conversation[];
  activeId?: string;
}

export default function ConversationList({ conversations, activeId }: Props) {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="font-bold text-sm">{CURRENT_USER.username}</h2>
      </div>
      {conversations.map((conv) => {
        const isActive = conv.id === activeId;
        const isFromMe = conv.lastMessage.senderId === CURRENT_USER.id;
        return (
          <Link
            key={conv.id}
            href={`/messages/${conv.id}`}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${isActive ? "bg-gray-100" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={conv.participant.avatar}
              alt={conv.participant.username}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${conv.unreadCount > 0 ? "font-bold" : "font-medium"}`}>
                  {conv.participant.username}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {formatDistanceToNow(conv.lastMessage.createdAt)}
                </span>
              </div>
              <p className={`text-sm truncate mt-0.5 ${conv.unreadCount > 0 ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                {isFromMe ? `You: ${conv.lastMessage.text}` : conv.lastMessage.text}
              </p>
            </div>
            {conv.unreadCount > 0 && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
