"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

/* -------------------------------------------------------------------------- */
/*  CONTENT — edit this section only                                          */
/* -------------------------------------------------------------------------- */

const SECTION_TITLE = "How MedLinkup will work";
const VIEW_ALL = { label: "View all", href: "/journal" };

type Post = {
    // href: string;
    title: string;
    description: string;
    /** ISO date: YYYY-MM-DD */
    number: string;
    /** Datocms image URL WITHOUT query string */
    image: string;
    /** Image aspect ratio, e.g. "680 / 388" (only affects layout shift) */
    imageRatio: string;
    imageAlt?: string;
    /** Full Tailwind class (must be written out in full so Tailwind can see it) */
    hoverClass: string;
    /** Desktop: how wide the card is in the grid */
    desktopSpan: string;
    /** `sizes` attribute for the desktop layout */
    desktopSizes: string;
};

const POSTS: Post[] = [
    {
        // href: "/journal/behind-the-build-education-at-thirdway",
        title: "Tell us what you need.",
        description: 'Start with a guided check-in about your health concerns and goals, or go straight to requesting an individual consultation.',
        number: "01",
        image:
            "https://images.unsplash.com/photo-1613796446768-b7366aed3ac6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        imageRatio: "680 / 388",
        hoverClass: "hover:bg-yellow",
        desktopSpan: "lg:col-span-4 xl:col-span-12",
        desktopSizes:
            "(max-width: 768px) 343px, (max-width: 1024px) 458px, (max-width: 1280px) 572px, (max-width: 1350px) 604px, (max-width: 1441px) 644px, 859px",
    },
    {
        // href: "/journal/behind-the-build-the-campus-in-the-sky",
        title: "Explore your care options",
        description: 'Start with a guided check-in about your health concerns and goals, or go straight to requesting an individual consultation.',

        number: "02",
        image: "https://images.unsplash.com/photo-1740479050151-5d26c764403e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        imageRatio: "680 / 453",
        hoverClass: "hover:bg-blue",
        desktopSpan: "lg:col-span-4 xl:col-span-6",
        desktopSizes:
            "(max-width: 768px) 169px, (max-width: 1024px) 225px, (max-width: 1280px) 281px, (max-width: 1350px) 296px, (max-width: 1441px) 316px, 421px",
    },
    {
        // href: "/journal/behind-the-build-meet-abi-munslow",
        title: "Stay connected to your care",
        description: 'Keep track of appointments, relevant records, recommended next steps and follow-up, with ongoing support when your needs call for it.',

        number: "03",
        image:
            "https://images.unsplash.com/photo-1758691462430-81160850496c?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        imageRatio: "680 / 453",
        imageAlt: "Behind the Build: Meet Abi Munslow",
        hoverClass: "hover:bg-cream",
        desktopSpan: "lg:col-span-4 xl:col-span-6",
        desktopSizes:
            "(max-width: 768px) 169px, (max-width: 1024px) 225px, (max-width: 1280px) 281px, (max-width: 1350px) 296px, (max-width: 1441px) 316px, 421px",
    },
];

/** Mobile carousel image sizes (same for every card) */
const MOBILE_SIZES =
    "(max-width: 375px) 284px, (max-width: 412px) 312px, (max-width: 640px) 485px, (max-width: 768px) 343px, 397px";

/** Responsive widths used to build srcset: [dpr, descriptor] */
const SRCSET_STEPS: [string, number][] = [
    ["0.25", 170],
    ["0.5", 340],
    ["0.75", 510],
    ["1", 680],
    ["1.5", 1020],
    ["2", 1360],
];

/* -------------------------------------------------------------------------- */
/*  HELPERS                                                                   */
/* -------------------------------------------------------------------------- */

const EASE = "ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";

/**
 * Build an Unsplash URL at a given width. Works whether or not `url` already has
 * a query string (yours do), so it never produces a broken "?...?..." URL and
 * never downloads the 3000px+ original.
 */
function imgUrl(url: string, width: number) {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", "70");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
}

function buildSrcSet(url: string) {
    return SRCSET_STEPS.map(([, w]) => `${imgUrl(url, w)} ${w}w`).join(",");
}

function parseDate(iso: string) {
    const [year, month, day] = iso.split("-");
    return { day, month, year };
}

function ArrowIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 11 8"
            aria-hidden="true"
            className={className}
        >
            <path
                fill="currentColor"
                d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"
            />
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/*  COMPONENTS                                                                */
/* -------------------------------------------------------------------------- */

function DatePills({ date }: { date: string }) {
    const { day, month, year } = parseDate(date);
    return (
        <div className="flex items-center gap-[2px]">
            {/* <span className="number-pill h-[20px] w-[30px] small-text date">
        <span>{day}</span>
      </span>
      <span className="number-pill h-[20px] w-[30px] small-text date">
        <span>{month}</span>
      </span> */}
            <span className="number-pill h-[20px] w-[48px] small-text dateYear">
                <span>{year}</span>
            </span>
        </div>
    );
}

function PostCard({ post, sizes }: { post: Post; sizes: string }) {
    return (
        <a
            className={`group flex h-full flex-col gap-[16px] rounded-[4px] bg-warm-black/4 px-[8px] pt-[8px] pb-[24px] transition-colors duration-700 ${EASE} lg:pb-[32px] ${post.hoverClass}`}
            
        >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2px] bg-warm-black/6">
                <div
                    className={`absolute inset-0 transition-transform duration-700 ${EASE} will-change-transform motion-safe:group-hover:scale-[1.02]`}
                >
                    <picture className="size-full object-cover site-image cover">
                        <source srcSet={buildSrcSet(post.image)} sizes={sizes} />
                        <img
                            src={imgUrl(post.image, 680)}
                            alt={post.imageAlt ?? ""}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            style={{
                                aspectRatio: post.imageRatio,
                                width: "100%",
                                maxWidth: 680,
                                height: "auto",
                            }}
                        />
                    </picture>
                </div>
            </div>
            <div className="flex flex-col gap-[16px] px-[10px]">
                <DatePills date={post.number} />
                <h2 className="body-large text-warm-black">{post.title}</h2>
                <h3 className="body-large text-warm-black">{post.description}</h3>

            </div>
        </a>
    );
}

function ViewAllLink() {
    return (
        <a
            className="mb-[-2px] inline-block link-line-reverse pb-[3px] body text-warm-black"
            href={VIEW_ALL.href}
        >
            {VIEW_ALL.label}
        </a>
    );
}

const navButtonBase =
    "group relative inline-flex h-[19px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-warm-black text-warm-black transition-opacity duration-300 ease-button xl:h-[22px] xl:w-[31px]";

function NavButton({
    direction,
    disabled,
    onClick,
}: {
    direction: "prev" | "next";
    disabled: boolean;
    onClick: () => void;
}) {
    const isPrev = direction === "prev";
    const flip = isPrev ? "rotate-180" : "";
    return (
        <button
            type="button"
            aria-label={isPrev ? "Previous" : "Next"}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={onClick}
            className={`${navButtonBase} ${disabled ? "pointer-events-none opacity-40" : ""}`}
        >
            <ArrowIcon
                className={`absolute inset-0 m-auto h-[8px] w-[11px] transition-transform duration-[400ms] ease-button ${flip} ${isPrev
                    ? "group-hover:-translate-x-[220%]"
                    : "group-hover:translate-x-[220%]"
                    }`}
            />
            <ArrowIcon
                className={`absolute inset-0 m-auto h-[8px] w-[11px] transition-transform duration-[400ms] ease-button ${flip} ${isPrev
                    ? "translate-x-[220%] group-hover:translate-x-0"
                    : "-translate-x-[220%] group-hover:translate-x-0"
                    }`}
            />
        </button>
    );
}

export default function JournalSection() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const syncState = (s: SwiperType) => {
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
    };

    return (
        <section
            className="bg-warm-white block-padding"
            style={
                {
                    // The carousel intentionally bleeds past the container (to show the
                    // next card). Clip at the section edge so it can't widen the page.
                    overflowX: "hidden",
                    "--block-pt-mob": "98px",
                    "--block-pb-mob": "98px",
                    "--block-pt-des": "124px",
                    "--block-pb-des": "124px",
                } as React.CSSProperties
            }
        >
            <div className="container">
                <div className="text-warm-black">
                    {/* Heading */}
                    <div className="column gap-8">
                        {/* `split-up` is kept so your SplitText animation can target it */}
                        <h2 className="inline-block h4 split-up">
                            {SECTION_TITLE}
                        </h2>
                        
                        <div className="hidden lg:block pt-8">
                            <h2>
                                Three steps. One connected journey.
                            </h2>
                        </div>
                    </div>

                    {/* Desktop grid */}
                    <div className="mt-[32px] hidden gap-[16px] lg:mt-[64px] lg:grid lg:grid-cols-12 xl:grid-cols-24 xl:items-start">
                        {POSTS.map((post) => (
                            <div key={post.number} className={post.desktopSpan}>
                                <PostCard post={post} sizes={post.desktopSizes} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile carousel */}
                    <div className="mt-[32px] lg:hidden">
                        <Swiper
                            className="!overflow-visible"
                            style={{ maxWidth: "100%" }}
                            slidesPerView={1.1}
                            spaceBetween={16}
                            onSwiper={(s) => {
                                setSwiper(s);
                                syncState(s);
                            }}
                            onSlideChange={syncState}
                            onReachBeginning={syncState}
                            onReachEnd={syncState}
                        >
                            {POSTS.map((post) => (
                                <SwiperSlide key={post.number} className="!h-auto">
                                    <PostCard post={post} sizes={MOBILE_SIZES} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="mt-[24px] flex items-center justify-between gap-[16px]">
                            <div className="flex items-center gap-[12px]">
                                <NavButton
                                    direction="prev"
                                    disabled={isBeginning}
                                    onClick={() => swiper?.slidePrev()}
                                />
                                <NavButton
                                    direction="next"
                                    disabled={isEnd}
                                    onClick={() => swiper?.slideNext()}
                                />
                            </div>
                            {/* <ViewAllLink /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}