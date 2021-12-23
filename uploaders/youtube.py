import time
import globals

def upload (file_path:str, title:str, description:str, tags:list): 
    """ Upload video to youtube shorts """

    print ("\tUploading video to Youtube Shorts...")

    # Open page 
    youtube_url = "https://studio.youtube.com/"
    globals.scraper.set_page (youtube_url)

    # Ignore browser warning
    selector_go_shorts = "body > div > div.buttons > a.button.text-button.black-secondary:only-child"
    try:
        globals.scraper.click (selector_go_shorts)
    except:
        pass
    globals.scraper.refresh_selenium()

    # Dimiss button
    selector_continue = "#dismiss-button"
    try:
        globals.scraper.click (selector_continue)
    except:
        pass
    globals.scraper.refresh_selenium()

    # Open upload
    selector_upload = "#upload-button"
    selector_upload_icon = "#upload-icon"
    try:
        globals.scraper.click_js (selector_upload)
    except:
        globals.scraper.click_js (selector_upload_icon)
    globals.scraper.refresh_selenium()

    # Upload file
    selector_input = 'input[type="file"]'
    globals.scraper.send_data (selector_input, file_path)
    globals.scraper.refresh_selenium()
    time.sleep (10)

    # Video title 
    # selector_description = ".input-container.title #textbox"
    # globals.scraper.send_data (selector_description, title)

    # Video description 
    selector_description = ".input-container.description #textbox"
    globals.scraper.send_data (selector_description, description)

    # No child content
    selector_no_child = "tp-yt-paper-radio-button:nth-child(2)"
    globals.scraper.click (selector_no_child)

    # Open more details
    selector_more = "#toggle-button"
    globals.scraper.click (selector_more)
    time.sleep (3)
    globals.scraper.refresh_selenium()

    # Tags
    selector_tags = "#tags-container #text-input"
    for tag in tags:
        globals.scraper.send_data (selector_tags, f"{tag}\n")

    # Next pages
    selector_next = "#next-button"
    globals.scraper.click (selector_next)
    globals.scraper.refresh_selenium()
    globals.scraper.click (selector_next)
    globals.scraper.refresh_selenium()
    globals.scraper.click (selector_next)
    globals.scraper.refresh_selenium()

    # Public type
    selector_public = 'tp-yt-paper-radio-button[name="PUBLIC"]'
    globals.scraper.click (selector_public)

    # Publish video
    selector_publish = "#done-button"
    globals.scraper.click (selector_publish)
    time.sleep (15)
