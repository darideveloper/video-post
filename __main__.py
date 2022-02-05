import os
import sys
import shutil
import globals
import download
from uploaders import instagram, twitter, youtube, facebook
from config import Config
from moviepy.editor import VideoFileClip
from spreadsheet_manager.google_ss import SS_manager
from scraping_manager.automate import Web_scraping

# Get credentials
credentials = Config()
chrome_folder = credentials.get ("chrome_folder")
facebook_page = credentials.get ("facebook_page")
api_key = credentials.get ("api_key")
sheet_url = credentials.get ("sheet_url")
upload_instagram = credentials.get ("instagram")
upload_facebook = credentials.get ("facebook")
upload_twitter = credentials.get ("twitter")
upload_youtube = credentials.get ("youtube")
upload_tiktok = credentials.get ("tiktok")

# Global variables
globals.current_folder = os.path.dirname (__file__)
globals.download_folder = os.path.join (globals.current_folder, "downloads")
globals.chrome_folder = chrome_folder


def start_scraper ():
    """ Start selenium with user settings and save as global variable
    """


    # Start browser for install extensions
    globals.scraper = Web_scraping (headless=False, 
                                    download_folder=globals.download_folder,
                                    chrome_folder=globals.chrome_folder)   

def get_video_duration (file_path:str):
    """Get the duration in seconds from specific video

    Args:
        file_path (str): path of the video

    Returns:
        float: duation in seconds
    """
    clip = VideoFileClip(file_path)
    clip.close()
    return clip.duration

def main (): 
    """
    Download videos from tiktok and post in: 
        * facebook page
        * youtube shorts
        * instagram reels
        * twitter
        * tiktok
    """

    # Get data from file
    print ("connecting with google sheet...")
    ss = SS_manager(sheet_url, api_key)
    videos_data = ss.get_data()

    print ("Starting chrome...")
    start_scraper ()

    # Main loop for each video
    output_data = []
    for row in videos_data[2:]:

        video_url_name = row["url or name"]
        title = row["title"]
        description = row["description"]
        tags_text = row["tags"]
        processed = row["processed"]
        uploaded_instagram = row["uploaded instagram"]
        uploaded_facebook = row["uploaded facebook"]
        uploaded_twitter = row["uploaded twitter"]
        uploaded_youtube = row["uploaded youtube"]
        uploaded_tiktok = row["uploaded tiktok"]

        # Validate video link
        if not video_url_name:
            break
        else:


            # Tags to list
            tags = tags_text.split(",")

            # Validate video processed
            if not processed or processed == "no": 
                
                print (f"Current video: {title}")

                # Default values for output uploaded in spreadsheet
                uploaded_instagram = "no"
                uploaded_facebook = "no"
                uploaded_twitter = "no"
                uploaded_youtube = "no"
                uploaded_tiktok = "no"
                processed = "yes"

                # Download video
                if "www.tiktok.com" in video_url_name:
                    # Download tiktok video
                    file_path = download.tiktok (video_url_name, title)
                else:
                    # Validate video path
                    file_path = os.path.join (globals.current_folder, "downloads", video_url_name)
                    if not os.path.isfile (file_path):
                        raise FileNotFoundError (file_path)

                duration = get_video_duration (file_path)

                # Validate duration for youtube and instagram
                if duration <= 60:
                    # Upload video to youtube
                    if upload_youtube:
                        youtube.upload (file_path, title, description, tags)
                        uploaded_youtube = "yes"

                    # Upload video to instagram
                    if upload_instagram:
                        instagram.upload (file_path, title, description, tags)
                        uploaded_instagram = "yes"
                else:
                    print ("\tYoutube and Instagram: video skipped (60 sec it's max time for youtube shorts and instagram reels)")

                # Validate duration for twitter
                if duration <= 140:
                    if upload_twitter: 
                        # Convert video
                        file_converted = twitter.convert (file_path)
                        globals.scraper.kill ()
                        start_scraper ()

                        # Upload video to twitter
                        twitter.upload (file_converted, title, description, tags)
                        uploaded_twitter = "yes"

                        # Move twitter file to done folder
                        shutil.move (file_converted, file_converted.replace("downloads", "done"))

                else:
                    print ("\tTwitter: video skipped (2:20 min it's max time for twitter)")
                
                # Post in faebook page without time validation
                if upload_facebook:
                    facebook.upload (facebook_page, file_path, title, description, tags)
                    uploaded_facebook = "yes"

                # End browser
                globals.scraper.kill()
                start_scraper ()

                # Move file to done folder
                # os.replace (file_path, file_path.replace("downloads", "done"))

        # Add row to output data
        output_data.append ([
            video_url_name, 
            title, 
            description, 
            tags_text, 
            processed, 
            uploaded_instagram, 
            uploaded_facebook, 
            uploaded_twitter, 
            uploaded_youtube
        ])

    # End browser
    globals.scraper.kill()

    # # Update data in output file
    # ss.write_data (output_data, start_row=2, start_column=1)
    # ss.save ()
    # print ("Done")


if __name__ == "__main__":
    main()