export default function MyError({ message }){

    return (
    <div className="flex items-center justify-center h-[60vh] p-4">
      <div className="max-w-sm w-full rounded-lg border bg-card p-6 text-center space-y-4">
        <div className="text-destructive text-2xl">⚠️</div>

        <div>
          <p className="font-semibold text-card-foreground">
            {message}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Vérifiez votre connexion ou contactez l'Administrateur.
          </p>
        </div>
      </div>
    </div>
  );
}