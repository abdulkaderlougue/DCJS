import os
from dotenv import load_dotenv
import boto3
from botocore.client import Config

load_dotenv()

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
BUCKET_NAME="delice-des-coeurs"
PUB_DEV_URL=os.getenv("PUB_DEV_URL")
def generate_secure_url(file_key):
    # This remains the standard way to sign URLs for R2
    s3 = boto3.client(
        's3',
        endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=os.getenv("CLOUDFLARE_ACCESS_KEY_ID"), 
        aws_secret_access_key=os.getenv("CLOUDFLARE_SECRET_ACCESS_KEY"),
    )

    # URL expires in 1 hour
    return s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': 'delice-des-coeurs', 'Key': file_key},
        ExpiresIn=3600
    )


def upload_file_cloudflare(file, file_storage_path, content_type):

    s3 = boto3.client(
        's3',
        endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=os.getenv("CLOUDFLARE_ACCESS_KEY_ID"), 
        aws_secret_access_key=os.getenv("CLOUDFLARE_SECRET_ACCESS_KEY"),
        # config=Config(signature_version="s3v4"),
        region_name="auto",
    )


    # s3.upload_file(
    #     file_name, 
    #     BUCKET_NAME, 
    #     r2_object_name,
    #     # ExtraArgs={'ContentType': content_type} 
    # )
    
    s3.upload_fileobj(
        file, 
        BUCKET_NAME, 
        file_storage_path,
        ExtraArgs={'ContentType': content_type} 

    )
    print(f"🚀 Upload Successful: {file_storage_path}")
    url= f"{PUB_DEV_URL}/{file_storage_path}"
    return {"url": url}
# print(generate_secure_url("tafsirs/imam_bakayoko/01_TAFSEER_Basmallah_1.mp3"))

# upload_file('/home/kader/LearnReact/delice_des_coeurs/app_cours/backend/app/test.txt', "tafsirs/imam_bakayoko/test.txt")
