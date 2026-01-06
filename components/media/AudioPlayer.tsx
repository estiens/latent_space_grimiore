import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';
import { ASCIIButton } from '@/components/shared/ASCIIButton';

interface AudioTrack {
  src: string;
  title: string;
  duration?: string;
}

interface AudioPlayerProps {
  src: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  showVisualization?: boolean;
  variant?: 'minimal' | 'full';
  playlist?: AudioTrack[];
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

// ASCII VU meter characters
const VU_CHARS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

// Format time in MM:SS
const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Get filename from path
const getFilename = (src: string): string => {
  const parts = src.split('/');
  return parts[parts.length - 1]?.toUpperCase() || 'UNKNOWN.WAV';
};

export const AudioPlayer = ({
  src,
  title,
  autoplay = false,
  loop = false,
  showVisualization = true,
  variant = 'full',
  playlist,
  className,
  onPlay,
  onPause,
  onEnded
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [vuLevels, setVuLevels] = useState<number[]>(Array(12).fill(0));
  const [currentTrack, setCurrentTrack] = useState(0);

  const currentSrc = playlist ? playlist[currentTrack]?.src : src;
  const currentTitle = playlist
    ? playlist[currentTrack]?.title
    : (title || getFilename(src));

  // Setup Web Audio API for visualization
  useEffect(() => {
    if (!showVisualization || !audioRef.current) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyserRef.current = analyser;
    } catch (e) {
      console.warn('Web Audio API not supported for visualization');
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showVisualization]);

  // Animate VU meter
  const updateVuMeter = useCallback(() => {
    if (!analyserRef.current || !isPlaying) {
      animationRef.current = null;
      return;
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Sample 12 frequency bands for VU meter
    const levels = Array(12).fill(0).map((_, i) => {
      const index = Math.floor((i / 12) * dataArray.length);
      return dataArray[index] / 255;
    });

    setVuLevels(levels);
    animationRef.current = requestAnimationFrame(updateVuMeter);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && showVisualization) {
      animationRef.current = requestAnimationFrame(updateVuMeter);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, showVisualization, updateVuMeter]);

  // Audio event handlers
  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    onPause?.();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (playlist && currentTrack < playlist.length - 1) {
      setCurrentTrack(prev => prev + 1);
    } else {
      setIsPlaying(false);
      onEnded?.();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.7;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handlePrevTrack = () => {
    if (playlist && currentTrack > 0) {
      setCurrentTrack(prev => prev - 1);
    }
  };

  const handleNextTrack = () => {
    if (playlist && currentTrack < playlist.length - 1) {
      setCurrentTrack(prev => prev + 1);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          handleTogglePlay();
          break;
        case 'm':
          handleToggleMute();
          break;
        case 'arrowleft':
          if (audioRef.current) {
            audioRef.current.currentTime -= 5;
          }
          break;
        case 'arrowright':
          if (audioRef.current) {
            audioRef.current.currentTime += 5;
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Render ASCII VU meter
  const renderVuMeter = () => (
    <div className="vu-meter my-2">
      {vuLevels.map((level, i) => {
        const charIndex = Math.min(Math.floor(level * 8), 7);
        return (
          <div
            key={i}
            className="flex flex-col justify-end h-full"
            style={{ minWidth: '8px' }}
          >
            <span
              className={cn(
                'text-xs transition-all duration-50',
                level > 0.8 ? 'text-[var(--destructive)]' :
                level > 0.5 ? 'text-[var(--chart-3)]' :
                'text-[var(--chart-1)]'
              )}
            >
              {VU_CHARS[charIndex]}
            </span>
          </div>
        );
      })}
    </div>
  );

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <div className={cn('inline-flex items-center gap-2 p-2 border border-[var(--muted)] bg-[rgba(0,0,0,0.3)]', className)}>
        <audio
          ref={audioRef}
          src={currentSrc}
          autoPlay={autoplay}
          loop={loop}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
        <ASCIIButton
          label={isPlaying ? '||' : '>'}
          onClick={handleTogglePlay}
          variant="primary"
        />
        <span className="text-xs text-[var(--muted-foreground)]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <span className="text-xs text-[var(--chart-1)] truncate max-w-[150px]">
          {currentTitle}
        </span>
      </div>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('border border-[var(--primary)] bg-[rgba(0,0,0,0.5)]', className)}
    >
      <audio
        ref={audioRef}
        src={currentSrc}
        autoPlay={autoplay}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <BBSHeader
        title={`AUDIO_PLAYER.SYS // ${currentTitle}`}
        status={isPlaying ? 'ACTIVE' : 'READY'}
        showRecIndicator={isPlaying}
      />

      <div className="p-4 space-y-3">
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-[var(--muted)] cursor-pointer accent-[var(--primary)]"
            aria-label="Seek"
          />
          <div className="h-1 bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* VU Meter Visualization */}
        {showVisualization && renderVuMeter()}

        {/* Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {playlist && (
              <ASCIIButton
                label="<<"
                onClick={handlePrevTrack}
                disabled={currentTrack === 0}
                variant="ghost"
              />
            )}
            <ASCIIButton
              label={isPlaying ? '||' : '>'}
              onClick={handleTogglePlay}
              variant="primary"
              active={isPlaying}
            />
            {playlist && (
              <ASCIIButton
                label=">>"
                onClick={handleNextTrack}
                disabled={currentTrack === playlist.length - 1}
                variant="ghost"
              />
            )}
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <ASCIIButton
              label={isMuted ? 'X' : 'V'}
              onClick={handleToggleMute}
              variant="ghost"
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider w-16"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Playlist */}
        {playlist && playlist.length > 1 && (
          <div className="border-t border-[var(--muted)] pt-2 mt-2">
            <div className="text-xs text-[var(--muted-foreground)] mb-1">
              TRACK {currentTrack + 1} / {playlist.length}
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {playlist.map((track, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTrack(i)}
                  className={cn(
                    'w-full text-left text-xs px-2 py-1 transition-colors',
                    i === currentTrack
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'hover:bg-[rgba(255,0,255,0.1)]'
                  )}
                >
                  {i === currentTrack && isPlaying ? '► ' : '  '}{track.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
