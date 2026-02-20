"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Link2, X, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { useVideoStore } from "@/lib/store";

type Step = "link" | "details" | "review";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function UploadForm() {
  const router = useRouter();
  const { uploadVideo } = useVideoStore();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("link");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [urlError, setUrlError] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [channelName, setChannelName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const handleUrlSubmit = () => {
    const videoId = extractYouTubeId(youtubeUrl.trim());
    if (!videoId) {
      setUrlError("Please enter a valid YouTube URL");
      return;
    }
    setUrlError("");
    setYoutubeVideoId(videoId);
    setThumbnailPreview(getYouTubeThumbnail(videoId));
    setStep("details");
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUrlSubmit();
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!youtubeVideoId || !channelName.trim() || !title.trim()) return;

    setIsUploading(true);
    setUploadError("");
    setUploadProgress(0);

    // Show progress animation
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 80) {
          clearInterval(progressInterval);
          return 80;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const result = await uploadVideo({
        channelName: channelName.trim(),
        title: title.trim(),
        description: description.trim(),
        thumbnailUrl: thumbnailPreview || getYouTubeThumbnail(youtubeVideoId),
        videoUrl: getYouTubeEmbedUrl(youtubeVideoId),
        duration: "0:00",
        tags: tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      await new Promise((r) => setTimeout(r, 300));
      setIsUploading(false);
      router.push(`/watch/${result.video.id}`);
    } catch (err: unknown) {
      clearInterval(progressInterval);
      const message = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setUploadError(message);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (step === "link") {
    return (
      <div className="max-w-[960px] mx-auto">
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="text-xl font-medium text-[#0F0F0F]">
              Add a video
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-16 px-8 bg-[#F9F9F9]">
            <div className="w-32 h-32 rounded-full bg-[#E5E5E5] flex items-center justify-center mb-6">
              <Link2 className="w-12 h-12 text-[#909090]" />
            </div>
            <p className="text-base font-medium text-[#0F0F0F] mb-2">
              Paste a YouTube link to add a video
            </p>
            <p className="text-sm text-[#606060] mb-6 text-center max-w-md">
              Enter any YouTube video URL and we&apos;ll import it to the platform. Supports standard, short, and embed links.
            </p>
            <div className="w-full max-w-lg">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => {
                      setYoutubeUrl(e.target.value);
                      setUrlError("");
                    }}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full h-11 px-4 border rounded-lg text-sm focus:outline-none transition-colors ${
                      urlError
                        ? "border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                        : "border-[#CCCCCC] focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4]"
                    }`}
                  />
                </div>
                <button
                  onClick={handleUrlSubmit}
                  disabled={!youtubeUrl.trim()}
                  className="px-6 h-11 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#CC0000] transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FF0000]"
                >
                  Continue
                </button>
              </div>
              {urlError && (
                <div className="flex items-center gap-1.5 mt-2 text-[#FF0000]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <p className="text-xs">{urlError}</p>
                </div>
              )}
            </div>

            {/* Supported formats hint */}
            <div className="mt-8 text-center">
              <p className="text-xs text-[#909090] mb-2">Supported formats:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "youtube.com/watch?v=...",
                  "youtu.be/...",
                  "youtube.com/shorts/...",
                  "youtube.com/embed/...",
                ].map((format) => (
                  <span
                    key={format}
                    className="text-[11px] text-[#606060] bg-white px-2.5 py-1 rounded-full border border-[#E5E5E5]"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-[#E5E5E5] text-center">
            <p className="text-xs text-[#606060]">
              By submitting your videos, you acknowledge that this is an
              educational demo platform.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        {/* Header with stepper */}
        <div className="px-6 py-4 border-b border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#0F0F0F] truncate max-w-md">
              {title || "Add video details"}
            </h2>
            {isUploading && (
              <span className="text-xs text-[#606060] bg-[#F1F1F1] px-3 py-1 rounded-sm">
                Processing...
              </span>
            )}
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#065FD4] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="ml-2 text-xs font-medium text-[#0F0F0F]">
                Link
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-[#065FD4] mx-3" />
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#065FD4] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <span className="ml-2 text-xs font-medium text-[#0F0F0F]">
                Details
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-[#E5E5E5] mx-3" />
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  step === "review"
                    ? "bg-[#065FD4]"
                    : "bg-[#E5E5E5]"
                } flex items-center justify-center`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <span className="ml-2 text-xs text-[#606060]">
                Publish
              </span>
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Left side - form fields */}
            <div className="space-y-6">
              {/* Channel name */}
              <div>
                <label className="block text-sm font-medium text-[#0F0F0F] mb-2">
                  Channel name <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter your channel name"
                  className="w-full h-10 px-3 border border-[#CCCCCC] rounded text-sm focus:outline-none focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4] transition-colors"
                />
                <p className="text-xs text-[#606060] mt-1">
                  Creates a new channel or uses an existing one
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#0F0F0F] mb-2">
                  Title <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title that describes your video"
                  className="w-full h-10 px-3 border border-[#CCCCCC] rounded text-sm focus:outline-none focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4] transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#0F0F0F] mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your video"
                  rows={6}
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded text-sm focus:outline-none focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4] transition-colors resize-none"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-[#0F0F0F] mb-2">
                  Thumbnail
                </label>
                <p className="text-xs text-[#606060] mb-3">
                  The YouTube thumbnail is auto-imported. You can upload a custom one instead.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-36 h-20 border-2 border-dashed border-[#CCCCCC] rounded-lg flex flex-col items-center justify-center hover:border-[#065FD4] transition-colors"
                  >
                    <ImageIcon className="w-6 h-6 text-[#909090] mb-1" />
                    <span className="text-xs text-[#606060]">
                      Custom thumbnail
                    </span>
                  </button>
                  {thumbnailPreview && (
                    <div className="relative w-36 h-20 rounded-lg overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                      {youtubeVideoId && thumbnailPreview !== getYouTubeThumbnail(youtubeVideoId) && (
                        <button
                          onClick={() => {
                            setThumbnailPreview(
                              youtubeVideoId
                                ? getYouTubeThumbnail(youtubeVideoId)
                                : ""
                            );
                          }}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailSelect}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[#0F0F0F] mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags separated by commas"
                  className="w-full h-10 px-3 border border-[#CCCCCC] rounded text-sm focus:outline-none focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4] transition-colors"
                />
                <p className="text-xs text-[#606060] mt-1">
                  Tags can help viewers find your video
                </p>
              </div>
            </div>

            {/* Right side - video preview */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <div className="bg-[#F9F9F9] rounded-lg overflow-hidden">
                  <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                    {youtubeVideoId ? (
                      <iframe
                        src={getYouTubeEmbedUrl(youtubeVideoId)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video preview"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <div>
                      <p className="text-[10px] text-[#606060] uppercase tracking-wide">
                        YouTube Link
                      </p>
                      <p className="text-xs text-[#065FD4] truncate">
                        {youtubeUrl || "No link provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#606060] uppercase tracking-wide">
                        Video ID
                      </p>
                      <p className="text-xs text-[#0F0F0F] truncate">
                        {youtubeVideoId || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with upload progress or submit */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] flex flex-col gap-2">
          {uploadError && (
            <div className="flex items-center gap-1.5 text-[#FF0000]">
              <AlertCircle className="w-3.5 h-3.5" />
              <p className="text-xs">{uploadError}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
          {isUploading ? (
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#065FD4] rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-xs text-[#606060]">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setStep("link");
                  setYoutubeVideoId(null);
                  setYoutubeUrl("");
                  setThumbnailPreview("");
                }}
                className="px-4 py-2 text-sm text-[#606060] hover:text-[#0F0F0F] transition-colors"
              >
                ← Change link
              </button>
              <button
                onClick={handleSubmit}
                disabled={!channelName.trim() || !title.trim() || !youtubeVideoId}
                className="px-6 py-2.5 bg-[#FF0000] text-white text-sm font-medium rounded-full hover:bg-[#CC0000] transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FF0000]"
              >
                Publish
              </button>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
