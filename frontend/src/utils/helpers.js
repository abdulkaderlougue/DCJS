const API_BASE = import.meta.env.VITE_API_URL; 

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

const getFileUrl = (signedUrl) =>{
  // Remove query parameters to get the direct URL of the uploaded file
  // Example signed URL: https://0fc95d.r2.cloudflarestorage.com/to_file/3/test_Sourate_77-Al_Mursalat_%28Les_envoy%C3%A9s%29_-_2%C3%A8me_partie.m4a?5.........a7f061ad76b5befe8483295a892af6e53d05d8c
  // then extract the file path: to_file/3/test_Sourate_77-Al_Mursalat_%28Les_envoy%C3%A9s%29_-_2%C3%A8me_partie.m4a
  const path_to_store = signedUrl.split("?")[0].split('/')[3];
  return `${import.meta.env.VITE_CLOUDFLARE_UPLOAD_URL}/${path_to_store}`;
}

export async function getPresignedUrl(fileStoragePath, fileType){
  // console.log("Requesting presigned URL for:", fileStoragePath, "with type:", fileType);
    const res = await fetch(`${API_BASE}/lessons/upload-url`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            file_path: fileStoragePath,
            file_type: fileType
        }), 
    });
    if (!res.ok){
        throw new Error("Erreur lors de la récupération de l'URL de téléversement");
    }
    const data = await res.json();
    return data.signed_url; // Return the presigned URL
}

export async function uploadFileToCloudflare(file, presignedUrl) {
    try{
      const res = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      // console.log("Response from Cloudflare:", res);
      if (!res.ok) {
        throw new Error("Erreur lors du televersement du fichier");
      }
      // https://0fc55ad95d.r2.cloudflarestorage.com/path)to_stor/3/test_Sourate_77-Al_Mursalat_%28Les_envoy%C3%A9s%29_-_2%C3%A8me_partie.m4a?X-Amz-Algorithm=fa0e6a7f061ad76b5befe8483295a892af6e53d05d8c
      // Remove query parameters to get the direct URL of the uploaded file
      const url = getFileUrl(res.url);
      return url; // Return the direct URL of the uploaded file
    }catch (err){
      console.error("Erreur lors du televersement du fichier:", err);
      throw err; // Rethrow the error to be handled by the caller
    }
}


