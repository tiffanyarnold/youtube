"use client";

import React from "react";
import Image from "next/image";

// Check if URL is safe for next/image (registered remote patterns or relative)
function isNextImageSafe(url: string): boolean {
  if (!url || url.startsWith("data:")) return false;
  try {
    const u = new URL(url);
    const safeHosts = [
      "images.unsplash.com",
      "img.youtube.com",
      "commondatastorage.googleapis.com",
    ];
    return safeHosts.includes(u.hostname);
  } catch {
    return false;
  }
}

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: SafeImageProps) {
  if (isNextImageSafe(src)) {
    return fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
