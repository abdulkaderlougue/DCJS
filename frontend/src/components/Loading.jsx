export default function Loading({ message }){
    return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}