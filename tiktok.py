import os
import time
from config import Config
from scraping_manager.automate import Web_scraping

def download (tiktok_url:str):
    """Download video from tictok and save it in downloads folder

    Args:
        tiktok_url (str): tiktok link
    """

    print ("\tStarting chrome and installing extentions...")

    current_folder = os.path.dirname (__file__)
    
    # Get credentials
    credentials = Config()
    headless = not credentials.get_credential("show_browser")
    download_folder = os.path.join (current_folder, "downloads")

    # Get chrome extentiosn path from extensions folder
    extensions = []
    extensions_folder = os.path.join (current_folder, "extensions")
    for extension in os.listdir(extensions_folder):
        extension_path = os.path.join (extensions_folder, extension)
        extensions.append (extension_path)
    
    # Chrome data folder
    chrome_folder = os.path.join (current_folder, "chrome_data_2")

    # Start browser for install extensions
    scraper = Web_scraping ( headless=headless, 
                             download_folder=download_folder,
                             extensions=extensions)

    print ("\tDownloading video...")

    # Open browser and go to snaptik
    time.sleep (5)
    scraper.switch_to_tab (0)
    scraper.set_page ("https://snaptik.app/en")

    # Paste link and start download
    selector_input = "#url"
    selector_submit = "#submiturl"
    scraper.send_data(selector_input, tiktok_url)
    scraper.click (selector_submit)
    
    # Wait for video load
    download_selector = 'a.abutton.is-success:nth-child(1)'
    try:
        scraper.wait_load(download_selector, time_out=60)
    except:
        return None
    scraper.click (download_selector)
    time.sleep (5)

    # Close browser
    scraper.kill()
    