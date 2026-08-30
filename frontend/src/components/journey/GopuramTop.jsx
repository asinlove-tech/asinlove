import { useEffect, useRef } from "react";
import { couple } from "@/config";
import { ChevronDown } from "lucide-react";

export const GopuramTop = () => {
    const namesRef = useRef(null);

    useEffect(() => {
        // show immediately with a subtle blur -> fade entrance, same feel as before
        if (namesRef.current) {
            namesRef.current.style.opacity = "0";
            namesRef.current.style.filter = "blur(6px)";
            namesRef.current.style.transform = "translateY(18px)";
            try {
                namesRef.current.animate(
                    [
                        { opacity: 0, filter: "blur(6px)", transform: "translateY(18px)" },
                        { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
                    ],
                    { duration: 700, easing: "cubic-bezier(0.2,0.8,0.2,1)", fill: "forwards" },
                );
            } catch (e) {
                namesRef.current.style.opacity = "1";
                namesRef.current.style.filter = "none";
                namesRef.current.style.transform = "translateY(0)";
            }
        }
    }, []);

    return (
        <section
            data-testid="gopuram-top"
            aria-label={`Wedding invitation of ${couple.groom} and ${couple.bride}`}
            className="relative flex h-[100svh] flex-col items-center justify-between overflow-hidden gopuram-top-bg"
            style={{
                backgroundImage:
                    "url(/weddingSiteNew/images/gopuram-top-crop.webp), linear-gradient(180deg, #2f6a9c 0%, #5b7592 55%, #46739b 85%, #7a4340 100%)",
            }}
        >
            <div className="absolute inset-0 bg-[#E8A35C]/[0.05]" aria-hidden="true" />

            <div className="relative z-10 px-6 pt-[7vh] text-center">
                <div ref={namesRef} className="relative opacity-0 will-change-transform">
                    <h1
                        data-testid="hero-names"
                        className="hero-names relative font-display font-medium uppercase"
                    >
                        <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                            {couple.groom}
                        </span>
                        <span className="hero-and my-3 block text-xs tracking-[0.55em] sm:my-5 sm:text-sm">
                            {couple.and}
                        </span>
                        <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                            {couple.bride}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="relative z-10 pb-10 will-change-[opacity]" aria-hidden="true">
                <ChevronDown
                    data-testid="hero-scroll-cue"
                    className="scroll-cue h-6 w-6 text-[#FAF5EC]/85 [filter:drop-shadow(0_1px_6px_rgba(11,31,48,0.5))]"
                />
            </div>
        </section>
    );
};