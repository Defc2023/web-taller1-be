"use client";

// Stories bar — purely visual mock. Students can wire it to a real stories API.
// TODO (students): Fetch real stories from your backend endpoint (e.g. GET /api/stories)

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

interface Story {
  username: string;
  avatar: string;
  isOwn: boolean;
}

export default function StoriesBar() {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then(setStories);
  }, []);

  // Auto-close story after progress completes
  useEffect(() => {
    if (!viewingStory) return;
    setStoryProgress(0);
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setViewingStory(null);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [viewingStory]);

  if (stories.length === 0) return null;

  function handleStoryClick(story: Story) {
    if (story.isOwn) {
      showToast("Selecciona una imagen desde Crear para agregar a tu historia");
    } else {
      setViewingStory(story);
    }
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide bg-white border border-gray-200 rounded-xl px-4 py-3">
        {stories.map((story) => (
          <button key={story.username} onClick={() => handleStoryClick(story)} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-full p-0.5 ${
                story.isOwn ? "bg-gray-200" : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
              }`}
            >
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {story.isOwn ? (
              <div className="relative -mt-5 ml-8 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                  <path d="M12 5v14M5 12h14" stroke="white" strokeWidth={3} strokeLinecap="round" />
                </svg>
              </div>
            ) : null}
            <span className="text-xs text-gray-500 truncate max-w-[56px]">
              {story.isOwn ? "Your story" : story.username.split(".")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Story viewer modal */}
      {viewingStory && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setViewingStory(null)}>
          <div className="relative w-full max-w-sm h-[80vh] rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 z-10 px-3 pt-3">
              <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-100" style={{ width: `${storyProgress}%` }} />
              </div>
            </div>
            {/* Story header */}
            <div className="absolute top-4 left-0 right-0 z-10 flex items-center gap-3 px-4 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={viewingStory.avatar}
                alt={viewingStory.username}
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span className="text-white font-semibold text-sm">{viewingStory.username}</span>
              <button onClick={() => setViewingStory(null)} className="ml-auto text-white text-xl">&times;</button>
            </div>
            {/* Story content (placeholder image) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/story_${viewingStory.username}/400/700`}
              alt={`${viewingStory.username}'s story`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
