import os 
import time
from config import Config
from scraping_manager.automate import Web_scraping

def upload (scraper:object, file_path:str, title:str, description:str, tags:list): 
    """ Upload video to yourube shorts """

    print ("\tUploading video to youtube shorts...")

    # Open page 
    youtube_url = "https://studio.youtube.com/"
    scraper.set_page (youtube_url)

    # Dimiss button
    selector_continue = "#dismiss-button"
    try:
        scraper.click (selector_continue)
    except:
        pass
    scraper.refresh_selenium()

    # Open upload
    selector_upload = "#upload-button"
    selector_upload_icon = "#upload-icon"
    try:
        scraper.click (selector_upload)
    except:
        scraper.click (selector_upload_icon)
    scraper.refresh_selenium()

    # Upload file
    selector_input = 'input[type="file"]'
    scraper.send_data (selector_input, file_path)
    scraper.refresh_selenium()
    time.sleep (10)

    # Video title 
    # selector_description = ".input-container.title #textbox"
    # scraper.send_data (selector_description, title)

    # Video description 
    selector_description = ".input-container.description #textbox"
    scraper.send_data (selector_description, description)

    # No child content
    selector_no_child = "tp-yt-paper-radio-button:nth-child(2)"
    scraper.click (selector_no_child)

    # Open more details
    selector_more = "#toggle-button"
    scraper.click (selector_more)
    time.sleep (3)
    scraper.refresh_selenium()

    # Tags
    selector_tags = "#tags-container #text-input"
    for tag in tags:
        scraper.send_data (selector_tags, f"{tag}\n")

    # Next pages
    selector_next = "#next-button"
    scraper.click (selector_next)
    scraper.refresh_selenium()
    scraper.click (selector_next)
    scraper.refresh_selenium()
    scraper.click (selector_next)
    scraper.refresh_selenium()

    # Public type
    selector_public = 'tp-yt-paper-radio-button[name="PUBLIC"]'
    scraper.click (selector_public)

    # Publish video
    selector_publish = "#done-button"
    scraper.click (selector_publish)
    time.sleep (15)

    print ("\t\tYoutube done.")