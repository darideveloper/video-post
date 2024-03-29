import os
import time
import globals
import requests

def tiktok (tiktok_url:str, title:str):
    """Download video from tictok and save it in downloads folder

    Args:
        globals.scraper (object): web scraping instance
        tiktok_url (str): tiktok link
    """

    print ("\tDownloading video...")

    # Open browser and go to snaptik
    time.sleep (5)
    globals.scraper.switch_to_tab (0)
    globals.scraper.set_page ("https://snaptik.app/en")

    # Paste link and start download
    selector_input = "#url"
    selector_submit = "#submiturl"
    globals.scraper.send_data(selector_input, tiktok_url)
    globals.scraper.click (selector_submit)
    
    # Wait for video load
    download_selector = 'a.abutton.is-success:nth-child(1)'
    
    try:
        globals.scraper.wait_load(download_selector, time_out=60)
    except:
        print ("Error to download, video omitted")
        
        # Close browser and end function
        globals.scraper.kill()
        return None

    # get file link and extension
    downlod_link = globals.scraper.get_attrib (download_selector, "href")
    separator = downlod_link.rfind (".")
    extension = downlod_link[separator+1:]

    # Download file
    file_path = os.path.join (os.path.dirname (__file__), "downloads", f"{title}.{extension}")
    mp4 (downlod_link, file_path)
    return file_path

def mp4 (url:str, file_path:str):
    """ Download mp4 video from link """

    res = requests.get (url)
    res.raise_for_status()
    with open (file_path, "wb") as file:
        for chunk in res.iter_content (chunk_size=8000):
            file.write (chunk)
    time.sleep (5)
    