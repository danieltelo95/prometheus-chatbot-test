import { useEffect, useRef, useState } from "react"
import { createAvatar } from "@prometheusavatar/core"
import * as PIXI from "pixi.js"

// pixi-live2d-display v0.4 discovers its animation ticker through window.PIXI.
// Without this, the model draws once but pose opacity (including arm variants)
// never updates.
const browserWindow = window as typeof window & { PIXI: typeof PIXI }
browserWindow.PIXI = PIXI

export function Avatar() {

    const containerRef = useRef<HTMLDivElement>(null)
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        if(!containerRef.current) return;
        
        let avatar: Awaited<ReturnType<typeof createAvatar>> | undefined;
        let cancelled = false;
        const init = async () => {

        try {
                avatar = await createAvatar({
                    container: containerRef.current!,
                    modelUrl: "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display@0.4.0/test/assets/haru/haru_greeter_t03.model3.json",
                    width: 800,
                    height: 600,
                    debug: true
                })

                if (cancelled) {
                    avatar.destroy();
                    return;
                }

                console.log('Avatar loaded', avatar)
                setStatus('ready')

                avatar?.on('emotion:change', ({ result }) => {
                    console.log(`Emotion: ${result.emotion} (${result.confidence})`
                    );
                });

                await avatar?.speak ('Hello! I\'m your AI assistant')
        } catch (error) {
            console.error('Error loading avatar: ', error)
            if (!cancelled) {
                setStatus('error')
                setErrorMessage(error instanceof Error ? error.message : 'The avatar could not be loaded.')
            }
        }
    }
        init();

        return () => {
            cancelled = true;
            avatar?.destroy();
        };
    }, []);



    return (
        <section className="avatar-shell">
            <header>
                <p className="eyebrow">AI assistant</p>
                <h1>Prometheus Avatar</h1>
                <p>{status === 'ready' ? 'Your assistant is ready.' : 'Preparing your assistant…'}</p>
            </header>
            <div className="avatar-stage" ref={containerRef} aria-label="Animated AI avatar" />
            {status === 'loading' && <div className="status">Loading avatar…</div>}
            {status === 'error' && (
                <div className="status error" role="alert">
                    <strong>Avatar unavailable</strong>
                    <span>{errorMessage}</span>
                </div>
            )}
        </section>

    )
}
