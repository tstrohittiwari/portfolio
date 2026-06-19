import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
    const { progress } = useProgress();

    // Displayed number — smoothly counts up toward real progress
    const [display, setDisplay] = useState(0);
    const rafRef = useRef<number | null>(null);
    const displayRef = useRef(0);

    // Smooth counter that follows useProgress
    useEffect(() => {
        const tick = () => {
            const diff = progress - displayRef.current;
            if (Math.abs(diff) < 0.5) {
                displayRef.current = progress;
            } else {
                displayRef.current += diff * 0.1;
            }
            setDisplay(Math.round(displayRef.current));
            if (displayRef.current < progress) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [progress]);

    // Once we reach 100, trigger slide-up then unmount
    const [done, setDone] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (progress >= 100) {
            // Small delay so "100" is visible for a beat before sliding up
            const t = setTimeout(() => setDone(true), 400);
            return () => clearTimeout(t);
        }
    }, [progress]);

    // Remove from DOM after animation completes (700ms transition)
    useEffect(() => {
        if (done) {
            const t = setTimeout(() => setHidden(true), 800);
            return () => clearTimeout(t);
        }
    }, [done]);

    if (hidden) return null;

    return (
        <div className={`loader-screen${done ? " loader-slide-up" : ""}`}>
            <span className="loader-number">{display}</span>
        </div>
    );
}
