  // format time
export function formatTime(time){
    // time: in seconds
    let hours = Math.trunc(time/3600); // equivalent of // in PYTHON
    let minutes = Math.trunc((time%3600) / 60); // rest divided by 60 for the minutes
    let seconds = Math.floor((time%3600) % 60); 
    // if minutes or seconds are less than 0, add an extra 0
    let formatedTime = `${hours}:${minutes < 10 ? "0":""}${minutes}:${seconds < 10 ? "0":""}${seconds}`;
    return formatedTime
        
}



