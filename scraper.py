from config import Config
from scraping_manager.automate import Web_scraping

def get ():
    """Start slenium width web scraping class and return class instance

    Returns:
        Web_scraping: runing instance of selenium / Web_scraping
    """
    
    # Get credentials
    credentials = Config()
    headless = not credentials.get_credential("show_browser")
    
    return scraper
    