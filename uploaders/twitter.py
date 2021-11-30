import time
import download
import globals
from selenium.webdriver.common.keys import Keys

def convert (file_path:str): 
    """ Upload video to twitter """

    print ("\tConverting video for twitter...")
    
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
        selector_download = 'a.btn.btn-large.btn-download[title="Descargar tu archivo"]'
        downlod_link = globals.scraper.get_attrib (selector_download, "href")
        if downlod_link and downlod_link != 'https://www.online-convert.com/es':
            time.sleep (10)
            downlod_link = globals.scraper.get_attrib (selector_download, "href")
            break
        else:
            continue

    # Download file
    file_converted = file_path.replace(".mp4", " for twitter.mp4")
    download.mp4 (downlod_link, file_converted)
    return file_converted


def upload (file_path:str, title:str, description:str, tags:list): 

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
    
    # Wait to update video
    selector_placeholder = ".public-DraftEditorPlaceholder-inner"
    while True:
        time.sleep (2)
        place_holder = globals.scraper.get_text (selector_placeholder)
        if place_holder:
            break
        else:
            continue
