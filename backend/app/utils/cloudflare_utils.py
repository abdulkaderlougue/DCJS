import os
from dotenv import load_dotenv
import boto3
from botocore.client import Config

load_dotenv()

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
BUCKET_NAME="delice-des-coeurs"
PUB_DEV_URL=os.getenv("PUB_DEV_URL")
URL_EXPIRATION = 180 # 3 MIN

def generate_secure_url(file_key, file_type, method='get'):
    if method.lower() == 'put':
        scope = "put_object" # upload/write access
    else:
        scope = "get_object"
    # print(f"Generating {scope.upper()} URL for: {file_key} with content type: {file_type}")
    # This remains the standard way to sign URLs for R2
    s3 = boto3.client(
        's3',
        endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=os.getenv("CLOUDFLARE_ACCESS_KEY_ID"), 
        aws_secret_access_key=os.getenv("CLOUDFLARE_SECRET_ACCESS_KEY"),
        region_name="auto", # Required by SDK but not used by R2
    )

    try:
        # URL expires 
        signed_url = s3.generate_presigned_url(
            scope,
            Params={
                'Bucket': BUCKET_NAME, 
                'Key': file_key,
                'ContentType': file_type
                },
            ExpiresIn=URL_EXPIRATION # expires in 3 min
        )

    except Exception as e:
        print(e)
        raise e

    return {"signed_url": signed_url}

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

