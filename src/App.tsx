import { useEffect, useRef, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import "./App.css";
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

function App() {
  const [started, setStarted] = useState(false);
  const [siteLoading, setSiteLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLeaving, setLoadingLeaving] = useState(false);
  const [openingTrackChosen, setOpeningTrackChosen] = useState<number | null>(null);
  const [butterflyTransition, setButterflyTransition] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [finaleCountdown, setFinaleCountdown] = useState<number | null>(null);
  const [finaleReveal, setFinaleReveal] = useState(false);
  const [finaleReplay, setFinaleReplay] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [coffeeMoment, setCoffeeMoment] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const [familyMoment, setFamilyMoment] = useState(false);
  const [adventure, setAdventure] = useState<string | null>(null);
  const [angelMemory, setAngelMemory] = useState<string | null>(null);
  const [angelMemoryAnimation, setAngelMemoryAnimation] = useState(0);
  const [growthYear, setGrowthYear] = useState("2022");
  const [becomingView, setBecomingView] = useState("then");
  const [adventureVideoReady, setAdventureVideoReady] = useState(false);
  const [worldGreeting, setWorldGreeting] = useState<string | null>(null);
  const [soundtrackTrack, setSoundtrackTrack] = useState("niki");
  const [backgroundTrackIndex, setBackgroundTrackIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicCurrentTime, setMusicCurrentTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  const backgroundTracks = [
    {
      key: "niki",
      title: "Every Summertime",
      artist: "NIKI",
      src: "/memories/chapter-10/every-summertime.mp3",
    },
    {
      key: "sza",
      title: "Snooze",
      artist: "SZA",
      src: "/memories/chapter-10/snooze.mp3",
    },
    {
      key: "taylor",
      title: "Daylight",
      artist: "Taylor Swift",
      src: "/memories/chapter-10/daylight.mp3",
    },
  ];

  useEffect(() => {
    const imageAssets = [
      "/memories/chapter-01/hero.jpg",
      "/memories/chapter-02/coffee-shop.jpg",
      "/memories/chapter-02/coffee-detail.jpg",
      "/memories/chapter-04/picc.jpg",
      "/memories/chapter-04/family.jpg",
      "/memories/adventures/iloilo-poster.jpg",
      "/memories/adventures/antipolo.jpg",
      "/memories/adventures/zambales-poster.jpg",
      "/memories/chapter-07/2022-fixed.jpg",
      "/memories/chapter-07/2023.jpg",
      "/memories/chapter-07/2024.jpg",
      "/memories/chapter-07/2025.jpg",
      "/memories/chapter-07/2026.jpg",
      "/memories/chapter-08/then.jpg",
      "/memories/chapter-08/now.jpg",
      "/memories/chapter-10/niki.jpg",
      "/memories/chapter-10/sza.jpg",
      "/memories/chapter-10/taylor.jpg",
    ];

    const audioAssets = backgroundTracks.map((track) => track.src);

    const videoAssets = [
      "/memories/adventures/iloilo.mp4",
      "/memories/adventures/zambales.mp4",
      "/memories/chapter-09/izuhaan.mp4",
      "/memories/chapter-09/karen.mp4",
    ];

    const totalAssets = imageAssets.length + audioAssets.length + videoAssets.length;
    let completedAssets = 0;
    let finished = false;

    const updateProgress = () => {
      completedAssets += 1;
      setLoadingProgress(Math.min(100, Math.round((completedAssets / totalAssets) * 100)));
    };

    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();

        const finish = () => {
          updateProgress();
          resolve();
        };

        image.onload = finish;
        image.onerror = finish;
        image.src = src;
      });

    const loadMediaMetadata = (src: string, type: "audio" | "video") =>
      new Promise<void>((resolve) => {
        const media = document.createElement(type);
        let settled = false;

        const finish = () => {
          if (settled) {
            return;
          }

          settled = true;
          media.removeEventListener("loadedmetadata", finish);
          media.removeEventListener("canplay", finish);
          media.removeEventListener("error", finish);
          media.src = "";
          updateProgress();
          resolve();
        };

        media.preload = "metadata";
        media.addEventListener("loadedmetadata", finish);
        media.addEventListener("canplay", finish);
        media.addEventListener("error", finish);
        media.src = src;
        media.load();

        window.setTimeout(finish, 4500);
      });

    const finishLoading = () => {
      if (finished) {
        return;
      }

      finished = true;
      setLoadingProgress(100);

      window.setTimeout(() => {
        setLoadingLeaving(true);

        window.setTimeout(() => {
          setSiteLoading(false);
        }, 700);
      }, 420);
    };

    const minimumTime = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1450);
    });

    Promise.allSettled([
      ...imageAssets.map(loadImage),
      ...audioAssets.map((src) => loadMediaMetadata(src, "audio")),
      ...videoAssets.map((src) => loadMediaMetadata(src, "video")),
      minimumTime,
    ]).then(finishLoading);

    const fallback = window.setTimeout(finishLoading, 8000);

    return () => {
      finished = true;
      window.clearTimeout(fallback);
    };
  }, []);


  const openStory = () => {
    setActiveChapter(0);
    setStarted(true);
  };

  const runButterflyTransition = (nextChapter: number) => {
    if (butterflyTransition) {
      return;
    }

    setButterflyTransition(true);

    window.setTimeout(() => {
      setActiveChapter(nextChapter);
    }, 620);

    window.setTimeout(() => {
      setButterflyTransition(false);
    }, 1450);
  };

  const chooseOpeningTrack = (index: number) => {
    setOpeningTrackChosen(index);
    playBackgroundTrack(index);

    window.setTimeout(() => {
      runButterflyTransition(1);
    }, 280);
  };

  const chooseAnswer = (choice: string) => {
    setAnswer(choice);
  };

  const revealCoffeeMoment = () => {
    setCoffeeMoment(true);
  };

  const openEmail = () => {
    setEmailOpened(true);
  };

  const revealFamilyMoment = () => {
    setFamilyMoment(true);
  };

  const revealAdventure = (place: string) => {
    setAdventure(place);
  };

  const revealAngelMemory = (memory: string) => {
    if (angelMemory === memory) {
      setAngelMemory(null);
      return;
    }

    setAngelMemory(memory);
    setAngelMemoryAnimation((current) => current + 1);
  };

  const revealGrowthYear = (year: string) => {
    setGrowthYear(year);
  };
  useEffect(() => {
    setAdventureVideoReady(false);

    if (adventure !== "iloilo" && adventure !== "zambales") {
      return;
    }

    const timer = setTimeout(() => {
      setAdventureVideoReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [adventure]);
  const revealWorldGreeting = (greeting: string) => {
    if (worldGreeting === greeting) {
      setWorldGreeting(null);
      return;
    }

    setWorldGreeting(greeting);
  };

  const playBackgroundTrack = (index: number) => {
    const audio = backgroundAudioRef.current;
    const track = backgroundTracks[index];

    setBackgroundTrackIndex(index);
    setSoundtrackTrack(track.key);

    if (!audio) {
      return;
    }

    const currentSource = new URL(audio.src || window.location.href).pathname;

    if (currentSource !== track.src) {
      audio.src = track.src;
      audio.load();
    }

    audio.volume = 0.18;

    requestAnimationFrame(() => {
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    });
  };

  const playNextBackgroundTrack = () => {
    const nextIndex = (backgroundTrackIndex + 1) % backgroundTracks.length;
    playBackgroundTrack(nextIndex);
  };

  const toggleBackgroundMusic = () => {
    const audio = backgroundAudioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
      return;
    }

    audio.pause();
    setMusicPlaying(false);
  };

  const pauseBackgroundMusic = () => {
    const audio = backgroundAudioRef.current;

    if (!audio || audio.paused) {
      return;
    }

    audio.pause();
    setMusicPlaying(false);
  };

  const resumeBackgroundMusic = () => {
    const audio = backgroundAudioRef.current;

    if (!audio || !started) {
      return;
    }

    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  };

  const goToChapter = (chapter: number) => {
    const nextChapter = Math.max(1, Math.min(12, chapter));

    if (nextChapter === activeChapter) {
      return;
    }

    runButterflyTransition(nextChapter);
  };

  const goToNextChapter = () => {
    goToChapter(activeChapter + 1);
  };

  const goToPreviousChapter = () => {
    goToChapter(activeChapter - 1);
  };

  const seekBackgroundMusic = (value: number) => {
    const audio = backgroundAudioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }

    audio.currentTime = value;
    setMusicCurrentTime(value);
  };

  const formatMusicTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    if (activeChapter !== 12) {
      setFinaleCountdown(null);
      setFinaleReveal(false);
      setFinaleReplay(false);
      return;
    }

    setFinaleReplay(false);
    setFinaleReveal(false);
    setFinaleCountdown(3);

    const two = window.setTimeout(() => setFinaleCountdown(2), 950);
    const one = window.setTimeout(() => setFinaleCountdown(1), 1900);
    const reveal = window.setTimeout(() => {
      setFinaleCountdown(null);
      setFinaleReveal(true);
    }, 2850);

    return () => {
      window.clearTimeout(two);
      window.clearTimeout(one);
      window.clearTimeout(reveal);
    };
  }, [activeChapter]);

  const replayFinale = () => {
    setFinaleReplay(true);
    setFinaleCountdown(null);
    setFinaleReveal(false);

    window.setTimeout(() => {
      setFinaleReveal(true);
    }, 260);
  };

  const replayStory = () => {
    setFinaleReplay(false);
    setFinaleCountdown(null);
    setFinaleReveal(false);
    setLetterOpened(false);
    runButterflyTransition(1);
  };

  useEffect(() => {
    const audio = backgroundAudioRef.current;

    if (!audio || !started) {
      return;
    }

    const targetVolume = activeChapter >= 11 ? 0.09 : 0.18;
    const startVolume = audio.volume;
    const steps = 18;
    let step = 0;

    const fade = window.setInterval(() => {
      step += 1;
      const progress = step / steps;
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (step >= steps) {
        audio.volume = targetVolume;
        window.clearInterval(fade);
      }
    }, 35);

    return () => window.clearInterval(fade);
  }, [activeChapter, started]);

  useEffect(() => {
    if (!started) {
      return;
    }

    const chapterIds = [
      null,
      "chapter-one",
      "chapter-two",
      "chapter-three",
      "chapter-four",
      "chapter-five",
      "chapter-six",
      "chapter-seven",
      "chapter-eight",
      "chapter-nine",
      "chapter-ten",
      "chapter-eleven",
      "chapter-twelve",
    ];

    requestAnimationFrame(() => {
      if (activeChapter === 0) {
        document.querySelector(".opened-intro")?.scrollTo({ top: 0 });
        return;
      }

      const chapterId = chapterIds[activeChapter];
      if (chapterId) {
        document.getElementById(chapterId)?.scrollTo({ top: 0 });
      }
    });
  }, [activeChapter, started]);

  return (
    <main className={started ? `story-pager page-${activeChapter} ${openingTrackChosen === null ? "vibe-neutral" : `vibe-${backgroundTracks[backgroundTrackIndex].key}`}` : ""}>
      {siteLoading && (
        <div className={`site-loader ${loadingLeaving ? "site-loader-leaving" : ""}`}>
          <div className="site-loader-ambient" aria-hidden="true">
            <div className="site-loader-glow site-loader-glow-one" />
            <div className="site-loader-glow site-loader-glow-two" />

            <svg
              className="site-loader-svg"
              viewBox="0 0 900 700"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="loaderHeartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5b4da" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#f7cce6" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="#b99be8" stopOpacity="0.08" />
                </linearGradient>
                <radialGradient id="loaderStarGlow">
                  <stop offset="0%" stopColor="#fff9fd" stopOpacity="1" />
                  <stop offset="40%" stopColor="#efaed6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#c69be6" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                className="site-loader-heart-line"
                d="M450 525 C380 468 255 390 255 277 C255 192 350 164 450 258 C550 164 645 192 645 277 C645 390 520 468 450 525 Z"
                fill="none"
                stroke="url(#loaderHeartStroke)"
                strokeWidth="1.4"
              />

              {[
                [450, 525],
                [377, 470],
                [309, 398],
                [264, 313],
                [278, 234],
                [348, 201],
                [450, 258],
                [552, 201],
                [622, 234],
                [636, 313],
                [591, 398],
                [523, 470],
              ].map(([cx, cy], index) => (
                <g key={index} className={`site-loader-star site-loader-star-${index + 1}`}>
                  <circle cx={cx} cy={cy} r="15" fill="url(#loaderStarGlow)" />
                  <circle cx={cx} cy={cy} r="2.2" fill="#fff9fd" />
                </g>
              ))}
            </svg>

            <span className="site-loader-butterfly site-loader-butterfly-one">
              <i />
              <b />
              <i />
            </span>

            <span className="site-loader-butterfly site-loader-butterfly-two">
              <i />
              <b />
              <i />
            </span>
          </div>

          <div className="site-loader-content">
            <p className="site-loader-kicker">For Angel</p>

            <h1>
              Preparing
              <span>our little story.</span>
            </h1>

            <div className="site-loader-progress">
              <div className="site-loader-progress-track">
                <span style={{ width: `${loadingProgress}%` }} />
              </div>

              <div className="site-loader-progress-meta">
                <span>Loading memories</span>
                <strong>{loadingProgress}%</strong>
              </div>
            </div>

            <p className="site-loader-note">
              Photos, songs, and a few memories worth waiting for.
            </p>
          </div>
        </div>
      )}
      {butterflyTransition && (
        <div className="butterfly-transition" aria-hidden="true">
          <div className="butterfly-transition-glow" />

          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className={`pink-butterfly butterfly-${index + 1}`}
            >
              <i className="butterfly-wing butterfly-wing-left" />
              <i className="butterfly-body" />
              <i className="butterfly-wing butterfly-wing-right" />
            </span>
          ))}
        </div>
      )}

      <audio
        ref={backgroundAudioRef}
        preload="auto"
        onEnded={playNextBackgroundTrack}
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onLoadedMetadata={(event) => setMusicDuration(event.currentTarget.duration || 0)}
        onDurationChange={(event) => setMusicDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setMusicCurrentTime(event.currentTarget.currentTime)}
      />

      {started && (
        <div className="global-song-vibe" aria-hidden="true">
          <div className="global-song-vibe-wash" />
          <div className="global-song-vibe-glow global-song-vibe-glow-one" />
          <div className="global-song-vibe-glow global-song-vibe-glow-two" />
          <div className="global-song-vibe-grain" />
          <div className="global-song-vibe-stars">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {started && activeChapter > 0 && activeChapter < 12 && (
        <div className="chapter-pager" aria-label="Story navigation">
          <button
            type="button"
            className="chapter-pager-button chapter-pager-previous"
            onClick={goToPreviousChapter}
            disabled={activeChapter === 0}
          >
            <span>←</span>
            <strong>Previous</strong>
          </button>

          <div className="chapter-pager-progress">
            <span className="chapter-pager-kicker">
              {activeChapter === 0 ? "Opening" : `Chapter ${String(activeChapter).padStart(2, "0")}`}
            </span>

            <div className="chapter-pager-dots">
              {Array.from({ length: 13 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={activeChapter === index ? "active" : ""}
                  onClick={() => goToChapter(index)}
                  aria-label={index === 0 ? "Opening" : `Go to chapter ${index}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="chapter-pager-button chapter-pager-next"
            onClick={goToNextChapter}
            disabled={activeChapter === 12}
          >
            <strong>{activeChapter === 0 ? "Begin" : activeChapter === 12 ? "End" : "Next chapter"}</strong>
            <span>→</span>
          </button>
        </div>
      )}

      {started && openingTrackChosen !== null && (
        <button
          type="button"
          className={`site-music-control ${musicPlaying ? "playing" : ""}`}
          onClick={toggleBackgroundMusic}
          aria-label={musicPlaying ? "Pause background music" : "Play background music"}
        >
          <span className="site-music-icon">{musicPlaying ? "♫" : "♪"}</span>

          <span className="site-music-info">
            <strong>
              {backgroundTracks[backgroundTrackIndex].title}
            </strong>
            <small>
              {musicPlaying
                ? backgroundTracks[backgroundTrackIndex].artist
                : "Music paused"}
            </small>
          </span>

          <span className="site-music-state">
            {musicPlaying ? "Pause" : "Play"}
          </span>
        </button>
      )}

      {!started ? (
        <section className="intro">
          <div className="stars" />
          <div className="glow glow-pink" />
          <div className="glow glow-purple" />

          <svg
            className="intro-constellation"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#f7c4df" stopOpacity="0.08" />
              </linearGradient>

              <radialGradient id="constellationStar">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="45%" stopColor="#f6d5ea" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
              </radialGradient>

              <filter id="constellationGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="constellation-lines">
              <path d="M120 540 L260 430 L405 475 L545 345 L690 405 L850 285 L1040 350" />
              <path d="M260 430 L300 250 L485 205 L545 345" />
              <path d="M690 405 L760 585 L930 610 L1040 350" />
              <path d="M405 475 L360 650 L545 690 L760 585" />
              <path d="M485 205 L650 130 L850 285" />
            </g>

            <g className="constellation-stars" filter="url(#constellationGlow)">
              <circle cx="120" cy="540" r="16" />
              <circle cx="260" cy="430" r="18" />
              <circle cx="405" cy="475" r="14" />
              <circle cx="545" cy="345" r="20" />
              <circle cx="690" cy="405" r="15" />
              <circle cx="850" cy="285" r="19" />
              <circle cx="1040" cy="350" r="15" />
              <circle cx="300" cy="250" r="12" />
              <circle cx="485" cy="205" r="15" />
              <circle cx="650" cy="130" r="11" />
              <circle cx="760" cy="585" r="17" />
              <circle cx="930" cy="610" r="12" />
              <circle cx="360" cy="650" r="10" />
              <circle cx="545" cy="690" r="13" />
            </g>

            <g className="constellation-dust">
              <circle cx="175" cy="205" r="2" />
              <circle cx="230" cy="690" r="2" />
              <circle cx="395" cy="120" r="2" />
              <circle cx="570" cy="545" r="2" />
              <circle cx="735" cy="225" r="2" />
              <circle cx="875" cy="470" r="2" />
              <circle cx="1000" cy="180" r="2" />
              <circle cx="1090" cy="590" r="2" />
            </g>
          </svg>

          <div className="intro-orbit intro-orbit-one" />
          <div className="intro-orbit intro-orbit-two" />

          <div className="intro-content">
            <p className="eyebrow">
              A little something for someone special
            </p>

            <h1>ANGEL</h1>

            <p className="intro-date">September 16, 2026</p>

            <button className="esa-btn-primary" onClick={openStory}>
              Open
              <span>→</span>
            </button>

            <p className="intro-note">Take your time.</p>
          </div>
        </section>
      ) : (
        <>
          <section className="opened-intro soundtrack-gate">
            <div className="soundtrack-gate-content">
              <p className="eyebrow">Before the story starts...</p>

              <h2>Pick the soundtrack.</h2>

              <p className="soundtrack-gate-lead">
                Choose one of your favorites.
                <br />
                Let it play while we go back to where all of this began.
              </p>

              <div className="soundtrack-gate-grid">
                <button
                  type="button"
                  className={`soundtrack-gate-card ${openingTrackChosen === 0 ? "selected" : ""}`}
                  onClick={() => chooseOpeningTrack(0)}
                >
                  <span className="soundtrack-gate-cover">
                    <img src="/memories/chapter-10/niki.jpg" alt="Every Summertime" />
                    <span className="soundtrack-gate-play">▶</span>
                  </span>

                  <span className="soundtrack-gate-meta">
                    <span className="soundtrack-gate-number">01</span>
                    <span>
                      <strong>Every Summertime</strong>
                      <small>NIKI</small>
                    </span>
                  </span>

                  <span className="soundtrack-gate-mood">Warm memories</span>
                </button>

                <button
                  type="button"
                  className={`soundtrack-gate-card ${openingTrackChosen === 1 ? "selected" : ""}`}
                  onClick={() => chooseOpeningTrack(1)}
                >
                  <span className="soundtrack-gate-cover">
                    <img src="/memories/chapter-10/sza.jpg" alt="Snooze" />
                    <span className="soundtrack-gate-play">▶</span>
                  </span>

                  <span className="soundtrack-gate-meta">
                    <span className="soundtrack-gate-number">02</span>
                    <span>
                      <strong>Snooze</strong>
                      <small>SZA</small>
                    </span>
                  </span>

                  <span className="soundtrack-gate-mood">Late-night love</span>
                </button>

                <button
                  type="button"
                  className={`soundtrack-gate-card ${openingTrackChosen === 2 ? "selected" : ""}`}
                  onClick={() => chooseOpeningTrack(2)}
                >
                  <span className="soundtrack-gate-cover">
                    <img src="/memories/chapter-10/taylor.jpg" alt="Daylight" />
                    <span className="soundtrack-gate-play">▶</span>
                  </span>

                  <span className="soundtrack-gate-meta">
                    <span className="soundtrack-gate-number">03</span>
                    <span>
                      <strong>Daylight</strong>
                      <small>Taylor Swift</small>
                    </span>
                  </span>

                  <span className="soundtrack-gate-mood">Soft beginnings</span>
                </button>
              </div>

              <p className={`soundtrack-gate-status ${openingTrackChosen !== null ? "visible" : ""}`}>
                {openingTrackChosen !== null
                  ? `${backgroundTracks[openingTrackChosen].title} is playing...`
                  : "Your choice becomes the background of the story."}
              </p>
            </div>
          </section>

          <section className="story-section chapter-one" id="chapter-one">
            <div className="chapter-number">01</div>

            <div className="chapter-content">
              <p className="chapter-label">Chapter 01 · August 2022</p>

              <h2>Before There Was “Us”</h2>

              <p className="chapter-lead">
                Before you became my girlfriend...
                <br />
                you were my best friend.
              </p>

              <div className="story-copy">
                <p>
                  It started with scouting. An Advancement Camp, a bunch of
                  activities, and two people who didn't know where all of this
                  was going.
                </p>

                <p>
                  Somewhere along the way, you became my partner in crime.
                  The person I could talk to, laugh with, and spend way too
                  much time with.
                </p>

                <p>
                  We were just friends.
                  <br />
                  At least, that's what we thought.
                </p>
              </div>

              <div className="memory-frame chapter-one-memory actual-memory">
                <img
                  src="/memories/chapter-01/hero.jpg"
                  alt="A memory from August 2022"
                />
                <div className="memory-placeholder">
                  <span>August 2022</span>
                  <p>A memory will live here.</p>
                </div>
              </div>

              <div className="question-card">
                <p className="question-label">A very important question</p>

                <h3>Who fell first?</h3>

                <div className="answer-buttons">
                  <button
                    className={answer === "her" ? "selected" : ""}
                    onClick={() => chooseAnswer("her")}
                  >
                    She did. 😌
                  </button>

                  <button
                    className={answer === "me" ? "selected" : ""}
                    onClick={() => chooseAnswer("me")}
                  >
                    Obviously me. 👀
                  </button>
                </div>

                {answer && (
                  <div className="answer-result">
                    <span className="answer-result-line">
                      {answer === "her"
                        ? "That's one version of the story."
                        : "I'll let you believe that."}
                    </span>

                    <span className="answer-result-next">
                      Either way, somewhere along the way...
                      <br />
                      things started feeling a little different.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="story-section chapter-two" id="chapter-two">
            <div className="chapter-number">02</div>

            <div className="chapter-content">
              <p className="chapter-label">Chapter 02 · The Coffee Shop</p>

              <h2>The Moment I Realized</h2>

              <p className="chapter-lead">
                It wasn't a confession.
                <br />
                It wasn't some grand romantic moment.
                <br />
                It was just... us.
              </p>

              <div className="coffee-layout">
                <div className="memory-frame coffee-memory chapter-two-memory actual-memory">
                  <img
                    src="/memories/chapter-02/coffee-shop.jpg"
                    alt="The coffee shop memory"
                  />
                </div>

                <div className="coffee-story">
                  <p>I still remember that meeting at the coffee shop.</p>

                  <p>
                    The place was cold. We were sitting there, just talking
                    and doing our usual thing.
                  </p>

                  <p>
                    Then I noticed you scratching your palm because your skin
                    was peeling.
                  </p>

                  <p>I don't even know what happened to me that moment.</p>

                  <button
                    className="story-reveal-button"
                    onClick={revealCoffeeMoment}
                  >
                    {coffeeMoment
                      ? "And then... I held your hand."
                      : "What happened next?"}

                    <span>→</span>
                  </button>
                </div>
              </div>

              {coffeeMoment && (
                <div className="coffee-reveal">
                  <div className="reveal-line" />

                  <p>
                    I reached across the table and held your hand so you'd
                    stop scratching it.
                  </p>

                  <p>
                    And somehow...
                    <br />
                    we just stayed like that.
                  </p>

                  <p className="reveal-highlight">
                    That's when I realized I actually liked you.
                  </p>

                  <p>
                    I was too stunned to speak.
                    <br />
                    Honestly, I think I was paralyzed.
                  </p>

                  <div className="memory-frame small-memory chapter-two-detail actual-memory">
                    <img
                      src="/memories/chapter-02/coffee-detail.jpg"
                      alt="A detail from the coffee shop memory"
                    />
                  </div>
                </div>
              )}

              <div className="chapter-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>Funny how the smallest moments can change everything.</p>

                <span>03 ↓</span>
              </div>
            </div>
          </section>

          <section className="story-section chapter-three" id="chapter-three">
            <div className="chapter-number">03</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 03 · September 18, 2022
              </p>

              <h2>The Day You Said Yes</h2>

              <p className="chapter-lead">
                I thought I knew how that day would end.
                <br />
                I really didn't.
              </p>

              <div className="email-intro">
                <p>I was at school earlier that day. Then I went home.</p>

                <p>
                  I wasn't expecting anything special.
                  <br />
                  Until I checked my email.
                </p>
              </div>

              <button
                className={`email-open-button ${emailOpened ? "opened" : ""
                  }`}
                onClick={openEmail}
              >
                <span className="email-icon">✉</span>

                <span>{emailOpened ? "Email opened" : "Open the email"}</span>

                <span className="email-arrow">
                  {emailOpened ? "✓" : "→"}
                </span>
              </button>

              {emailOpened && (
                <div className="email-scene">
                  <div className="email-window">
                    <div className="email-topbar">
                      <div className="email-dots">
                        <span />
                        <span />
                        <span />
                      </div>

                      <p>Message</p>

                      <div className="email-topbar-space" />
                    </div>

                    <div className="email-header">
                      <div className="email-avatar">R</div>

                      <div className="email-meta">
                        <div className="email-from">
                          <strong>Ms. Rose</strong>
                          <span>September 18, 2022</span>
                        </div>

                        <p>to Sir Jay</p>
                      </div>
                    </div>

                    <div className="email-divider" />

                    <div className="email-body">
                      <p>Sir Jay,</p>

                      <p>
                        I just want to say thank you for having you in my
                        life, for being my ally and for being the one who
                        knows my everyday rant in life.
                      </p>

                      <p>
                        I never expected us to become this close. You became
                        someone I could trust, talk to, and make memories
                        with.
                      </p>

                      <p>
                        Despite our short time of courting, I hope that in the
                        next months, years and decades, you'll still be with
                        me.
                      </p>

                      <div className="email-yes">
                        <span>I am now saying</span>
                        <strong>YES.</strong>
                      </div>

                      <p>
                        Yes to the question you asked me before:
                        <br />
                        <em>“p'wede ba kitang ligawan?”</em>
                      </p>

                      <p>
                        This day, September 18, 2022, I am giving my heart,
                        trust, and soul to you.
                      </p>

                      <p>I am looking forward to making memories with you.</p>

                      <div className="email-signature">
                        <span>With love,</span>
                        <strong>Ms. Rose</strong>
                      </div>
                    </div>
                  </div>

                  <div className="email-after">
                    <div className="email-after-line" />

                    <p>I honestly didn't expect you to say yes.</p>

                    <p>
                      I was confused.
                      <br />
                      A little scared.
                      <br />
                      And I had absolutely no idea what I was supposed to do
                      next.
                    </p>

                    <p className="email-highlight">
                      But somehow...
                      <br />
                      you chose me.
                    </p>

                    <p>
                      And that email became the beginning of everything we
                      would eventually become.
                    </p>

                    <div className="date-stamp">
                      <span>SEPTEMBER</span>
                      <strong>18</strong>
                      <span>2022</span>
                    </div>

                    <p className="chapter-ending">The beginning of us.</p>
                  </div>
                </div>
              )}

              <div className="chapter-transition chapter-three-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  And from that day on...
                  <br />
                  we weren't just two scouts anymore.
                </p>

                <span>04 ↓</span>
              </div>
            </div>
          </section>

          <section className="story-section chapter-four" id="chapter-four">
            <div className="chapter-number">04</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 04 · June 25, 2023
              </p>

              <h2>When Our Worlds Met</h2>

              <p className="chapter-lead">
                You were already part of my life.
                <br />
                That day, you met the people who made me who I am.
              </p>

              <div className="family-intro">
                <p>It was my Senior High School graduation at PICC.</p>

                <p>
                  You told me you couldn't come.
                  <br />
                  You had errands.
                </p>

                <p>At least, that's what I was supposed to believe.</p>
              </div>

              <div className="family-photo-grid">
                <div className="memory-frame family-memory actual-memory">
                  <img
                    src="/memories/chapter-04/picc.jpg"
                    alt="PICC graduation memory"
                  />

                  <div className="memory-placeholder">
                    <span>June 25, 2023</span>
                    <p>PICC graduation memory</p>
                  </div>
                </div>

                <div className="memory-frame family-memory actual-memory">
                  <img
                    src="/memories/chapter-04/family.jpg"
                    alt="Meeting the family memory"
                  />

                  <div className="memory-placeholder">
                    <span>Our First Introduction</span>
                    <p>A memory will live here.</p>
                  </div>
                </div>
              </div>

              <div className="family-story">
                <p>
                  Somehow, your friend accidentally gave the plan away.
                  I had a feeling something was going on.
                </p>

                <p>
                  And when you actually showed up...
                  I knew this day was going to mean more than just graduation.
                </p>

                <button
                  className={`family-reveal-button ${familyMoment ? "revealed" : ""
                    }`}
                  onClick={revealFamilyMoment}
                >
                  <span>
                    {familyMoment
                      ? "This was the moment."
                      : "What made this day different?"}
                  </span>

                  <span className="family-arrow">
                    {familyMoment ? "✓" : "→"}
                  </span>
                </button>
              </div>

              {familyMoment && (
                <div className="family-reveal">
                  <div className="family-reveal-line" />

                  <p>I decided to officially introduce you to my parents.</p>

                  <p>
                    And honestly...
                    <br />
                    I was SUPER nervous.
                  </p>

                  <p>
                    Because out of everyone I've ever dated,
                    <br />
                    you were the first girl I wanted them to meet.
                  </p>

                  <p className="family-highlight">
                    My parents were happy.
                    <br />
                    Shocked, too.
                  </p>

                  <p>
                    And somewhere between that nervous introduction and seeing
                    everyone together...
                    I realized something.
                  </p>

                  <div className="family-realization">
                    <span>For the first time, I thought:</span>

                    <strong>
                      “Okay...
                      <br />
                      she's really part of my life now.”
                    </strong>
                  </div>

                  <p>
                    You weren't just someone I was dating anymore.
                    <br />
                    You were becoming part of my world.
                  </p>

                  <p className="family-final">
                    And somehow, our worlds started becoming one.
                  </p>
                </div>
              )}

              <div className="chapter-transition chapter-four-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  Then came the places we never expected to see together.
                </p>

                <span>05 ↓</span>
              </div>
            </div>
          </section>

          <section className="story-section chapter-five" id="chapter-five">
            <div className="chapter-number">05</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 05 · Our Little Adventures
              </p>

              <h2>Places We Never Planned</h2>

              <p className="chapter-lead">
                Somewhere along the way,
                <br />
                our story started collecting places.
              </p>

              <div className="adventure-intro">
                <p>
                  From long trips and scouting events to completely unplanned
                  dates, every place gave us another memory to keep.
                </p>

                <p>So let's take a little trip back.</p>
              </div>

              <div className="adventure-route">
                <div className="route-line" />

                <button
                  className={`adventure-stop ${adventure === "iloilo" ? "selected" : ""
                    }`}
                  onClick={() => revealAdventure("iloilo")}
                >
                  <span className="stop-dot" />
                  <span className="stop-number">01</span>
                  <strong>Iloilo</strong>
                  <small>18th National Jamboree</small>
                </button>

                <button
                  className={`adventure-stop ${adventure === "antipolo" ? "selected" : ""
                    }`}
                  onClick={() => revealAdventure("antipolo")}
                >
                  <span className="stop-dot" />
                  <span className="stop-number">02</span>
                  <strong>Antipolo</strong>
                  <small>The unplanned swimming date</small>
                </button>

                <button
                  className={`adventure-stop ${adventure === "zambales" ? "selected" : ""
                    }`}
                  onClick={() => revealAdventure("zambales")}
                >
                  <span className="stop-dot" />
                  <span className="stop-number">03</span>
                  <strong>Zambales</strong>
                  <small>Asia-Pacific Regional Jamboree</small>
                </button>
              </div>

              <div className="adventure-scene">
                <div className="adventure-memory memory-frame actual-memory">
                  {adventure === "iloilo" && (
                    <div className="adventure-video-scene">
                      {!adventureVideoReady ? (
                        <img
                          className="adventure-video-poster"
                          src="/memories/adventures/iloilo-poster.jpg"
                          alt="Iloilo memory"
                        />
                      ) : (
                        <video
                          className="adventure-video adventure-video-enter"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source
                            src="/memories/adventures/iloilo.mp4"
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  )}

                  {adventure === "antipolo" && (
                    <>
                      <img
                        src="/memories/adventures/antipolo.jpg"
                        alt="Antipolo memory"
                      />

                      <div className="memory-placeholder">
                        <span>Antipolo</span>
                        <p>A memory will live here.</p>
                      </div>
                    </>
                  )}

                  {adventure === "zambales" && (
                    <div className="adventure-video-scene">
                      {!adventureVideoReady ? (
                        <img
                          className="adventure-video-poster"
                          src="/memories/adventures/zambales-poster.jpg"
                          alt="Zambales memory"
                        />
                      ) : (
                        <video
                          className="adventure-video adventure-video-enter"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source
                            src="/memories/adventures/zambales.mp4"
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  )}
                  {!adventure && (
                    <div className="adventure-empty">
                      <span>Choose a place</span>
                      <p>There's a memory waiting for you.</p>
                    </div>
                  )}
                </div>

                <div className="adventure-story">
                  {!adventure && (
                    <>
                      <p className="question-label">
                        Where should we go first?
                      </p>

                      <h3>Pick a destination.</h3>

                      <p>
                        Three places.
                        <br />
                        Three different memories.
                      </p>
                    </>
                  )}

                  {adventure === "iloilo" && (
                    <>
                      <p className="adventure-location">
                        ILOILO · 18TH NATIONAL JAMBOREE
                      </p>

                      <h3>Our first big adventure.</h3>

                      <p>
                        You came with me to Iloilo, and somehow I ended up
                        introducing you to my parents' relatives too.
                      </p>

                      <p>
                        You were clingy, uneasy, and scared whenever I wasn't
                        around. New place, new people, and you didn't really
                        know what to expect.
                      </p>

                      <p>
                        But there we were.
                        <br />
                        Exploring somewhere new together.
                      </p>

                      <strong>No parents around. No limits. Just us.</strong>
                    </>
                  )}

                  {adventure === "antipolo" && (
                    <>
                      <p className="adventure-location">
                        ANTIPOLO · MARIA CRISTINA
                      </p>

                      <h3>The date we didn't plan.</h3>

                      <p>
                        My mom invited us to a seminar place in Maria
                        Cristina, Antipolo City.
                      </p>

                      <p>
                        We weren't planning on having a swimming date.
                        <br />
                        It just... happened.
                      </p>

                      <p>
                        And somehow, an ordinary invitation turned into
                        something neither of us expected.
                      </p>

                      <strong>
                        Our first swimming date.
                        <br />
                        Completely unplanned.
                      </strong>
                    </>
                  )}

                  {adventure === "zambales" && (
                    <>
                      <p className="adventure-location">
                        ZAMBALES · ASIA-PACIFIC REGIONAL JAMBOREE
                      </p>

                      <h3>Taking care of you.</h3>

                      <p>
                        You were sick for almost the entire week.
                        <br />
                        I was working, multitasking, and trying to keep up
                        with everything too.
                      </p>

                      <p>But I still wanted to make sure you were okay.</p>

                      <p>
                        Even when I was tired.
                        <br />
                        Even when things weren't perfect between us.
                      </p>

                      <strong>
                        Because being there for you shouldn't only happen when
                        things are easy.
                      </strong>
                    </>
                  )}
                </div>
              </div>

              <div className="adventure-ending">
                <div className="adventure-ending-line" />

                <p>
                  Looking back,
                  <br />
                  maybe the places weren't really the important part.
                </p>

                <strong>It was having you there with me.</strong>
              </div>

              <div className="chapter-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  And after all those adventures...
                  <br />
                  something else started changing.
                </p>

                <span>06 ↓</span>
              </div>
            </div>
          </section>

          <section className="story-section chapter-six" id="chapter-six">
            <div className="chapter-number">06</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 06 · The Little Angel Things
              </p>

              <h2>The Little Things I Know About You</h2>

              <div className="chapter-six-intro">
                <p className="chapter-lead">
                  Four years is a long time to know someone.
                  <br />
                  Long enough to notice the little things.
                </p>

                <p>
                  The tiny habits. The little reactions. The things you do
                  without even realizing you're doing them.
                </p>

                <p>
                  So here's a few things I've learned from spending all this
                  time with you.
                </p>
              </div>

              <div className="angel-memory-grid">
                <button
                  className={`angel-memory-card ${angelMemory === "clingy" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("clingy")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "clingy" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">♡</div>

                          <p className="angel-memory-number">01</p>

                          <h3>You get a little clingy.</h3>

                          <p>
                            Especially when we're somewhere unfamiliar.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`clingy-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>The little clingy one.</h3>

                        <p>
                          New place, new people, and suddenly you want me
                          nearby a little more than usual.
                        </p>

                        <strong>
                          And honestly?
                          <br />
                          I never really minded.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  className={`angel-memory-card ${angelMemory === "overthink" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("overthink")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "overthink" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">✦</div>

                          <p className="angel-memory-number">02</p>

                          <h3>You think a little too much.</h3>

                          <p>
                            Sometimes your mind turns one small thing into a
                            hundred possibilities.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`overthink-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>The overthinker.</h3>

                        <p>
                          I've watched you worry about things that probably
                          didn't deserve that much space in your head.
                        </p>

                        <strong>
                          So whenever your mind gets too loud,
                          <br />
                          I'll remind you to breathe.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  className={`angel-memory-card ${angelMemory === "soft" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("soft")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "soft" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">♡</div>

                          <p className="angel-memory-number">03</p>

                          <h3>You have the softest side.</h3>

                          <p>
                            The side of you that only really comes out when
                            you're comfortable.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`soft-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>The side I got to know.</h3>

                        <p>
                          Beneath everything else, there's this soft and
                          genuinely sweet side of you.
                        </p>

                        <strong>
                          I think getting to see that side of you
                          <br />
                          is one of my favorite things.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  className={`angel-memory-card ${angelMemory === "near" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("near")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "near" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">✧</div>

                          <p className="angel-memory-number">04</p>

                          <h3>You just want me nearby.</h3>

                          <p>
                            Especially when everything around you feels new.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`near-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>Just stay close.</h3>

                        <p>
                          Sometimes you don't need me to fix anything.
                          You just want to know I'm there.
                        </p>

                        <strong>
                          And sometimes,
                          <br />
                          being there is enough.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  className={`angel-memory-card ${angelMemory === "grown" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("grown")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "grown" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">✦</div>

                          <p className="angel-memory-number">05</p>

                          <h3>But you've grown so much.</h3>

                          <p>
                            And that's probably the part I'm most proud of.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`grown-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>Look at you now.</h3>

                        <p>
                          I've seen the clingy, unsure, soft version of you.
                          But I've also watched you become stronger and more
                          independent.
                        </p>

                        <strong>
                          You still have all those little things.
                          <br />
                          You just learned how to carry yourself too.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  className={`angel-memory-card ${angelMemory === "favorite" ? "selected" : ""
                    }`}
                  onClick={() => revealAngelMemory("favorite")}
                >
                  <div className="angel-memory-inner">
                    {angelMemory !== "favorite" ? (
                      <div className="angel-memory-front">
                        <div>
                          <div className="angel-memory-icon">♡</div>

                          <p className="angel-memory-number">06</p>

                          <h3>And somehow, it's all you.</h3>

                          <p>
                            All those little pieces became the person I love.
                          </p>
                        </div>

                        <span className="angel-memory-hint">
                          There's more to this
                        </span>
                      </div>
                    ) : (
                      <div
                        key={`favorite-${angelMemoryAnimation}`}
                        className="angel-memory-back animate__animated animate__jackInTheBox"
                      >
                        <h3>That's my favorite part.</h3>

                        <p>
                          I don't love just one version of you. I love the
                          whole collection of little things that makes you,
                          you.
                        </p>

                        <strong>
                          The girl I met.
                          <br />
                          The girl I grew with.
                          <br />
                          And the woman you're becoming.
                        </strong>

                        <span className="angel-memory-close">
                          Tap to close
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>

              <div className="angel-memory-quote">
                <p>
                  After four years, I don't think I could ever explain you
                  with just one word.
                </p>

                <strong>You're made of a thousand little things.</strong>
              </div>

              <div className="angel-memory-ending">
                <div className="angel-memory-ending-line" />

                <p>
                  And maybe that's what four years really does.
                  <br />
                  It lets you see the person behind the person.
                </p>

                <strong>
                  And I wouldn't trade getting to know you for anything.
                </strong>
              </div>

              <div className="chapter-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  Because while I've been learning all the little things
                  about you...
                  <br />
                  I've also watched you grow.
                </p>

                <span>07 ↓</span>
              </div>
            </div>
          </section>

          <section className="story-section chapter-seven" id="chapter-seven">
            <div className="chapter-seven-glow chapter-seven-glow-one" />
            <div className="chapter-seven-glow chapter-seven-glow-two" />

            <div className="chapter-seven-intro">
              <span className="chapter-label">
                Chapter 07 · Four Years of Growing
              </span>

              <h2>
                Four years sounds like a long time
                <br />
                when you say it out loud.
              </h2>

              <p>
                But when I look back at everything we've been through,
                <br />
                it feels like we've been growing into us one moment at a time.
              </p>
            </div>

            <div className="growth-timeline">
              <div className="growth-line">
                <div
                  className={`growth-line-progress ${growthYear === "2022"
                    ? "progress-one"
                    : growthYear === "2023"
                      ? "progress-two"
                      : growthYear === "2024"
                        ? "progress-three"
                        : growthYear === "2025"
                          ? "progress-four"
                          : "progress-five"
                    }`}
                />
              </div>

              <div className="growth-years">
                <button
                  className={`growth-year ${growthYear === "2022" ? "active" : ""
                    }`}
                  onClick={() => revealGrowthYear("2022")}
                >
                  <span>2022</span>
                  <small>The beginning</small>
                </button>

                <button
                  className={`growth-year ${growthYear === "2023" ? "active" : ""
                    }`}
                  onClick={() => revealGrowthYear("2023")}
                >
                  <span>2023</span>
                  <small>Becoming us</small>
                </button>

                <button
                  className={`growth-year ${growthYear === "2024" ? "active" : ""
                    }`}
                  onClick={() => revealGrowthYear("2024")}
                >
                  <span>2024</span>
                  <small>Learning</small>
                </button>

                <button
                  className={`growth-year ${growthYear === "2025" ? "active" : ""
                    }`}
                  onClick={() => revealGrowthYear("2025")}
                >
                  <span>2025</span>
                  <small>Growing</small>
                </button>

                <button
                  className={`growth-year ${growthYear === "2026" ? "active" : ""
                    }`}
                  onClick={() => revealGrowthYear("2026")}
                >
                  <span>2026</span>
                  <small>Still here</small>
                </button>
              </div>

              <div className="growth-story" key={growthYear}>
                {growthYear === "2022" && (
                  <div className="growth-story-content">
                    <div className="growth-story-memory">
                      <div className="growth-story-photo">
                        <img
                          src="/memories/chapter-07/2022-fixed.jpg"
                          alt="A memory from 2022"
                        />
                      </div>

                      <span>August — September 2022</span>
                    </div>

                    <div className="growth-story-text">
                      <div className="growth-story-number">01</div>

                      <h3>The Beginning</h3>

                      <p>
                        We started as two scouts who happened to become really
                        good friends.
                      </p>

                      <p>
                        Somewhere between scouting events, random
                        conversations, and being each other's partner in
                        crime, something started changing.
                      </p>

                      <strong>
                        We didn't know it yet, but this was the start of
                        everything.
                      </strong>
                    </div>
                  </div>
                )}

                {growthYear === "2023" && (
                  <div className="growth-story-content">
                    <div className="growth-story-memory">
                      <div className="growth-story-photo">
                        <img
                          src="/memories/chapter-07/2023.jpg"
                          alt="A memory from 2023"
                        />
                      </div>

                      <span>June 25, 2023 · PICC</span>
                    </div>

                    <div className="growth-story-text">
                      <div className="growth-story-number">02</div>

                      <h3>Becoming Us</h3>

                      <p>
                        By then, you weren't just someone I spent time with
                        anymore.
                      </p>

                      <p>
                        You were meeting my family, joining me in places that
                        mattered, and slowly becoming part of the life I was
                        building.
                      </p>

                      <strong>
                        That's when I realized this was becoming something
                        real.
                      </strong>
                    </div>
                  </div>
                )}

                {growthYear === "2024" && (
                  <div className="growth-story-content">
                    <div className="growth-story-memory">
                      <div className="growth-story-photo">
                        <img
                          src="/memories/chapter-07/2024.jpg"
                          alt="A memory from 2024"
                        />
                      </div>

                      <span>2024 · Learning each other</span>
                    </div>

                    <div className="growth-story-text">
                      <div className="growth-story-number">03</div>

                      <h3>Learning Each Other</h3>

                      <p>
                        We started learning the parts of each other that
                        aren't always easy to explain.
                      </p>

                      <p>
                        The habits. The moods. The little things that make us
                        laugh. The things that sometimes make us misunderstand
                        each other.
                      </p>

                      <strong>
                        Loving someone also meant learning how to understand
                        them.
                      </strong>
                    </div>
                  </div>
                )}

                {growthYear === "2025" && (
                  <div className="growth-story-content">
                    <div className="growth-story-memory">
                      <div className="growth-story-photo">
                        <img
                          src="/memories/chapter-07/2025.jpg"
                          alt="A memory from 2025"
                        />
                      </div>

                      <span>2025 · Growing together</span>
                    </div>

                    <div className="growth-story-text">
                      <div className="growth-story-number">04</div>

                      <h3>Growing Together</h3>

                      <p>
                        Life kept getting bigger. More responsibilities. More
                        things to figure out. More moments where we had to
                        grow up a little.
                      </p>

                      <p>
                        And somehow, through all of that, we kept finding our
                        way back to each other.
                      </p>

                      <strong>
                        We weren't perfect. We were simply growing together.
                      </strong>
                    </div>
                  </div>
                )}

                {growthYear === "2026" && (
                  <div className="growth-story-content">
                    <div className="growth-story-memory">
                      <div className="growth-story-photo">
                        <img
                          src="/memories/chapter-07/2026.jpg"
                          alt="A memory from 2026"
                        />
                      </div>

                      <span>2026 · Present</span>
                    </div>

                    <div className="growth-story-text">
                      <div className="growth-story-number">05</div>

                      <h3>Still Here</h3>

                      <p>
                        Four years later, we're not the same two people who
                        met in 2022.
                      </p>

                      <p>
                        We've changed. We've learned. We've grown into
                        different versions of ourselves.
                      </p>

                      <p>
                        And honestly, I think that's one of the most beautiful
                        parts of our story.
                      </p>

                      <strong>
                        We didn't stay the same.
                        <br />
                        We grew.
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="growth-reflection">
              <div className="growth-reflection-line" />

              <p>I don't want to go back to the beginning.</p>

              <strong>I want to see where we go from here.</strong>

              <div className="growth-reflection-line" />
            </div>

            <div className="chapter-transition chapter-seven-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

              <p>
                Because somewhere along the way,
                <br />
                the girl I met started becoming someone I admire even more.
              </p>

              <span>08 ↓</span>
            </div>
          </section>
          <section className="story-section chapter-eight" id="chapter-eight">
            <div className="chapter-eight-glow chapter-eight-glow-one" />
            <div className="chapter-eight-glow chapter-eight-glow-two" />

            <div className="chapter-number">08</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 08 · The Girl I Met → The Woman You’re Becoming
              </p>

              <h2>
                I met one version of you.
                <br />
                And somehow, I got to watch you become more.
              </h2>

              <p className="chapter-lead">
                Four years ago, I met a girl who was still figuring things out.
                <br />
                Honestly, we both were.
              </p>

              <div className="becoming-switch">
                <button
                  className={becomingView === "then" ? "active" : ""}
                  onClick={() => setBecomingView("then")}
                >
                  <span>THEN</span>
                  <small>2022</small>
                </button>

                <div className="becoming-switch-line">
                  <span
                    className={
                      becomingView === "then"
                        ? "becoming-switch-dot then"
                        : "becoming-switch-dot now"
                    }
                  />
                </div>

                <button
                  className={becomingView === "now" ? "active" : ""}
                  onClick={() => setBecomingView("now")}
                >
                  <span>NOW</span>
                  <small>2026</small>
                </button>
              </div>

              <div className="becoming-scene" key={becomingView}>
                {becomingView === "then" && (
                  <div className="becoming-panel">
                    <div className="becoming-photo">
                      <img
                        src="/memories/chapter-08/then.jpg"
                        alt="Angel in 2022"
                      />

                      <div className="becoming-photo-overlay">
                        <span>2022</span>
                        <strong>The girl I met.</strong>
                      </div>
                    </div>

                    <div className="becoming-story">
                      <p className="becoming-eyebrow">BACK THEN</p>

                      <h3>You were still finding your way.</h3>

                      <p>
                        You were soft, sometimes unsure, sometimes scared of things you
                        didn't completely understand yet.
                      </p>

                      <p>
                        There were moments when you wanted me close because everything
                        around you felt unfamiliar.
                      </p>

                      <p>
                        You overthought things.
                        <br />
                        You worried.
                        <br />
                        You doubted yourself.
                      </p>

                      <strong>
                        But even then,
                        <br />
                        I already saw something special in you.
                      </strong>
                    </div>
                  </div>
                )}

                {becomingView === "now" && (
                  <div className="becoming-panel">
                    <div className="becoming-photo">
                      <img
                        src="/memories/chapter-08/now.jpg"
                        alt="Angel in 2026"
                      />

                      <div className="becoming-photo-overlay">
                        <span>2026</span>
                        <strong>The woman you're becoming.</strong>
                      </div>
                    </div>

                    <div className="becoming-story">
                      <p className="becoming-eyebrow">AND NOW</p>

                      <h3>Look at how far you've come.</h3>

                      <p>
                        You're still the same Angel I met.
                        <br />
                        You still have that soft side.
                        <br />
                        You still overthink sometimes.
                      </p>

                      <p>
                        But you're stronger now.
                        More independent.
                        More capable of standing on your own.
                      </p>

                      <p>
                        I've watched you learn how to carry yourself through things that
                        used to scare you.
                      </p>

                      <strong>
                        And I hope you know how proud I am
                        <br />
                        of the person you're becoming.
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="becoming-reflection">
                <span className="becoming-reflection-small">
                  The beautiful part is...
                </span>

                <p>
                  I didn't fall in love with one frozen version of you.
                </p>

                <strong>
                  I got to fall in love with you
                  <br />
                  while you were becoming yourself.
                </strong>
              </div>

              <div className="becoming-letter">
                <div className="becoming-letter-line" />

                <p>
                  And maybe years from now,
                  <br />
                  you'll be different again.
                </p>

                <p>
                  You'll learn new things.
                  <br />
                  You'll change your mind.
                  <br />
                  You'll discover parts of yourself you haven't met yet.
                </p>

                <strong>
                  And I hope I still get to be there
                  <br />
                  to meet every version of you.
                </strong>
              </div>

              <div className="chapter-transition chapter-eight-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  But this birthday isn't only about looking back.
                  <br />
                  There are people from different places who wanted to be part of today too.
                </p>

                <span>09 ↓</span>
              </div>
            </div>
          </section>
          <section className="story-section chapter-nine" id="chapter-nine">
            <div className="chapter-nine-glow chapter-nine-glow-one" />
            <div className="chapter-nine-glow chapter-nine-glow-two" />

            <div className="chapter-number">09</div>

            <div className="chapter-content">
              <p className="chapter-label">Chapter 09 · From Around the World</p>

              <h2>
                A few people wanted
                <br />
                to say something too.
              </h2>

              <p className="chapter-lead">
                Different places.
                <br />
                Different languages.
                <br />
                One birthday girl.
              </p>

              <div className="world-intro">
                <p>
                  So before we continue...
                  <br />
                  here are a few little messages that traveled quite a long way to get
                  here.
                </p>
              </div>

              <div className="world-greeting-grid">
                <button
                  className={`world-greeting-card ${worldGreeting === "maldives" ? "active" : ""
                    }`}
                  onClick={() => revealWorldGreeting("maldives")}
                >
                  <div className="world-country-row">
                    <span className="fi fi-mv world-flag"></span>
                    <span className="world-country">Maldives</span>
                  </div>

                  <div className="world-greeting-center">
                    <span className="world-greeting-icon">✦</span>
                    <h3>Izuhaan</h3>
                    <p>A message from across the ocean.</p>
                  </div>

                  <span className="world-greeting-action">
                    {worldGreeting === "maldives" ? "Close" : "Open message"}
                  </span>
                </button>

                <button
                  className={`world-greeting-card ${worldGreeting === "hongkong" ? "active" : ""
                    }`}
                  onClick={() => revealWorldGreeting("hongkong")}
                >
                  <div className="world-country-row">
                    <span className="fi fi-hk world-flag"></span>
                    <span className="world-country">Hong Kong</span>
                  </div>

                  <div className="world-greeting-center">
                    <span className="world-greeting-icon">♫</span>
                    <h3>Karen</h3>
                    <p>With a little birthday song in Cantonese.</p>
                  </div>

                  <span className="world-greeting-action">
                    {worldGreeting === "hongkong" ? "Close" : "Open message"}
                  </span>
                </button>

              </div>

              <div className="world-message-stage">
                {!worldGreeting && (
                  <div className="world-message-empty">
                    <span>Choose a message</span>
                    <p>Someone has something to say to you.</p>
                  </div>
                )}

                {worldGreeting === "maldives" && (
                  <div className="world-message-panel">
                    <div className="world-message-heading">
                      <span>Maldives</span>
                      <h3>Izuhaan</h3>
                    </div>

                    <div className="world-video-frame">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        onPlay={pauseBackgroundMusic}
                        onPause={resumeBackgroundMusic}
                        onEnded={resumeBackgroundMusic}
                      >
                        <source
                          src="/memories/chapter-09/izuhaan.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>

                    <p className="world-message-note">
                      A little birthday message that traveled all the way from the
                      Maldives.
                    </p>
                  </div>
                )}

                {worldGreeting === "hongkong" && (
                  <div className="world-message-panel">
                    <div className="world-message-heading">
                      <span>Hong Kong</span>
                      <h3>Karen</h3>
                    </div>

                    <div className="world-video-frame">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        onPlay={pauseBackgroundMusic}
                        onPause={resumeBackgroundMusic}
                        onEnded={resumeBackgroundMusic}
                      >
                        <source
                          src="/memories/chapter-09/karen.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>

                    <p className="world-message-note">
                      A birthday wish from Hong Kong — sung in a language that deserved
                      its own little translation.
                    </p>

                    <div className="cantonese-translation">
                      <div className="translation-header">
                        <span className="translation-note">♫</span>
                        <div>
                          <span className="translation-label">Cantonese Birthday Song</span>
                          <h4>A little translation for you</h4>
                        </div>
                      </div>

                      <div className="translation-lines">
                        <div className="translation-line">
                          <span className="translation-cantonese">恭祝你福壽與天齊</span>
                          <span className="translation-english">
                            Wishing you happiness and long life.
                          </span>
                        </div>

                        <div className="translation-line">
                          <span className="translation-cantonese">慶賀你生辰快樂</span>
                          <span className="translation-english">Happy birthday to you.</span>
                        </div>

                        <div className="translation-line">
                          <span className="translation-cantonese">年年都有今日</span>
                          <span className="translation-english">
                            May you have this day every year,
                          </span>
                        </div>

                        <div className="translation-line">
                          <span className="translation-cantonese">歲歲都有今朝</span>
                          <span className="translation-english">
                            And this joyful moment too.
                          </span>
                        </div>

                        <div className="translation-line translation-line-final">
                          <span className="translation-cantonese">恭喜你！恭喜你！</span>
                          <span className="translation-english">
                            Congratulations! Congratulations!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <div className="world-ending">
                <div className="world-ending-line" />

                <p>
                  Different places. Different voices.
                  <br />
                  But somehow, they both found their way here just to celebrate you.
                </p>

                <strong>
                  Because today isn't about how many people remembered.
                  <br />
                  It's about the people who wanted to remind you that you're worth celebrating.
                </strong>
              </div>

              <div className="chapter-transition chapter-nine-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  And after hearing from everyone else...
                  <br />
                  there's still one person who has a lot left to say.
                </p>

                <span>10 ↓</span>
              </div>
            </div>
          </section>
          <section
            className={`story-section chapter-ten soundtrack-${soundtrackTrack}`}
            id="chapter-ten"
          >
            <div className="soundtrack-atmosphere">
              <div className="soundtrack-glow soundtrack-glow-one" />
              <div className="soundtrack-glow soundtrack-glow-two" />

              <div className="soundtrack-stars">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg
                className="soundtrack-sunrise"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient
                    id="sunriseGlow"
                    cx="50%"
                    cy="100%"
                    r="70%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(255, 239, 196, 0.9)"
                    />

                    <stop
                      offset="28%"
                      stopColor="rgba(255, 208, 218, 0.48)"
                    />

                    <stop
                      offset="58%"
                      stopColor="rgba(205, 180, 255, 0.2)"
                    />

                    <stop
                      offset="100%"
                      stopColor="rgba(0, 0, 0, 0)"
                    />
                  </radialGradient>

                  <linearGradient
                    id="daylightRay"
                    x1="50%"
                    y1="100%"
                    x2="50%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(255, 245, 220, 0.4)"
                    />

                    <stop
                      offset="100%"
                      stopColor="rgba(255, 255, 255, 0)"
                    />
                  </linearGradient>
                </defs>

                <ellipse
                  className="sunrise-orb"
                  cx="720"
                  cy="830"
                  rx="420"
                  ry="220"
                  fill="url(#sunriseGlow)"
                />

                <path
                  className="sunrise-ray sunrise-ray-one"
                  d="M680 900 L330 0 L760 0 Z"
                  fill="url(#daylightRay)"
                />

                <path
                  className="sunrise-ray sunrise-ray-two"
                  d="M760 900 L900 0 L1220 0 Z"
                  fill="url(#daylightRay)"
                />
              </svg>

              <div className="soundtrack-horizon" />
            </div>

            <div className="chapter-number">10</div>

            <div className="chapter-content">
              <p className="chapter-label">
                Chapter 10 · Our Soundtrack
              </p>

              <h2>
                Somehow,
                <br />
                some memories sound like songs.
              </h2>

              <p className="chapter-lead soundtrack-lead">
                There are songs you hear once and forget.
                <br />
                And then there are songs that somehow become attached to a person.
              </p>

              <div className="soundtrack-intro">
                <p>
                  These aren't every song that reminds me of you.
                </p>

                <p>
                  But if I had to choose a few that somehow feel like different parts
                  of us...
                </p>

                <strong>
                  maybe it would sound something like this.
                </strong>
              </div>

              <div className="spotify-album">
                <div className="spotify-album-hero">
                  <div className="spotify-album-cover">
                    <img
                      src={
                        soundtrackTrack === "niki"
                          ? "/memories/chapter-10/niki.jpg"
                          : soundtrackTrack === "sza"
                            ? "/memories/chapter-10/sza.jpg"
                            : "/memories/chapter-10/taylor.jpg"
                      }
                      alt={`${backgroundTracks[backgroundTrackIndex].title} cover`}
                    />

                    <button
                      type="button"
                      className="spotify-cover-play"
                      onClick={toggleBackgroundMusic}
                      aria-label={musicPlaying ? "Pause music" : "Play music"}
                    >
                      {musicPlaying ? "Ⅱ" : "▶"}
                    </button>
                  </div>

                  <div className="spotify-album-copy">
                    <span className="spotify-album-label">OUR SOUNDTRACK</span>
                    <h3>Angel, this one is ours.</h3>
                    <p>
                      Three songs. Three different parts of us.
                      <br />
                      Press a track and let the story keep playing.
                    </p>

                    <div className="spotify-now-playing">
                      <span className={`spotify-equalizer ${musicPlaying ? "playing" : ""}`}>
                        <i />
                        <i />
                        <i />
                      </span>

                      <div>
                        <strong>{backgroundTracks[backgroundTrackIndex].title}</strong>
                        <small>{backgroundTracks[backgroundTrackIndex].artist}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="spotify-track-list">
                  {backgroundTracks.map((track, index) => (
                    <button
                      key={track.key}
                      type="button"
                      className={`spotify-track-row ${backgroundTrackIndex === index ? "active" : ""}`}
                      onClick={() => playBackgroundTrack(index)}
                    >
                      <span className="spotify-track-number">
                        {backgroundTrackIndex === index && musicPlaying ? "♫" : String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="spotify-track-thumb">
                        <img
                          src={
                            index === 0
                              ? "/memories/chapter-10/niki.jpg"
                              : index === 1
                                ? "/memories/chapter-10/sza.jpg"
                                : "/memories/chapter-10/taylor.jpg"
                          }
                          alt=""
                        />
                      </span>

                      <span className="spotify-track-copy">
                        <strong>{track.title}</strong>
                        <small>{track.artist}</small>
                      </span>

                      <span className="spotify-track-mood">
                        {index === 0 ? "Warm sunset" : index === 1 ? "Intimate night" : "Soft daylight"}
                      </span>

                      <span className="spotify-track-play">
                        {backgroundTrackIndex === index && musicPlaying ? "Ⅱ" : "▶"}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="spotify-player-bar">
                  <button
                    type="button"
                    className="spotify-player-button"
                    onClick={() =>
                      playBackgroundTrack(
                        (backgroundTrackIndex - 1 + backgroundTracks.length) %
                          backgroundTracks.length
                      )
                    }
                    aria-label="Previous song"
                  >
                    ◀
                  </button>

                  <button
                    type="button"
                    className="spotify-player-main"
                    onClick={toggleBackgroundMusic}
                    aria-label={musicPlaying ? "Pause music" : "Play music"}
                  >
                    {musicPlaying ? "Ⅱ" : "▶"}
                  </button>

                  <button
                    type="button"
                    className="spotify-player-button"
                    onClick={playNextBackgroundTrack}
                    aria-label="Next song"
                  >
                    ▶
                  </button>

                  <span className="spotify-player-time">
                    {formatMusicTime(musicCurrentTime)}
                  </span>

                  <input
                    className="spotify-player-progress"
                    type="range"
                    min="0"
                    max={musicDuration || 0}
                    step="0.1"
                    value={Math.min(musicCurrentTime, musicDuration || 0)}
                    onChange={(event) => seekBackgroundMusic(Number(event.target.value))}
                    aria-label="Song progress"
                  />

                  <span className="spotify-player-time">
                    {formatMusicTime(musicDuration)}
                  </span>
                </div>
              </div>

              <div className="soundtrack-stage">
                {soundtrackTrack === "niki" && (
                  <div className="soundtrack-memory soundtrack-memory-niki">
                    <div className="soundtrack-memory-top">
                      <span>01 · NIKI</span>
                      <p>Every Summertime</p>
                    </div>

                    <div className="soundtrack-memory-content">
                      <div className="soundtrack-memory-photo">
                        <img
                          src="/memories/chapter-10/niki.jpg"
                          alt="Every Summertime memory"
                        />
                      </div>

                      <div className="soundtrack-memory-story">
                        <span className="soundtrack-mood">
                          Warm sunset
                        </span>

                        <h3>
                          For the memories
                          <br />
                          that still feel warm.
                        </h3>

                        <p>
                          This one feels like looking back at everything when it was
                          still new.
                        </p>

                        <p>
                          Two scouts. Two friends. Random conversations, small moments,
                          unexpected feelings, and somehow the beginning of something
                          neither of us completely understood yet.
                        </p>

                        <p>
                          It reminds me of the kind of memories that become warmer the
                          older they get.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {soundtrackTrack === "sza" && (
                  <div className="soundtrack-memory soundtrack-memory-sza">
                    <div className="soundtrack-memory-top">
                      <span>02 · SZA</span>
                      <p>Snooze</p>
                    </div>

                    <div className="soundtrack-memory-content">
                      <div className="soundtrack-memory-photo">
                        <img
                          src="/memories/chapter-10/sza.jpg"
                          alt="Snooze memory"
                        />
                      </div>

                      <div className="soundtrack-memory-story">
                        <span className="soundtrack-mood">
                          Intimate night
                        </span>

                        <h3>
                          For the moments when
                          <br />
                          just having you close is enough.
                        </h3>

                        <p>
                          Not every memory has to be some huge adventure.
                        </p>

                        <p>
                          Sometimes it's just sitting beside you, hearing you talk,
                          knowing you're nearby, or doing absolutely nothing special
                          together.
                        </p>

                        <p>
                          And somehow those ordinary moments became some of the ones I
                          value the most.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {soundtrackTrack === "taylor" && (
                  <div className="soundtrack-memory soundtrack-memory-taylor">
                    <div className="soundtrack-memory-top">
                      <span>03 · Taylor Swift</span>
                      <p>Daylight</p>
                    </div>

                    <div className="soundtrack-memory-content">
                      <div className="soundtrack-memory-photo">
                        <img
                          src="/memories/chapter-10/taylor.jpg"
                          alt="Daylight memory"
                        />
                      </div>

                      <div className="soundtrack-memory-story">
                        <span className="soundtrack-mood">
                          Soft daylight
                        </span>

                        <h3>
                          For all the versions of us
                          <br />
                          we haven't met yet.
                        </h3>

                        <p>
                          We've already changed so much since the people we were when we
                          first met.
                        </p>

                        <p>
                          And I don't think love is supposed to mean staying exactly the
                          same forever.
                        </p>

                        <p>
                          Maybe it's getting to know each other again and again as life
                          changes us.
                        </p>

                        <p>
                          And if I'm lucky, I still get to meet every version of you
                          that's waiting somewhere ahead.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="soundtrack-reflection">
                <div className="soundtrack-reflection-line" />

                <p>
                  Sunset.
                  <br />
                  Night.
                  <br />
                  Daylight.
                </p>

                <strong>
                  Maybe that's what loving someone for years feels like.
                </strong>

                <p>
                  You don't stay in one moment forever.
                  <br />
                  You keep moving through them together.
                </p>
              </div>

              <div className="chapter-transition soundtrack-transition">
              <svg
                className="chapter-transition-svg"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="transitionGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#f1a9d1" stopOpacity="0" />
                    <stop offset="28%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                    <stop offset="72%" stopColor="#f1a9d1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f1a9d1" stopOpacity="0" />
                  </linearGradient>

                  <radialGradient id="transitionNode">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f5cbe4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="chapter-transition-path"
                  d="M20 60 C135 60 145 25 255 60 S375 95 465 60 S590 25 700 60"
                />

                <circle className="chapter-transition-node node-one" cx="255" cy="60" r="11" />
                <circle className="chapter-transition-node node-two" cx="465" cy="60" r="11" />
                <circle className="chapter-transition-node node-center" cx="360" cy="60" r="15" />
              </svg>

                <p>
                  And now that everyone else has had their turn...
                  <br />
                  I think it's finally mine.
                </p>

                <span>11 ↓</span>
              </div>
            </div>
          </section>

          <section id="chapter-eleven" className="story-section chapter-eleven letter-chapter">
            <div className="letter-ambient" aria-hidden="true">
              <svg
                className="letter-ambient-svg"
                viewBox="0 0 1200 900"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="letterLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f4b8da" stopOpacity="0" />
                    <stop offset="48%" stopColor="#f4b8da" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#c6a6f2" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="letterHeartGlow">
                    <stop offset="0%" stopColor="#fff7fb" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#efb4d8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#c09ae7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  className="letter-ambient-line"
                  d="M70 660 C250 520 340 760 520 610 S810 430 1130 560"
                  fill="none"
                  stroke="url(#letterLineGlow)"
                  strokeWidth="1.2"
                />

                <path
                  className="letter-ambient-line letter-ambient-line-two"
                  d="M90 250 C330 390 480 120 700 280 S960 380 1160 210"
                  fill="none"
                  stroke="url(#letterLineGlow)"
                  strokeWidth="0.8"
                />

                <circle cx="520" cy="610" r="54" fill="url(#letterHeartGlow)" />
                <circle cx="700" cy="280" r="42" fill="url(#letterHeartGlow)" />
              </svg>
            </div>

            <div className="chapter-number">11</div>

            <div className="chapter-content letter-chapter-content">
              <p className="chapter-label">Chapter 11 · From Me to You</p>

              <div className="letter-intro">
                <span>Okay...</span>
                <h2>
                  Everyone else
                  <br />
                  had their turn.
                </h2>
                <p>Now it's mine.</p>
              </div>

              {!letterOpened ? (
                <div className="letter-envelope-scene">
                  <button
                    type="button"
                    className="letter-envelope-button"
                    onClick={() => setLetterOpened(true)}
                    aria-label="Open my letter"
                  >
                    <svg
                      className="letter-envelope-svg"
                      viewBox="0 0 520 360"
                      role="img"
                      aria-label="A sealed letter for Angel"
                    >
                      <defs>
                        <linearGradient id="envelopePaper" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fff9fc" />
                          <stop offset="100%" stopColor="#eadce8" />
                        </linearGradient>
                        <linearGradient id="envelopeFlap" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f2dce9" />
                          <stop offset="100%" stopColor="#dcc5da" />
                        </linearGradient>
                        <radialGradient id="sealGlow">
                          <stop offset="0%" stopColor="#ffbddf" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ae6fbc" stopOpacity="0.85" />
                        </radialGradient>
                      </defs>

                      <rect
                        x="40"
                        y="70"
                        width="440"
                        height="250"
                        rx="24"
                        fill="url(#envelopePaper)"
                      />

                      <path
                        d="M40 92 L260 250 L480 92"
                        fill="url(#envelopeFlap)"
                        stroke="rgba(118, 76, 112, 0.18)"
                        strokeWidth="2"
                      />

                      <path
                        d="M40 320 L205 190"
                        fill="none"
                        stroke="rgba(118, 76, 112, 0.14)"
                        strokeWidth="2"
                      />

                      <path
                        d="M480 320 L315 190"
                        fill="none"
                        stroke="rgba(118, 76, 112, 0.14)"
                        strokeWidth="2"
                      />

                      <circle cx="260" cy="238" r="33" fill="url(#sealGlow)" />

                      <path
                        d="M260 253 C238 238 225 227 225 211 C225 194 238 184 252 184 C260 184 266 188 271 195 C276 188 283 184 291 184 C305 184 317 194 317 211 C317 227 303 238 281 253 L271 260 Z"
                        fill="#fff7fb"
                        transform="translate(-11 4) scale(.96)"
                      />
                    </svg>

                    <span className="letter-envelope-to">For Angel</span>
                    <span className="letter-envelope-open">Open my letter</span>
                  </button>

                  <p className="letter-envelope-note">
                    No cards. No videos. No one else.
                    <br />
                    Just me talking to you.
                  </p>
                </div>
              ) : (
                <article className="personal-letter">
                  <div className="personal-letter-top">
                    <span>September 16, 2026</span>
                    <span>For Angel</span>
                  </div>

                  <div className="personal-letter-heart" aria-hidden="true">
                    <svg viewBox="0 0 120 40">
                      <path
                        d="M3 21 H33 C37 21 39 10 44 10 C50 10 49 31 55 31 C61 31 62 6 68 6 C74 6 75 22 81 22 H98"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M98 22 C104 13 116 16 116 25 C116 32 107 36 98 39 C89 36 80 32 80 25 C80 16 92 13 98 22 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>

                  <div className="personal-letter-body">
                    <p className="letter-dear">Angel,</p>

                    <p style={{ "--letter-delay": "0.08s" } as React.CSSProperties}>
                      I don't think I could fit four years into one page even if I tried.
                      There are too many little things that only make sense to us.
                    </p>

                    <p style={{ "--letter-delay": "0.2s" } as React.CSSProperties}>
                      From two scouts who somehow became best friends, to that cold coffee
                      shop where holding your hand suddenly didn't feel like a joke anymore.
                      From one email that simply said yes, to standing at PICC nervous
                      because I was finally introducing you to my family.
                    </p>

                    <p style={{ "--letter-delay": "0.32s" } as React.CSSProperties}>
                      Then came Iloilo, Antipolo, Zambales, all the random days in between,
                      and every version of us that had to learn how to grow up together.
                    </p>

                    <p style={{ "--letter-delay": "0.44s" } as React.CSSProperties}>
                      I've seen the clingy you, the overthinking you, the soft you, the
                      stubborn you, the independent you, and the version of you that's
                      still figuring things out. I don't love you because you're only one
                      of those things. I love that all of them are you.
                    </p>

                    <p style={{ "--letter-delay": "0.56s" } as React.CSSProperties}>
                      And I think one of my favorite parts of loving you has been watching
                      you become someone new without losing the little things that made me
                      choose you in the first place.
                    </p>

                    <p style={{ "--letter-delay": "0.68s" } as React.CSSProperties}>
                      I don't know exactly what the next years will look like. We'll change.
                      We'll get busier. We'll discover new parts of ourselves. There will
                      probably be days when life doesn't feel as cinematic as this website.
                    </p>

                    <p
                      className="letter-emphasis"
                      style={{ "--letter-delay": "0.8s" } as React.CSSProperties}
                    >
                      But if you'll let me, I still want to be there for the ordinary days too.
                    </p>

                    <p style={{ "--letter-delay": "0.92s" } as React.CSSProperties}>
                      The quiet days. The annoying days. The days when you just want me
                      nearby. The days when we have no plan at all.
                    </p>

                    <p style={{ "--letter-delay": "1.04s" } as React.CSSProperties}>
                      Happy birthday, Angel. I'm proud of the girl I met, I'm proud of the
                      woman you're becoming, and I'm grateful that somehow I got to be part
                      of the story in between.
                    </p>

                    <p
                      className="letter-final-line"
                      style={{ "--letter-delay": "1.16s" } as React.CSSProperties}
                    >
                      I love you. And I still choose you.
                    </p>
                  </div>

                  <div
                    className="personal-letter-signature"
                    style={{ "--letter-delay": "1.28s" } as React.CSSProperties}
                  >
                    <span>Still your partner in crime,</span>
                    <strong>Jay</strong>
                  </div>
                </article>
              )}

              {letterOpened && (
                <div className="letter-closing">
                  <svg
                    className="letter-closing-svg"
                    viewBox="0 0 720 110"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="letterClosingLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#efafd4" stopOpacity="0" />
                        <stop offset="50%" stopColor="#efafd4" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#cba9ef" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 58 C160 15 220 98 360 58 S560 18 700 58"
                      fill="none"
                      stroke="url(#letterClosingLine)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <p>There's just one last thing.</p>
                  <span>12 ↓</span>
                </div>
              )}
            </div>
          </section>

          <section
            id="chapter-twelve"
            className={`story-section chapter-twelve finale-chapter ${finaleReplay ? "finale-replay-mode" : ""} ${finaleReveal ? "finale-is-revealed" : ""}`}
          >
            <div className="finale-night" aria-hidden="true">
              <div className="finale-night-glow" />
              <div className="finale-night-grain" />

              <svg
                className="finale-constellation-svg"
                viewBox="0 0 1200 900"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="finaleConstellationStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#efafd6" stopOpacity="0.12" />
                    <stop offset="52%" stopColor="#ffd9ed" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#bca0ed" stopOpacity="0.16" />
                  </linearGradient>
                  <radialGradient id="finaleStarGlow">
                    <stop offset="0%" stopColor="#fff9fd" stopOpacity="1" />
                    <stop offset="35%" stopColor="#f4b7dc" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#c38fdf" stopOpacity="0" />
                  </radialGradient>
                  <filter id="finaleSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  className="finale-heart-path finale-heart-path-left"
                  d="M600 675 C520 610 355 510 355 360 C355 245 485 210 600 330"
                  fill="none"
                  stroke="url(#finaleConstellationStroke)"
                  strokeWidth="1.5"
                />
                <path
                  className="finale-heart-path finale-heart-path-right"
                  d="M600 675 C680 610 845 510 845 360 C845 245 715 210 600 330"
                  fill="none"
                  stroke="url(#finaleConstellationStroke)"
                  strokeWidth="1.5"
                />

                <path
                  className="finale-memory-path finale-memory-path-one"
                  d="M164 648 C278 598 354 548 445 478"
                  fill="none"
                  stroke="url(#finaleConstellationStroke)"
                  strokeWidth="1"
                />
                <path
                  className="finale-memory-path finale-memory-path-two"
                  d="M1035 620 C918 570 844 520 760 455"
                  fill="none"
                  stroke="url(#finaleConstellationStroke)"
                  strokeWidth="1"
                />

                {[
                  [600, 675],
                  [535, 620],
                  [458, 552],
                  [392, 467],
                  [356, 376],
                  [384, 291],
                  [480, 264],
                  [600, 330],
                  [720, 264],
                  [816, 291],
                  [844, 376],
                  [808, 467],
                  [742, 552],
                  [665, 620],
                  [164, 648],
                  [272, 596],
                  [356, 538],
                  [1035, 620],
                  [924, 568],
                  [842, 510],
                ].map(([cx, cy], index) => (
                  <g key={index} className={`finale-star finale-star-${index + 1}`}>
                    <circle cx={cx} cy={cy} r="18" fill="url(#finaleStarGlow)" />
                    <circle cx={cx} cy={cy} r="2.7" fill="#fff8fc" filter="url(#finaleSoftGlow)" />
                  </g>
                ))}
              </svg>

              <div className="finale-butterflies">
                {Array.from({ length: 9 }, (_, index) => (
                  <span key={index} className={`finale-butterfly finale-butterfly-${index + 1}`}>
                    <i className="finale-butterfly-wing finale-butterfly-wing-left" />
                    <i className="finale-butterfly-body" />
                    <i className="finale-butterfly-wing finale-butterfly-wing-right" />
                  </span>
                ))}
              </div>
            </div>

            {finaleCountdown !== null && (
              <div className="finale-countdown" aria-live="polite">
                <span className="finale-countdown-label">One last thing...</span>
                <strong key={finaleCountdown}>{finaleCountdown}</strong>
              </div>
            )}

            {finaleReveal && (
              <div className="finale-content">
                <div className="finale-date">
                  <span>09</span>
                  <i />
                  <span>16</span>
                  <i />
                  <span>2026</span>
                </div>

                <p className="finale-eyebrow">
                  {finaleReplay ? "One more time, just for you." : "And here we are."}
                </p>

                <h2>
                  Happy Birthday,
                  <span>Angel.</span>
                </h2>

                <p className="finale-message">
                  Four years of memories.
                  <br />
                  And somehow, I still feel like our story is only beginning.
                </p>

                <div className="finale-memory-names" aria-label="Memories from our story">
                  <span>Scouting</span>
                  <span>Coffee</span>
                  <span>YES</span>
                  <span>PICC</span>
                  <span>Iloilo</span>
                  <span>Antipolo</span>
                  <span>Zambales</span>
                  <span>Today</span>
                </div>

                <div className="finale-dedication">
                  <span>September 16, 2026</span>
                  <p>For Angel, with love.</p>
                  <strong>— Sir Jay</strong>
                </div>

                <div className="finale-actions">
                  <button type="button" className="finale-action finale-action-replay" onClick={replayFinale}>
                    <span>♡</span>
                    <strong>One more time</strong>
                  </button>

                  <button type="button" className="finale-action" onClick={replayStory}>
                    <span>↻</span>
                    <strong>Our story</strong>
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )
      }
    </main >
  );
}

export default App;