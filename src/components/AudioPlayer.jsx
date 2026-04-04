import { useRef } from "react";

export default function AudioPlayer( { src }){
    const audioRef = useRef(null);

    return (
        <div>
            {/* style={{ width: 100% }} */}
            <audio ref={audioRef} src={src} controls />  
        </div>
    )
}