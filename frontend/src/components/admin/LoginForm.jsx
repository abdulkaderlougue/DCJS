import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner"

const API_BASE = import.meta.env.VITE_API_URL;
const AUTH_KEY = "dcjs_admin_auth";

export default function LoginForm({onLogin}){
  const [password, setPassword] = useState("");
  // const [authorized, setAuthorized] = useState(false);
  

  const handleLogin =  async (e) =>{
    e.preventDefault();
    
    try{

      const res = await fetch(`${API_BASE}/auth`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"password": password, "auth_key": AUTH_KEY})
      })
      
      if (!res.ok) throw new Error(`Erreur ${res.status}`);

      // get the data
      const data = await res.json();

      if (data && data.success){
        sessionStorage.setItem(AUTH_KEY, "1")
        onLogin(); // notify admin page
        toast.success("Connexion réussie", 
          {description: "Bienvenue dans l'espace admin."
          })

      }else{
  
      toast.error("Mot de passe incorrect", {
        description: "Veuillez réessayer.",
      })

    }
   
    }catch (err){
      toast.error("Une Erreur s'est produite depuis le serveur, contactez le developpeur svp")
      console.log(err);
    }

  }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Accès Administrateur</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
}