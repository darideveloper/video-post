import time
import globals
from selenium.webdriver.common.keys import Keys

def upload (file_path:str, title:str, description:str, tags:list): 
    """ Upload video to instagram reels """

    print ("\tUploading video to Instagram Reels...")

    # Open page 
    instagram_url = "https://www.instagram.com/"
    globals.scraper.set_page (instagram_url)
    globals.scraper.set_page (instagram_url)
    globals.scraper.send_data ("body", Keys.CONTROL + Keys.SHIFT + "r")
    time.sleep (5)

    # Open reels
    selector_new = "nav.NXc7H.jLuN9 .J5g42 > .XrOey:nth-child(3)"
    globals.scraper.click (selector_new)
    globals.scraper.refresh_selenium ()
    selector_reel = '.CreationPopup.CreationPopup_show > [data-id="reel"]'
    globals.scraper.click (selector_reel)
    globals.scraper.refresh_selenium ()
 
    # Upload file
    selector_input = 'input[accept="video/mp4,video/quicktime"]'
    globals.scraper.send_data (selector_input, file_path)
    time.sleep (10)
    
    # Go to video details
    selector_continue = ".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6"
    globals.scraper.click (selector_continue)
    time.sleep (2)
    globals.scraper.refresh_selenium ()
    globals.scraper.click (selector_continue)
    time.sleep (2)
    globals.scraper.refresh_selenium ()
    
    # Video title and description
    selector_details = 'textarea[aria-label="Write a caption..."]'
    tag_text = ""
    for tag in tags:
        tag_text += f"\n#{tag}"
    text_formated = f"{title}\n\n{description}\n{tag_text}"
    time.sleep (1)
    globals.scraper.send_data (selector_details, text_formated)

    # Share video
    selector_share = ".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6"
    globals.scraper.click (selector_share)
    time.sleep (15)
