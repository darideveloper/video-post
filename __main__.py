import os
from config import Config

def main (): 
    """
    Download videos from tiktok and post it in:
        instagram reels
        twitter
        youtube shorts
    """
    
    # Project paths
    current_folder = os.path.dirname (__file__)
    videos_path = os.path.join (current_folder, "videos.txt")

    # Get video links
    with open (videos_path, "r") as file:
        video_links = file.read().split("\n")

    # Main llop for each video
    for video_link in video_links:
        if video_link and "https://www.tiktok.com/@" in video_link:
            print (video_link)


if __name__ == "__main__":
    main()