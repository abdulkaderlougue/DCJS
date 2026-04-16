import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()


url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
BUCKET_NAME: str = os.getenv("BUCKET_NAME")
# print(BUCKET_NAME)
supabase: Client = create_client(url, key)

# print(supabase.storage.list_buckets())
# all_files = (
#     supabase.storage
#     .from_(BUCKET_NAME)
#     .list()
# )
# print(all_files)

def upload_file(file, supabase_storage_path, content_type):
    """ Telever un fichier dans le bucket Supabase Storage et retourner l'URL publique du fichier. 
    Args:
        filename (str): Le nom du fichier à téléverser.
        supabase_storage_path (str): Le chemin dans le bucket où le fichier doit être téléversé.
        content_type (str): Le type de contenu du fichier (ex: "audio/mpeg", "image/png", etc.).
    """
    try:
        # Upload to Supabase Storage
        response = (
            supabase.storage
            .from_(BUCKET_NAME)
            .upload(
                file=file,
                path=supabase_storage_path,
                file_options={"content-type": content_type, 
                            "upsert": "false" # Ne pas écraser les fichiers existants avec le même nom
                            }
            )
        )
        
        # Public url
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(supabase_storage_path)
    except Exception as e:
        print(f"Error uploading file: {e}")
        raise e

    return {
            "message": "Upload successful",
            "url": public_url
        }


# upload_response = upload_file("test.mp3","","audio/mpeg")
# print(upload_response)