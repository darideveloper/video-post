import time
import globals

def upload (file_path:str, title:str, description:str, tags:list): 
    """ Upload video to tiktok """

    print ("\tUploading video to Tiktok...")

    # Open page 
    globals.scraper.set_page ("https://www.tiktok.com/upload?lang=en")
    time.sleep (5)

    # Add id to frame
    iframe_selector = "iframe"
    iframe = globals.scraper.get_elem (iframe_selector)
    globals.scraper.driver.execute_script("arguments[0].setAttribute('id', 'iframe');", iframe)
    time.sleep (2)
    globals.scraper.refresh_selenium ()

    # Swicth to internal frame
    globals.scraper.switch_to_frame ("iframe")
    time.sleep (2)

    # Upload file
    selector_input = 'input[accept="video/*"]'
    globals.scraper.send_data (selector_input, file_path)
    time.sleep (10)

    # Video title and description
    selector_details = 'div[aria-autocomplete="list"][role="combobox"]'
    tag_text = ""
    for tag in tags:
        tag_text += f" #{tag}"
    text_formated = f" - {description} - {tag_text}"
    globals.scraper.send_data (selector_details, text_formated)
    time.sleep (1)

    # Post video
    selector_post = 'button.tiktok-btn-pc.tiktok-btn-pc-primary'
    globals.scraper.click_js (selector_post)
    time.sleep (15)