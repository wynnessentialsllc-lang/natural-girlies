import Image, { type ImageProps } from "next/image";

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNGREY4RjQiLz48L3N2Zz4=";

type OptimizedImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  blurDataURL?: string;
};

/**
 * Wraps next/image with sensible defaults for the magazine:
 *   - cream-toned blur placeholder
 *   - lazy loading by default (override with `priority`)
 *   - responsive `sizes` default for editorial layouts
 */
export function OptimizedImage({
  alt,
  blurDataURL,
  sizes,
  priority,
  loading,
  ...rest
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL ?? DEFAULT_BLUR}
      sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
      priority={priority}
      loading={priority ? undefined : loading ?? "lazy"}
      {...rest}
    />
  );
}
