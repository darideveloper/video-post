import requests
import os

# Download file
def download (url:str, file_path:str):
    """ Download mp4 video from link """

    res = requests.get (url)
    res.raise_for_status()
    with open (file_path, "wb") as file:
        for chunk in res.iter_content (chunk_size=8000):
            file.write (chunk)