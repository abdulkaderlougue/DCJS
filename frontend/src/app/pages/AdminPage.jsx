import LoginForm from "@/components/admin/LoginForm";
import CourseForm from "@/components/admin/CourseForm";
import LessonForm from "@/components/admin/LessonForm";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, BookOpen, GraduationCap, LogOut, Upload, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";

const AUTH_KEY = "dcjs_admin_auth";

const AdminPage = () =>{
    const COMPRESSION_URL = "aconvert.com/audio/compress/"
    const [authorized, setAuthorized] = useState(false);

    const handleLogin = ()=>{
      setAuthorized(true);
    }

    // run once to check if suthorized
    useEffect(()=>{
      const auth = sessionStorage.getItem(AUTH_KEY)
      if (auth === '1') {
        setAuthorized(true);
        // console.log(auth);
      }
    }, [])
    

    const handleLogout = () =>{
      sessionStorage.removeItem(AUTH_KEY);
      setAuthorized(false);

    }
    // console.log(sessionStorage.getItem(AUTH_KEY))
    if (!authorized){
      return <LoginForm onLogin={handleLogin}/>
    }
     

    return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-3xl">
    {/* Header: Stacks on small screens, side-by-side on tablet+ */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Espace Administrateur
        </h1>
        <p className="text-sm text-muted-foreground">
          Gérez les cours et les leçons DCJS
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        className="w-full sm:w-auto justify-center" // Full width on mobile
      >
        <LogOut className="h-4 w-4 mr-2" />
        Déconnexion
      </Button>
    </div>

       <Tabs defaultValue="course" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="course" className="text-xs sm:text-sm">
              <BookOpen className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Ajouter un cours</span>
              <span className="sm:hidden">Cours</span> 
            </TabsTrigger>
            
            <TabsTrigger value="lesson" className="text-xs sm:text-sm">
              <GraduationCap className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Ajouter une leçon</span>
              <span className="sm:hidden">Leçon</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="course" className="mt-4 px-2 sm:px-0">
            <CourseForm />
          </TabsContent>
          <TabsContent value="lesson" className="mt-4 px-2 sm:px-0">
            <LessonForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage;