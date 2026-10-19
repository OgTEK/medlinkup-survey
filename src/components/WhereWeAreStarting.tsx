"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* -------------------------------------------------------------------------- */
/*  CONTENT — edit this section only                                          */
/* -------------------------------------------------------------------------- */

const TITLE = "Where we're starting";
const BODY =
  "Starting with women. Thinking beyond one appointment. Women's healthcare needs change throughout life. Some concerns need a single consultation. Others call for investigations, specialist care, mental health support or ongoing attention. We're starting with women in Nigeria because we believe these experiences can be much easier to access and navigate. We're not building for one condition or one stage of life. Our long-term vision goes further: healthcare that is accessible, connected, personal and continuous, so people get the care and support they need throughout their health journeys.";

/** Scroll speed in px per second. Alternating columns/rows go in opposite directions. */
const SPEED = 24;

const PHOTO_DOMAIN = "https://images.unsplash.com/";

type Photo = {
  /** Alt text */
  name: string;
  /** Unsplash photo id, including the "photo-" prefix, e.g. "photo-1656473031961-9d5d9ee19f40" */
  id: string;
};

/**
 * Order matters: photos are dealt out round-robin
 *   – 3 columns on desktop, 2 columns on tablet, 3 rows on mobile.
 * Replace the ids below with your own (the same id can repeat).
 */
const PHOTOS: Photo[] = [
  { name: "Photo 1", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 2", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 3", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 4", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 5", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 6", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 7", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 8", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 9", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 10", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 11", id: "photo-1656473031961-9d5d9ee19f40" },
  { name: "Photo 12", id: "photo-1656473031961-9d5d9ee19f40" },
];

/** Widths (px) used to build the srcset; tiles are square so height = width */
const SRCSET_WIDTHS = [200, 400, 600, 800, 1200];
const DEFAULT_WIDTH = 600;
const QUALITY = 60;

/** Responsive `sizes` attribute shared by every photo */
const PHOTO_SIZES =
  "(max-width: 375px) 124px, (max-width: 412px) 136px, (max-width: 640px) 212px, (max-width: 768px) 115px, (max-width: 1024px) 154px, (max-width: 1280px) 192px, (max-width: 1350px) 203px, (max-width: 1441px) 216px, (max-width: 1920px) 288px";

/* -------------------------------------------------------------------------- */
/*  HELPERS                                                                   */
/* -------------------------------------------------------------------------- */

/** Square, cropped Unsplash URL at a given width */
function unsplashUrl(id: string, w: number) {
  return `${PHOTO_DOMAIN}${id}?w=${w}&h=${w}&auto=format&fit=crop&q=${QUALITY}`;
}

function buildSrcSet(id: string) {
  return SRCSET_WIDTHS.map((w) => `${unsplashUrl(id, w)} ${w}w`).join(",");
}

/** Deal items round-robin into `count` buckets */
function split<T>(items: T[], count: number): T[][] {
  const buckets: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => buckets[i % count].push(item));
  return buckets;
}

/**
 * Infinite marquee. Moves the element's two identical children by one child-length
 * and wraps. Hidden (display:none) instances measure 0 and are skipped.
 */
function useMarquee(
  ref: React.RefObject<HTMLDivElement | null>,
  axis: "x" | "y",
  speed: number
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let offset = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const first = el.firstElementChild as HTMLElement | null;
      const size = first ? (axis === "y" ? first.offsetHeight : first.offsetWidth) : 0;
      if (size > 0) {
        offset = (((offset + speed * dt) % size) + size) % size;
        const pos = -offset;
        el.style.transform =
          axis === "y" ? `translate3d(0, ${pos}px, 0)` : `translate3d(${pos}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, axis, speed]);
}

/* -------------------------------------------------------------------------- */
/*  COMPONENTS                                                                */
/* -------------------------------------------------------------------------- */

function PhotoTile({ photo, className }: { photo: Photo; className: string }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[2px] bg-warm-black/[0.04] ${className}`}
    >
      {/* Photos fill the whole tile (was inset-x-[15%] inset-y-[25%] for logos) */}
      <div className="absolute inset-0">
        <picture className="size-full site-image cover">
          <source srcSet={buildSrcSet(photo.id)} sizes={PHOTO_SIZES} />
          <img
            src={unsplashUrl(photo.id, DEFAULT_WIDTH)}
            alt={photo.name}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full object-cover"
          />
        </picture>
      </div>
    </div>
  );
}

/** One vertical scrolling column (tablet + desktop) */
function VerticalColumn({ photos, speed }: { photos: Photo[]; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useMarquee(ref, "y", speed);

  return (
    <div className="h-full overflow-hidden">
      <div ref={ref} className="flex h-max flex-col will-change-transform">
        {[false, true].map((isClone) => (
          <div
            key={String(isClone)}
            className="flex flex-col gap-4 pb-4"
            aria-hidden={isClone || undefined}
          >
            {photos.map((photo, i) => (
              <PhotoTile
                key={`${photo.id}-${i}`}
                photo={photo}
                className="aspect-square w-full"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** One horizontal scrolling row (mobile) */
function HorizontalRow({ photos, speed }: { photos: Photo[]; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useMarquee(ref, "x", speed);

  return (
    <div className="overflow-hidden">
      <div ref={ref} className="flex w-max will-change-transform">
        {[false, true].map((isClone) => (
          <div
            key={String(isClone)}
            className="flex gap-3 pr-3"
            aria-hidden={isClone || undefined}
          >
            {photos.map((photo, i) => (
              <PhotoTile key={`${photo.id}-${i}`} photo={photo} className="size-32" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Alternate direction for every other column/row */
const dir = (i: number) => (i % 2 === 0 ? SPEED : -SPEED);

/**
 * Edge fade. Set as inline styles (with the -webkit- prefix) rather than a Tailwind
 * arbitrary class so it works regardless of Tailwind version / Safari.
 * Tweak the percentages to make the fade shorter or longer.
 */
const fade = (direction: "to bottom" | "to right", start: number): CSSProperties => {
  const gradient = `linear-gradient(${direction}, transparent, #000 ${start}%, #000 ${100 - start}%, transparent)`;
  return { maskImage: gradient, WebkitMaskImage: gradient };
};
const FADE_Y = fade("to bottom", 12); // tablet + desktop columns
const FADE_X = fade("to right", 6); // mobile rows

export default function InGoodCompanySection() {
  const tabletCols = split(PHOTOS, 2);
  const desktopCols = split(PHOTOS, 3);
  const mobileRows = split(PHOTOS, 3);

  return (
    <section
      className="bg-warm-white block-padding"
      style={
        {
          "--block-pt-mob": "98px",
          "--block-pb-mob": "24px",
          "--block-pt-des": "0px",
          "--block-pb-des": "0px",
        } as CSSProperties
      }
    >
      <div className="container">
        <div className="site-grid items-center">
          {/* Text */}
          <div className="col-span-8 flex flex-col gap-8 md:col-span-4 lg:col-span-6 lg:gap-10 xl:col-span-11 2xl:col-span-9">
            {/* `split-up` kept so your SplitText animation can target it */}
            <h2 className="inline-block cap-trim whitespace-pre-line font-sans font-medium tracking-[-0.06em] text-warm-black text-[32px] leading-[1.1] lg:text-[48px] lg:leading-[0.98] xl:text-[64px] split-up">
              {TITLE}
            </h2>
            <div>
              <p className="max-w-[345px] body text-warm-black lg:max-w-[390px] xl:max-w-[506px]">
                {/* {BODY} */}
                  Starting with women. Thinking beyond one appointment.<br/><br/>Women's healthcare needs change throughout life. Some concerns need a single consultation. Others call for investigations, specialist care, mental health support or ongoing attention.<br/> We're starting with women in Nigeria because we believe these experiences can be much easier to access and navigate. We're not building for one condition or one stage of life.<br/><br/> Our long-term vision goes further: healthcare that is accessible, connected, personal and continuous, so people get the care and support they need throughout their health journeys.

              </p>
            </div>
          </div>

          {/* Tablet: 2 vertical columns */}
          <div
            className="grid-rows-1 gap-4 hidden h-[440px] grid-cols-2 md:col-span-4 md:col-start-5 md:grid lg:hidden"
            style={FADE_Y}
          >
            {tabletCols.map((col, i) => (
              <VerticalColumn key={i} photos={col} speed={dir(i)} />
            ))}
          </div>

          {/* Desktop: 3 vertical columns */}
          <div
            className="grid-rows-1 gap-4 hidden lg:col-span-6 lg:col-start-7 lg:grid lg:h-[560px] lg:grid-cols-3 xl:col-span-12 xl:col-start-13 xl:h-[685px] 2xl:col-span-9 2xl:col-start-16"
            style={FADE_Y}
          >
            {desktopCols.map((col, i) => (
              <VerticalColumn key={i} photos={col} speed={dir(i)} />
            ))}
          </div>
        </div>

        {/* Mobile: 3 horizontal rows */}
        <div
          className="-mx-4 mt-12 flex flex-col gap-3 md:hidden"
          style={FADE_X}
        >
          {mobileRows.map((row, i) => (
            <HorizontalRow key={i} photos={row} speed={dir(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}