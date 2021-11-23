import os
import tiktok
from config import Config
from spreadsheet_manager.xlsx import SS_manager

def main (): 
    """
    Download videos from tiktok and post it in:
        instagram reels
        twitter
        youtube shorts
    """
    
    # Project paths
    current_folder = os.path.dirname (__file__)
    videos_path = os.path.join (current_folder, "videos.xlsx")

    # Get data from file
    print ("reading xlsx file...")
    ss = SS_manager(videos_path)
    ss.set_sheet ("videos")
    videos_data = ss.get_data()

    # Main llop for each video
    for video_link, title, description, status in videos_data[1:]:
        
        # print (video_link, title, description, status)

        # Validate video link
        if video_link:

            # Validate video status
            if not status or status == "no": 

                # Download video
                print (f"\nVideo: {title}")
                tiktok.download(video_link)


if __name__ == "__main__":
    main()