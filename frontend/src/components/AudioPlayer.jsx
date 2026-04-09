import { useRef, useState } from "react";
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

function AudioPlayer( { lesson }) {
    // need ref to have access to the actual DOM to use audio properties as React does not provide
    const audioRef = useRef(null); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime ] = useState(0);
    const [audioSpeed, setAudioSpeed] = useState(1);
    const speeds = [1, 1.25, 1.5, 1.75, 2];

    // console.log(lesson.audioUrl)
    // toggle to play and pause
    const togglePlay = () =>{
        // no action if no audio ref
        if (!audioRef.current) return;

        if (isPlaying){
            audioRef.current.pause();
        }else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // 
    }

    // update current time
    const handleTimeUpdate = () => {
        // console.log(audioRef.current.currentTime);
        let currTime = audioRef.current.currentTime; // get current time of the audio in second
        if (currTime)  setCurrentTime(currTime);
    }

    // format time
    const formatTime = (time) => {
        // time: in seconds
        let hours = Math.trunc(time/3600); // equivalent of // in PYTHON
        let minutes = Math.trunc((time%3600) / 60); // rest divided by 60 for the minutes
        let seconds = Math.floor((time%3600) % 60); 
        // if minutes or seconds are less than 0, add an extra 0
        let formatedTime = `${hours}:${minutes < 10 ? "0":""}${minutes}:${seconds < 10 ? "0":""}${seconds}`;
        return formatedTime
        
    }

    const handleLoadedMetadata = () =>{
        // set the duration in seconds, provide as input to input slider
        setDuration(audioRef.current.duration); 
        audioRef.current.playbackRate = audioSpeed; // set the audio speed with the user current speed
    }

    const handleSeek = (e) => {
        // console.log(e.target.value)
        // seek using the slider
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    }

    const handleEnded = () =>{
        // when audio ends, need to set symbole to pause
        setIsPlaying(false);
        // onComplete();
    }

    const skip = (seconds) => {
        // negative to rewind, positive to advance
        if (audioRef.current){
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds);
            // console.log(Math.max(0, audioRef.current.currentTime), duration)
            setCurrentTime(audioRef.current.currentTime)

        }
    }

    const resetAudio = () => {
        setCurrentTime(0);
        setIsPlaying(false);
    }

    const changeAudioSpeed = (e) => {
        // change the speedof the audio
        if (audioRef.current){
            audioRef.current.playbackRate = e.target.value;
        }
        setAudioSpeed(e.target.value);
    }

    return ( 
        <div className="rounded-lg border border-border bg-card p-4">

            {/* audio with custom controls */}
            <audio
                ref={audioRef}
                src={lesson.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded} 
                onAbort={resetAudio}  
            />

            <p className="mb-3 text-sm font-medium text-card-foreground">{lesson.title}</p>
            <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="mb-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            aria-label="Seek audio"
            />
            <div className="mb-3 flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : lesson.duration}</span> 
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => skip(-15)} aria-label="Rewind 15 seconds">
                    <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                onClick={togglePlay}
                size="icon"
                className="h-12 w-12 rounded-full"
                aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => skip(15)} aria-label="Forward 15 seconds">
                    <SkipForward className="h-4 w-4" />
                </Button>
                {/* <Volume2 className="ml-2 h-4 w-4 text-muted-foreground" /> */}

                <select name="speed" id="speed" className="h-4 text-sm text-muted-foreground" onChange={changeAudioSpeed}>
                    {speeds.map(rate => {
                        return (<option key={rate} value={rate}>{rate}x</option>)
                    })}
                </select>
                
            </div>
        </div>
     );
}

export default AudioPlayer;