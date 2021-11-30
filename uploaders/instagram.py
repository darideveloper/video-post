import time
from selenium.webdriver.common.keys import Keys

def upload (scraper:object, file_path:str, title:str, description:str, tags:list): 
    """ Upload video to instagram reels """

    print ("\tUploading video to Instagram Reels...")

    # Open page 
    instagram_url = "https://www.instagram.com/"
    scraper.set_page (instagram_url)
    scraper.set_page (instagram_url)
    scraper.send_data ("body", Keys.CONTROL + Keys.SHIFT + "r")
    time.sleep (5)

    # Open reels
    selector_new = "nav.NXc7H.jLuN9 .J5g42 > .XrOey:nth-child(3)"
    scraper.click (selector_new)
    scraper.refresh_selenium ()
    selector_reel = '.CreationPopup.CreationPopup_show > [data-id="reel"]'
    scraper.click (selector_reel)
    scraper.refresh_selenium ()
 
    # Upload file
    selector_input = 'input[accept="video/mp4,video/quicktime"]'
    scraper.send_data (selector_input, file_path)
    time.sleep (10)
    
    # Go to video details
    selector_continue = "button.sqdOP.yWX7d.y3zKF"
    scraper.click (selector_continue)
    time.sleep (2)
    scraper.refresh_selenium ()
    scraper.click (selector_continue)
    time.sleep (2)
    scraper.refresh_selenium ()
    
    # Video title and description
    selector_details = 'textarea'
    tag_text = ""
    for tag in tags:
        tag_text += f"\n#{tag}"
    text_formated = f"{title}\n\n{description}\n{tag_text}"
    scraper.send_data (selector_details, text_formated)

    # Share video
    selector_share = ".qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.XfCBB.g6RW6"
    scraper.click (selector_share)
    time.sleep (15)
