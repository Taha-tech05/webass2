import { useEffect, useState, useRef } from "react";

export default function Slider({ pstyle, isShot,setResult }) {
    const [arrowPos, setArrowPos] = useState(0);
    const dirRef = useRef(1); // useRef instead of useState for dir
    const segRefs = {
        wicket: useRef(null),
        runs0: useRef(null),
        runs1: useRef(null),
        runs2: useRef(null),
        runs3: useRef(null),
        runs4: useRef(null),
        runs6: useRef(null)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isShot) {
                return;
            }
            Object.values(segRefs).forEach(ref => {
                if (ref.current) {
                    ref.current.style.backgroundColor = ''; // Falls back to CSS file
                }
            });
            setArrowPos(prev => {
                let next = prev + dirRef.current;

                if (next >= 95) {
                    dirRef.current = -1;  // ← ref update is fine here
                    next = 95;
                } else if (next <= 0) {
                    dirRef.current = 1;   // ← ref update is fine here
                    next = 0;
                }
                return next;
            });
        }, 5);

        return () => clearInterval(interval);
    }, [isShot]);


    useEffect(() => {
        if (!isShot) {
            // Check where the arrow landed
            const pos = arrowPos / 95; // Convert back to 0.0 - 1.0 to match pstyle

            const check = (range) => pos >= range[0] && pos <= range[1];

            if (check(pstyle.wickets)) {
                segRefs.wicket.current.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
                setResult('Wicket');
            } else if (check(pstyle.runs0)) {
                segRefs.runs0.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('0 Runs');
            } else if (check(pstyle.runs1)) {
                segRefs.runs1.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('1 Run');
            } else if (check(pstyle.runs2)) {
                segRefs.runs2.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('2 Runs');
            } else if (check(pstyle.runs3)) {
                segRefs.runs3.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('3 Runs');
            } else if (check(pstyle.runs4)) {
                segRefs.runs4.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('4 Runs');
            } else if (check(pstyle.runs6)) {
                segRefs.runs6.current.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
                setResult('6 Runs');
            }
        }
    }, [isShot]);

    return (
        <div class="bar" id="bar">
            <div ref={segRefs.wicket} class="segment seg-wicket" style={{ flex: `${pstyle.wickets[1] - pstyle.wickets[0]}` }}>
                <h2>Wicket</h2></div>
            <div ref={segRefs.runs0} class="segment seg-0" style={{ flex: `${pstyle.runs0[1] - pstyle.runs0[0]}` }}><h2>0</h2></div>
            <div ref={segRefs.runs1} class="segment seg-1" style={{ flex: `${pstyle.runs1[1] - pstyle.runs1[0]}` }}><h2>1</h2></div>
            <div ref={segRefs.runs2} class="segment seg-2" style={{ flex: `${pstyle.runs2[1] - pstyle.runs2[0]}` }}><h2>2</h2></div>
            <div ref={segRefs.runs3} class="segment seg-3" style={{ flex: `${pstyle.runs3[1] - pstyle.runs3[0]}` }}><h2>3</h2></div>
            <div ref={segRefs.runs4} class="segment seg-4" style={{ flex: `${pstyle.runs4[1] - pstyle.runs4[0]}` }}><h2>4</h2></div>
            <div ref={segRefs.runs6} class="segment seg-6" style={{ flex: `${pstyle.runs6[1] - pstyle.runs6[0]}` }}><h2>6</h2></div>
            <div class="arrow" style={{ left: `${arrowPos}%` }}><span style={{ fontSize: '20px' }}>&#9650;</span>
            </div>
        </div>

    );
}