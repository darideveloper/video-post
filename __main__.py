import os
import download 
import shutil
import globals
from uploaders import instagram, twitter, youtube, facebook
from config import Config
from moviepy.editor import VideoFileClip
from spreadsheet_manager.xlsx import SS_manager
from scraping_manager.automate import Web_scraping


# Project paths and global variables
globals.current_folder = os.path.dirname (__file__)
globals.videos_path = os.path.join (globals.current_folder, "videos.xlsx")
globals.download_folder = os.path.join (globals.current_folder, "downloads")

def start_scraper ():
    """ Start selenium with user settings and save as global variable
    """


    # Get browser Credentials
    credentials = Config()
    headless = not credentials.get_credential("show_browser")
    chrome_folder = credentials.get_credential("chrome_folder")

    # Start browser for install extensions
    globals.scraper = Web_scraping (headless=headless, 
                                    download_folder=globals.download_folder,
                                    chrome_folder=chrome_folder)   

def get_video_duration (video_path:str):
    """Get the duration in seconds from specific video

    Args:
        video_path (str): path of the video

    Returns:
        float: duation in seconds
    """
    clip = VideoFileClip(video_path)
    return clip.duration

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

    # Get upload Credentials
    credentials = Config()
    upload_instagram = credentials.get_credential("upload_instagram")
    upload_facebook = credentials.get_credential("upload_facebook")
    upload_twitter = credentials.get_credential("upload_twitter")
    upload_youtube = credentials.get_credential("upload_youtube")

    # Main loop for each video
    output_data = []
    for row in videos_data[1:]:

        video_link = row[0]
        title = row[1]
        description = row[2]
        tags_text = row[3]
        status = row[4]
        uploaded_instagram = row[4]
        uploaded_facebook = row[6]
        uploaded_twitter = row[7]
        uploaded_youtube = row[8]

        # Validate video link
        if not video_link:
            break
        else:

            # Tags to list
            tags = tags_text.split(",")

            # Validate video status
            if not status or status == "no": 

                # Default values for output uploaded in spreadsheet
                uploaded_instagram = "no"
                uploaded_facebook = "no"
                uploaded_twitter = "no"
                uploaded_youtube = "no"
                status = "yes"

                # Download video
                print (f"\nVideo: {title}")
                file_path = download.tiktok (video_link, title)

                # Ipload video
                if file_path: 
                    
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
                        facebook.upload (file_path, title, description, tags)
                        uploaded_facebook = "yes"

                    # End browser
                    globals.scraper.kill()
                    start_scraper ()

                    # Move file to done folder
                    shutil.move (file_path, file_path.replace("downloads", "done"))

        # Add row to output data
        output_data.append ([
            video_link, 
            title, 
            description, 
            tags_text, 
            status, 
            uploaded_instagram, 
            uploaded_facebook, 
            uploaded_twitter, 
            uploaded_youtube
        ])


    # End browser
    globals.scraper.kill()

    # Update data in output file
    ss.write_data (output_data, start_row=2, start_column=1)
    ss.save ()
    print ("Done")


if __name__ == "__main__":
    main()