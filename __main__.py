import os
import tiktok 
from config import Config
from spreadsheet_manager.xlsx import SS_manager
from scraping_manager.automate import Web_scraping

def main (): 
    """
    Download videos from tiktok and post it in:
        instagram reels
        twitter
        youtube shorts
        facebook business
    """
    
    # Project paths
    current_folder = os.path.dirname (__file__)
    videos_path = os.path.join (current_folder, "videos.xlsx")
    current_folder = os.path.dirname (__file__)
    download_folder = os.path.join (current_folder, "downloads")

    # Get data from file
    print ("reading xlsx file...")
    ss = SS_manager(videos_path)
    ss.set_sheet ("videos")
    videos_data = ss.get_data()

    print ("Starting chrome...")
        
    # Credentials
    credentials = Config()
    headless = not credentials.get_credential("show_browser")
    chrome_folder = credentials.get_credential("chrome_folder")

    # Start browser for install extensions
    scraper = Web_scraping ( headless=headless, 
                             download_folder=download_folder,
                             chrome_folder=chrome_folder)   

    # Main loop for each video
    for video_link, title, description, status in videos_data[1:]:
        
        # print (video_link, title, description, status)

        # Validate video link
        if video_link:

            # Validate video status
            if not status or status == "no": 

                # Download video
                print (f"\nVideo: {title}")
                tiktok.download(scraper, video_link, title)


if __name__ == "__main__":
    main()