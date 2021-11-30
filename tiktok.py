import os
import time
import downloader

def download (scraper:object, tiktok_url:str, title:str):
    """Download video from tictok and save it in downloads folder

    Args:
        scraper (object): web scraping instance
        tiktok_url (str): tiktok link
    """

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
        print ("Error to download, video omitted")
        
        # Close browser and end function
        scraper.kill()
        return None

    # get file link and extension
    downlod_link = scraper.get_attrib (download_selector, "href")
    separator = downlod_link.rfind (".")
    extension = downlod_link[separator+1:]

    # Download file
    file_path = os.path.join (os.path.dirname (__file__), "downloads", f"{title}.{extension}")
    downloader.download (downlod_link, file_path)
    return file_path

    