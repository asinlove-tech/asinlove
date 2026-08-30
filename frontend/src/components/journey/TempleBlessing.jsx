import { useRef, useEffect } from "react";
import { blessing, couple, images } from "@/config";
import { useRafScroll } from "@/hooks/useRafScroll";
import { useReveal } from "@/hooks/useReveal";
import { Ornament } from "@/components/shared/Ornament";

export const TempleBlessing = () => {
    const sectionRef = useRef(null);
    const shrineImgRef = useRef(null);
    const revealRef = useReveal();

    useRafScroll(() => {
        const section = sectionRef.current;
        const img = shrineImgRef.current;
        if (!section || !img) return;

        const vh = window.innerHeight;
        const rect = section.getBoundingClientRect();

        // Ganesha's gentle scale/rise as the section scrolls into view, and
        // his fade-in once the carpet trigger point is reached — unchanged
        // from before, just no longer dependent on the old fixed backdrop.
        const p = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (vh * 1.15)));
        const showShrine = rect.top <= vh * 0.6; // carpet trigger point

        img.style.transformOrigin = "center bottom";
        img.style.transform = `translateY(${-p * 40}px) scale(${1 - p * 0.35})`;
        img.style.opacity = showShrine ? "1" : "0";
    });

    useEffect(() => {
        // initialize shrine (hidden) so it animates in when carpet trigger hits
        if (shrineImgRef.current) {
            const s = shrineImgRef.current;
            s.style.opacity = "0";
            s.style.transform = "translateY(40px) scale(0.95)";
            // Only transition opacity; RAF owns transform for smooth scroll.
            s.style.transition = "opacity 420ms ease";
        }
    }, []);

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
                revealRef.current = el;
            }}
            data-testid="temple-blessing"
            data-carpet-region
            aria-label="Blessing and invitation"
            className="relative px-6 pb-16 pt-16 md:pb-24 md:pt-20 carpet-bg"
            style={{ backgroundImage: "url(/weddingSiteNew/images/carpet-crop.webp)" }}
        >
            <div className="absolute inset-0 bg-[#E8A35C]/[0.05]" aria-hidden="true" />
            {/* fade the carpet out into the page's ivory background before the
                next section, instead of ending on a hard edge */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 md:h-56"
                aria-hidden="true"
                style={{ background: "linear-gradient(to bottom, transparent, var(--ivory) 92%)" }}
            />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
                <div
                    className="reveal relative mt-6"
                    style={{ isolation: "isolate" }}
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[340px] md:w-[340px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(39, 82, 65, 0.2) 0%, rgba(64, 145, 112, 0.10) 45%, transparent 72%)",
                        }}
                    />

                    <img
                        ref={shrineImgRef}
                        data-testid="ganesha-image"
                        src={images.ganesha}
                        alt="Lord Ganesha golden line artwork"
                        className="h-[38vw] max-h-[320px] min-h-[180px] w-auto will-change-transform [filter:drop-shadow(0_8px_34px_rgba(240,226,180,0.45))] [mask-image:linear-gradient(180deg,black_92%,transparent)] md:h-[400px]"
                    />
                </div>

                <div
                    data-testid="blessing-text"
                    className="relative mt-2 flex w-full max-w-2xl flex-col items-center gap-5 px-6 py-14 text-center md:max-w-3xl md:py-16"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -inset-x-10 -inset-y-8 -z-10 md:-inset-x-28 md:-inset-y-10"
                        style={{
                            background:
                                "radial-gradient(ellipse 62% 60% at 50% 50%, rgba(250,245,236,0.8) 0%, rgba(250,245,236,0.38) 55%, rgba(250,245,236,0) 85%)",
                        }}
                    />
                    <p className="reveal text-xs font-medium uppercase tracking-[0.32em] text-[#2B2620]/70">
                        {blessing.overline}
                    </p>
                    <p className="reveal reveal-delay-1 text-base leading-relaxed tracking-[0.08em] text-[#2B2620]/75">
                        {blessing.invite}
                    </p>
                    <p className="reveal reveal-delay-2 font-display text-5xl font-medium leading-tight text-[#2B2620] md:text-6xl">
                        {couple.groom}
                    </p>
                    <p className="reveal reveal-delay-2 font-display text-4xl italic text-[#B08D3F] md:text-5xl">
                        {blessing.join}
                    </p>
                    <p className="reveal reveal-delay-3 font-display text-5xl font-medium leading-tight text-[#2B2620] md:text-6xl">
                        {couple.bride}
                    </p>
                    <div className="reveal reveal-delay-3 py-1">
                        <Ornament />
                    </div>
                    <p className="reveal reveal-delay-3 font-display text-3xl text-[#2B2620] md:text-4xl">
                        {blessing.dateLine}
                    </p>
                    <p className="reveal reveal-delay-3 text-base uppercase tracking-[0.28em] text-[#B08D3F]">
                        {blessing.placeLine}
                    </p>
                    <p className="reveal reveal-delay-3 max-w-md text-base leading-relaxed tracking-[0.08em] text-[#2B2620]/75">
                        {blessing.request}
                    </p>
                </div>
            </div>
        </section>
    );
};