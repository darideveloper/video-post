import time
import download
import globals
from selenium.webdriver.common.keys import Keys

def upload (file_path:str, title:str, description:str, tags:list): 
    """ Upload video to twitter """

    print ("\tConverting video...")
    
    # Open converter page
    converter_url = "https://servicios-web.online-convert.com/es/convertir-para-twitter"
    globals.scraper.set_page (converter_url)

    # Upload video
    selector_input = "#fileUploadInput"
    globals.scraper.send_data (selector_input, file_path)

    # Start conversion
    selector_start = "button.btn.btn-lg.submit-btn.mb-0"
    last_url = globals.scraper.driver.current_url
    while True:
        globals.scraper.click (selector_start)
        time.sleep (2)
        current_url = globals.scraper.driver.current_url
        if current_url != last_url:
            break 

    # Get download link
    while True:
        time.sleep (2)
        selector_download = "a.btn.btn-large.btn-download"
        downlod_link = globals.scraper.get_attrib (selector_download, "href")
        if downlod_link:
            break
        else:
            continue

    # Download file
    file_converted = file_path.replace(".mp4", " for twitter.mp4")
    download.mp4 (downlod_link, file_converted)

    # Restart browser for close download pop-up
    globals.scraper.kill ()

    print ("\tUploading video to Twitter...")

    # Open page 
    twitter_url = "https://twitter.com/home"
    globals.scraper.set_page (twitter_url)
    time.sleep (5)
    globals.scraper.refresh_selenium ()

    # Upload file
    selector_input = 'input[accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"]'
    globals.scraper.send_data (selector_input, file_path)
    time.sleep (10)
    
    # Video title and description
    selector_details = 'label[data-testid="tweetTextarea_0_label"] div[role="textbox"]'
    tag_text = ""
    for tag in tags:
        tag_text += f"\n#{tag}"
    text_formated = f"{title}\n\n{description}\n{tag_text}"
    globals.scraper.send_data (selector_details, text_formated)

    # Post tweet
    selector_share = 'div[data-testid="tweetButtonInline"]'
    globals.scraper.click_js (selector_share)
    time.sleep (20)
