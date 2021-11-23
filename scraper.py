import os 
import time
from config import Config
from scraping_manager.automate import Web_scraping

def get ():
    """Start slenium width web scraping class and return class instance

    Returns:
        Web_scraping: runing instance of selenium / Web_scraping
    """

    print ("Starting chrome and installing extentions")

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
    
    # Close extensions tabs and end browser
    scraper.kill()

    # Restart chrome
    scraper = Web_scraping ( headless=headless, 
                             download_folder=download_folder,
                             extensions=extensions,
                             chrome_folder=chrome_folder)

    return scraper
    