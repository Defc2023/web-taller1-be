"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { UploadDropzone } from "@/lib/uploadthing";

type Tab = "post" | "reel";

export default function CreatePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("post");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [audioTrack, setAudioTrack] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadedUrl) { setError("Please upload a file first."); return; }

    setLoading(true);
    setError(null);

    try {
      if (tab === "post") {
        // TODO: Replace `preview` with the real URL returned by UploadThing after upload.
        // TODO: Change the URL below to your real backend endpoint.
        // Example: fetch("https://your-api.com/posts", { method: "POST", ... })
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: uploadedUrl, caption, location }),
        });
        showToast("Post creado con éxito");
      } else {
        // TODO: Replace `preview` with the real URL returned by UploadThing after upload.
        // TODO: Change the URL below to your real backend endpoint.
        // Example: fetch("https://your-api.com/reels", { method: "POST", ... })
        await fetch("/api/reels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoUrl: uploadedUrl, thumbnailUrl: uploadedUrl, caption, audioTrack }),
        });
        showToast("Reel creado con éxito");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Create new {tab}</h1>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        {(["post", "reel"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPreview(null); setUploadedUrl(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* File picker — uses <UploadDropzone> from @uploadthing/react */}
        {preview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl aspect-square flex flex-col items-center justify-center overflow-hidden relative">
            {tab === "post" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <video src={preview} className="w-full h-full object-cover" muted loop autoPlay playsInline />
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-sm font-semibold">Uploading…</div>
              </div>
            )}
            {!uploading && (
              <button
                type="button"
                onClick={() => { setPreview(null); setUploadedUrl(null); }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-black/80"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <UploadDropzone
            endpoint={tab === "post" ? "imageUploader" : "videoUploader"}
            onUploadBegin={() => {
              setUploading(true);
              setError(null);
            }}
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setUploadedUrl(res[0].ufsUrl);
                // Show a local preview from the uploaded URL
                setPreview(res[0].ufsUrl);
              }
              setUploading(false);
            }}
            onUploadError={(err) => {
              setError(err instanceof Error ? err.message : "Upload failed");
              setPreview(null);
              setUploading(false);
            }}
            config={{ mode: "auto" }}
            appearance={{
              container: "border-2 border-dashed border-gray-300 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors",
              label: "text-gray-500 font-semibold text-sm",
              allowedContent: "text-gray-400 text-xs",
              button: "bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ut-uploading:bg-blue-400",
            }}
          />
        )}

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption…"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-blue-400 transition-colors"
            required
          />
        </div>

        {tab === "post" && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add a location"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        )}

        {tab === "reel" && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Audio track (optional)</label>
            <input
              type="text"
              value={audioTrack}
              onChange={(e) => setAudioTrack(e.target.value)}
              placeholder="e.g. Golden Hour — JVKE"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading || uploading || !caption.trim() || !uploadedUrl}
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors disabled:opacity-40"
        >
          {loading ? "Sharing…" : uploading ? "Uploading file…" : `Share ${tab}`}
        </button>
      </form>
    </div>
  );
}
