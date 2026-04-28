import { CardTitle, Card, CardHeader, CardContent } from '@/components/ui/card.jsx'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import { toast } from 'sonner';

const CATEGORIES = [
  "Hadith",
  "Quran",
  "Fiqh",
  "Islamic Studies",
  "Arabic",
  "Aqeedah",
];

const API_BASE = "http://127.0.0.1:9000"

export default function CourseForm(){
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        titre: "",
        titre_ar: "",
        description: "",
        animateur: "",
        livre: "",
        auteur: "",
        categorie: "",
    })
    const handleSubmit = async (e) =>{
      e.preventDefault();

      // les fields sont requise
      if (!form.titre.trim() || !form.animateur.trim()){
          toast.info("Champs requis",{
          description: "Le titre et l'animateur sont obligatoires.",
        });
        return;
      }

      setLoading(true);

      // CALL BACKEND
      try{
        const res = await fetch(`${API_BASE}/courses`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(form)
        });

        if( !res.ok){
          throw new Error(`Error ${res.status}`);
        }

        // success
        toast.success("Cours ajouté", {
        description: `"${form.titre}" a été créé avec succès.` 
        });
  
        // reintialise la forme
        setForm({
          titre: "",
          titre_ar: "",
          description: "",
          animateur: "",
          livre: "",
          auteur: "",
          categorie: "",
        });

      }catch(err){
        toast.error("Échec de la création", {
        description:
          err instanceof Error ? err.message : "Impossible de joindre le serveur. Contactez le developpeur",
      });
      console.log(err instanceof Error ? err.message : err);
      } finally{
        setLoading(false);
      }
    }

    const update = (field_name, value) =>{
        // console.log(typeof field)
        // update a field for the field that has be changed while the rest is intact

        setForm(values => ({...values, [field_name]: value}))
    }

    return (
    <Card>
      <CardHeader>
        <CardTitle>Nouveau cours</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre *</Label>
              <Input
                id="titre"
                value={form.titre}
                onChange={(e) => update("titre", e.target.value)}
                // onChange={update}
                placeholder="Ex: Sciences du Hadith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titre_ar">Titre en arabe</Label>
              <Input
                id="titre_ar"
                dir="rtl"
                value={form.titre_ar}
                onChange={(e) => update("titre_ar", e.target.value)}
                placeholder="مثال: علوم الحديث"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brève description du cours"
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="animateur">Animateur *</Label>
              <Input
                id="animateur"
                value={form.animateur}
                onChange={(e) => update("animateur", e.target.value)}
                placeholder="Nom du professeur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorie">Catégorie </Label>
              <Select value={form.categorie} onValueChange={(value) => update("categorie", value)}>
                <SelectTrigger id="categorie">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="livre">Livre</Label>
              <Input
                id="livre"
                value={form.livre}
                onChange={(e) => update("livre", e.target.value)}
                placeholder="Titre du livre étudié"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auteur">Auteur</Label>
              <Input
                id="auteur"
                value={form.auteur}
                onChange={(e) => update("auteur", e.target.value)}
                placeholder="Auteur du livre"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Enregistrement..." : "Créer le cours"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}