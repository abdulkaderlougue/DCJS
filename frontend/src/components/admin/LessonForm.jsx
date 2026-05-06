import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { getPresignedUrl, uploadFileToCloudflare } from "../../utils/helpers";

const API_BASE = import.meta.env.VITE_API_URL; 
const MAX_AUDIO_SIZE_MB = 50; // in MB
const MAX_AUDIO_SIZE = MAX_AUDIO_SIZE_MB * 1024 * 1024; // in bytes
const LessonForm = () =>{
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [form, setForm] = useState({
    course_id: "",
    chapitre: "",
    titre: "",
    description: "",
    hours: "0",
    minutes: "0",
    seconds: "0",
    lesson_type: "audio",
    live_url: ""
  });

  useEffect(() => {
    const loadCourses = async () =>{
      const res = await fetch(`${API_BASE}/courses`)
      
      // error fetching the courses
      if (!res.ok){
        throw new Error(`Error ${res.status}`)
      }
      try{
        const data = await res.json();
        const courseList = Array.isArray(data) ? data.map( course => ({
          // add course_id field to the course object
          
            "course_id": String(course.id),
            ...course
          
          
        })

        ) : []
        setCourses(courseList)
        // console.log(courseList)
        // data.map((course) => console.log(typeof courseList))
      }catch (err){
        toast.info("Cours indisponibles",{
          description:"Impossible de charger la liste des cours depuis le serveur. Contactez le developpeur"
        })
        console.log(err)
      }finally {
        setCoursesLoading(false)
      } 
    } 

    // call the function
    loadCourses()

  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)

    // fields required
    if (!form.course_id || !form.titre || !form.lesson_type){
      toast.info("Champs requis",{
        description: "Cours, titre et type de leçon sont obligatoires.",
      });
      return;
    }

    // lien requis pour le cours en direct
    if (form.lesson_type === "live"){
      if (!form.live_url){
        toast.info("Lien du direct requis",{
        description: `Veuillez ajouter le lien du direct`,
      });
      return;
      }
      console.log(form.live_url.startsWith("https://"), form.live_url.startsWith("http://"))
      if(!form.live_url.startsWith("https://") && !form.live_url.startsWith("http://")){
        // both of them should be true, does not start with https nor https
        toast.info("Lien Incomplet",{
        description: `Le lien du direct doit contenir https://`,
      });
      return;
      }
    }

    // lesson type is audio, then file is required
    if (form.lesson_type === "audio" && !audioFile){
      toast.info("Fichier audio requis",{
        description: `Veuillez sélectionner un fichier audio (max ${MAX_AUDIO_SIZE_MB} Mo).`,
      });
      return;
    }

    const hour = parseInt(form.hours) || 0;
    const minutes = parseInt(form.minutes) || 0;
    const totalSeconds = (hour*3600) + (minutes * 60) + parseInt(form.seconds);

    if(totalSeconds <= 0){
      toast.info("Durée invalide", {
        description: "Veuillez indiquer une durée supérieure à zéro.",
      });
      return;
      
    }

    setLoading(true);

    // building the form and request to backend
    try{
      
      const payload = {
        course_id: form.course_id,
        chapitre: form.chapitre,
        titre: form.titre,
        description: form.description,
        duration: totalSeconds, // in second 
        lesson_type: form.lesson_type,
      }

      if (form.lesson_type === "live"){
        payload.live_url = form.live_url;
      } 
      
      if (form.lesson_type === "audio" && audioFile){

        // send request to the server
        // 1. Build safe storage path
        const safeFileName = audioFile.name.replace(/\s/g, "_");
        const storagePath = `${form.course_id}/${safeFileName}`;

        // 2. Get presigned upload URL from backend
        const presignedUrl = await getPresignedUrl(storagePath, audioFile.type);
        // console.log("Presigned URL:", presignedUrl);

        // 3. Upload file directly to Cloudflare R2
        const uploadedFileUrl = await uploadFileToCloudflare(audioFile, presignedUrl);

        // console.log("Uploaded file URL:", uploadedFileUrl);
        // const uploadedFileUrl = "https://0fc55ad95d.r2.cloudflarestorage.com/path)to_stor/3/test_Sourate_77-Al_Mursalat.m4a"

        payload.audio_url = uploadedFileUrl;
      }
      
      // console.log("Form data to submit:", payload)
      // 4. (Optional) Save lesson metadata to backend
      const res = await fetch(`${API_BASE}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload
        }),
      });

      // console.log("Response from backend:", res);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      
      // success
      toast.success("Leçon ajoutée", {description: `"${form.titre}" a été créée avec succès.` });

      setForm({
        course_id: form.course_id,
        chapitre: "",
        titre: "",
        description: "",
        hours: "0",
        minutes: "0",
        seconds: "0",
        lesson_type: "",
        live_url: ""
      });
      setAudioFile(null);        
    }catch(err){
      toast.error("Échec de la création",{
        description:
           "Impossible de joindre le serveur. Contactez le developpeur",
      });
      console.log(err instanceof Error ? err.message : err)
    }finally{
      setLoading(false);
    }

  }

  // display size nicely/appropriatelly on frontend
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} o` // octet
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko` // kilo octet

    return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
  }

  // process file upload
  const handleAudioChange = (e) => {
    const file = e.target.files?.[0] // get the file at index 0
    // file has attributes like, lastModified, lastModifiedDate, name, size
    if (!file) return;

    // audio file only
    if (!file.type.startsWith("audio/")){
      toast.info("Fichier invalide",{
      description: "Veuillez sélectionner un fichier audio.",
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_AUDIO_SIZE){
      toast.info("Fichier trop volumineux", {
        description: `La taille maximale est de ${MAX_AUDIO_SIZE_MB} Mo. Compressez le fichier sur aconvert.com/audio/compress. (Bitrate percent=30)`,
      });
      e.target.value = "";

      return;
    }
    // console.log(file)
    setAudioFile(file);
  }

    
  const update = (field_name, value) => {
    // console.log(field_name,value)
    setForm(previousState => ({...previousState, [field_name]:value}))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle leçon</CardTitle>
      </CardHeader>
      <CardContent>
        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="course_id">Cours *</Label>
            <Select
              value={form.course_id}
              onValueChange={(v) => update("course_id", v)}
              disabled={coursesLoading || courses.length === 0}
            >
              <SelectTrigger id="course_id">
                <SelectValue
                  placeholder={
                    coursesLoading
                      ? "Chargement..."
                      : courses.length === 0
                      ? "Aucun cours disponible"
                      : "Sélectionner un cours"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.titre} de {c.animateur}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chapitre">Chapitre</Label>
              <Input
                id="chapitre"
                value={form.chapitre}
                onChange={(e) => update("chapitre", e.target.value)}
                placeholder="Ex: Chapitre 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson_type">Type de leçon *</Label>
              <Select
                value={form.lesson_type}
                onValueChange={(v) => update("lesson_type", v)}
              >
                <SelectTrigger id="lesson_type">
                  <SelectValue placeholder="Choisir le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="live">Direct (Live)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titre_lesson">Titre *</Label>
            <Input
              id="titre_lesson"
              value={form.titre}
              onChange={(e) => update("titre", e.target.value)}
              placeholder="Titre de la leçon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_lesson">Description</Label>
            <Textarea
              id="description_lesson"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brève description de la leçon"
              rows={3}
            />
          </div>
          
          {/* duree */}
          <div className="space-y-2">
            <Label>Durée *</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <Input
                  id="hours"
                  type="number"
                  min={0}
                  max={24}
                  value={form.hours}
                  onChange={(e) => update("hours", e.target.value)}
                />
                <span className="text-sm text-muted-foreground">heures</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="minutes"
                  type="number"
                  min={0}
                  max={59}
                  value={form.minutes}
                  onChange={(e) => update("minutes", e.target.value)}
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="seconds"
                  type="number"
                  min={0}
                  max={59}
                  value={form.seconds}
                  onChange={(e) => update("seconds", e.target.value)}
                />
                <span className="text-sm text-muted-foreground">secondes</span>
              </div>
            </div>
          </div>

          {form.lesson_type === "audio" && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
              <Label htmlFor="audio_file">Fichier audio * (max 50 Mo)</Label>
              <Input
                id="audio_file"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90"
              />
              {audioFile && (
                <div className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <Upload className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{audioFile.name}</span>
                    <span className="text-muted-foreground shrink-0">
                      ({formatFileSize(audioFile.size)})
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAudioFile(null)}
                    className="h-7 w-7 p-0 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Fichier trop volumineux ? Compressez-le gratuitement avec (Utilisez Bitrate percent=30){" "}
                <a
                  href="https://www.aconvert.com/audio/compress/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline hover:no-underline"
                >
                  aconvert.com
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          )}

          {form.lesson_type === "live" && (
            <div className="space-y-2">
              <Label htmlFor="live_url">Lien * </Label>
              <Input
              id="live_url"
              value={form.live_url}
              onChange={(e) => update("live_url", e.target.value)}
              placeholder="https://meet.google.com"
            />

            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Enregistrement..." : "Créer la leçon"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LessonForm;