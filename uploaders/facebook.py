import time
import globals
from config import Config
from selenium.webdriver.common.keys import Keys

def upload (file_path:str, title:str, description:str, tags:list): 
    """ Upload video to facebook page """

    print ("\tUploading video to Facebook Page...")

    # Get page
    credentials = Config()
    facebook_page = credentials.get_credential ("facebook_page")

    # Open page 
    globals.scraper.set_page (facebook_page)
    time.sleep (5)
 
    # Upload file
    selector_input = 'input[accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"]'
    globals.scraper.send_data (selector_input, file_path)
    time.sleep (10)
    globals.scraper.refresh_selenium ()
    
    # Video title and description
    selector_details = '.k4urcfbm.l9j0dhe7.datstx6m.rq0escxv div[role="textbox"][contenteditable="true"]'
    tag_text = ""
    for tag in tags:
        tag_text += f"\n#{tag}"
    text_formated = f"{title}\n\n{description}\n{tag_text}"
    globals.scraper.click_js (selector_details)
    globals.scraper.send_data (selector_details, text_formated)
    time.sleep (1)
    globals.scraper.refresh_selenium ()

    # Post video
    selector_post = 'input[type="submit"]'
    globals.scraper.click_js (selector_post)
    time.sleep (15)