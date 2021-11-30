import os
import download 
import globals
from uploaders import instagram, twitter, youtube
from config import Config
from spreadsheet_manager.xlsx import SS_manager
from scraping_manager.automate import Web_scraping

# Project paths and global variables
globals.current_folder = os.path.dirname (__file__)
globals.videos_path = os.path.join (globals.current_folder, "videos.xlsx")
globals.download_folder = os.path.join (globals.current_folder, "downloads")

def start_scraper ():
    """ Start selenium with user settings and save as global variable
    """


    # Credentials
    credentials = Config()
    headless = not credentials.get_credential("show_browser")
    chrome_folder = credentials.get_credential("chrome_folder")

    # Start browser for install extensions
    globals.scraper = Web_scraping (headless=headless, 
                                    download_folder=globals.download_folder,
                                    chrome_folder=chrome_folder)   

def main (): 
    """
    Download videos from tiktok and post it in:
        instagram reels
        twitter
        youtube shorts
        facebook business
    """

    # Get data from file
    print ("reading xlsx file...")
    ss = SS_manager(globals.videos_path)
    ss.set_sheet ("videos")
    videos_data = ss.get_data()

    print ("Starting chrome...")
    start_scraper ()

    # Main loop for each video
    for video_link, title, description, tags_text, status in videos_data[1:]:
        
        # Tags to list
        tags = tags_text.split(",")

        # Validate video link
        if video_link:

            # Validate video status
            if not status or status == "no": 

                # Download video
                print (f"\nVideo: {title}")
                file_path = download.tiktok (video_link, title)

                # Ipload video
                if file_path: 
                    # Upload video to youtube
                    # youtube.upload (file_path, title, description, tags)
                    
                    # Upload video to instagram
                    # instagram.upload (file_path, title, description, tags)
                    
                    # Upload video to twitter

                    twitter.upload (file_path, title, description, tags)



if __name__ == "__main__":
    main()