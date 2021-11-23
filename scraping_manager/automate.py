import os
import sys
import time
import logging
import zipfile
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

current_file = os.path.basename(__file__)

  
class Web_scraping (): 
    """
    Class to manage and configure web browser
    """
    
    def __init__ (
            self, web_page="", headless=True, time_out=0, 
            proxy_server="", proxy_port="", proxy_user="", proxy_pass="", 
            chrome_folder="", user_agent=True, capabilities=False,
            download_folder="", extensions=[]): 
        """
        Constructor of the class
        """
        
        self.basetime = 1

        # variables of class 
        self.__headless = headless
        self.__current_dir = os.path.dirname (__file__)
        self.__web_page = web_page
        self.__proxy_server = proxy_server
        self.__proxy_port = proxy_port
        self.__proxy_user = proxy_user
        self.__proxy_pass = proxy_pass
        self.__pluginfile = 'proxy_auth_plugin.zip'
        self.__chrome_folder = chrome_folder
        self.__user_agent = user_agent
        self.__capabilities = capabilities
        self.__download_folder = download_folder
        self.__extensions = extensions
        
        # Desable modules logs
        logging.disable(logging.DEBUG)
        
        # Create and instance of the web browser 
        self.__set_browser_instance()
        
        # Get current file name
        self.current_file = os.path.basename(__file__)
        
        # Set time out 
        if time_out > 0: 
            self.driver.set_page_load_timeout(30)

    def __set_browser_instance (self):
        """
        Open and configure browser
        """
        
        # Disable logs
        os.environ['WDM_LOG_LEVEL'] = '0'
        os.environ['WDM_PRINT_FIRST_LINE'] = 'False'
        
        # Configure browser
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--start-maximized')
        options.add_argument('--output=/dev/null')
        options.add_argument('--log-level=3')
        options.add_argument("--disable-notifications");
        options.add_argument("disable-infobars");
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        if self.__headless:        
            options.add_argument("--window-size=1920,1080")
            options.add_argument("--headless")
        
        # Set proxy without autentication
        if (self.__proxy_server and self.__proxy_port 
            and not self.__proxy_user and not self.__proxy_pass):
            
            proxy = f"{self.__proxy_server}:{self.__proxy_port}"
            options.add_argument(f"--proxy-server={proxy}")
        
        # Set proxy with autentification 
        if (self.__proxy_server and self.__proxy_port 
            and self.__proxy_user and self.__proxy_pass):
            
            self.__create_proxy_extesion()
            options.add_extension(self.__pluginfile)

        # Set chrome folder
        if self.__chrome_folder:
            options.add_argument(f"--user-data-dir={self.__chrome_folder}")

        # Set default user agent
        if self.__user_agent:
            options.add_argument('--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
        
        if self.__capabilities:
            capabilities = DesiredCapabilities.CHROME
            capabilities["goog:loggingPrefs"] = {"performance": "ALL"}
        else: 
            capabilities = None

        if self.__download_folder:
            prefs = {"download.default_directory" : f"{self.__download_folder}"}
            options.add_experimental_option("prefs",prefs)

        if self.__extensions:
            for extension in self.__extensions:
                options.add_extension(extension)


        
        # Set configuration to  and create instance
        chromedriver = ChromeDriverManager(chrome_type=ChromeType.GOOGLE, 
                                            log_level='0', 
                                            print_first_line=False).install()
        self.driver = webdriver.Chrome(chromedriver, 
                                options=options, 
                                service_log_path=None, 
                                desired_capabilities=capabilities)

        # Clean terminal
        # os.system('cls||clear')
        
        if self.__web_page: 
            self.driver.get (self.__web_page)

            # Wait to load page
            # time.sleep (self.basetime*5)
            
    def __create_proxy_extesion (self): 
        """Create a proxy chrome extension"""
        
        # plugin data
        manifest_json = """
        {
            "version": "1.0.0",
            "manifest_version": 2,
            "name": "Chrome Proxy",
            "permissions": [
                "proxy",
                "tabs",
                "unlimitedStorage",
                "storage",
                "<all_urls>",
                "webRequest",
                "webRequestBlocking"
            ],
            "background": {
                "scripts": ["background.js"]
            },
            "minimum_chrome_version":"22.0.0"
        }
        """

        background_js = """
        var config = {
                mode: "fixed_servers",
                rules: {
                singleProxy: {
                    scheme: "http",
                    host: "%s",
                    port: parseInt(%s)
                },
                bypassList: ["localhost"]
                }
            };

        chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});

        function callbackFn(details) {
            return {
                authCredentials: {
                    username: "%s",
                    password: "%s"
                }
            };
        }

        chrome.webRequest.onAuthRequired.addListener(
                    callbackFn,
                    {urls: ["<all_urls>"]},
                    ['blocking']
        );
        """ % (self.__proxy_server, self.__proxy_port, self.__proxy_user, self.__proxy_pass)

        # Compress file
        with zipfile.ZipFile(self.__pluginfile, 'w') as zp:
            zp.writestr("manifest.json", manifest_json)
            zp.writestr("background.js", background_js)
    
    def screenshot (self, base_name):
        """
        Take a sreenshot of the current browser window
        """ 

        if str(base_name).endswith(".png"):
            file_name = base_name
        else: 
            file_name = f"{base_name}.png"
            
        self.driver.save_screenshot(file_name)
             
    def get_browser (self): 
        """
        Return the current instance of web browser
        """
        
        return self.driver
    
    
    def end_browser (self): 
        """
        End current instance of web browser
        """    
        
        self.driver.close()
    
    
    def __reload_browser (self): 
        """
        Close the current instance of the web browser and reload in the same page
        """

        self.end_browser()
        self.driver = self.get_browser()
        self.driver.get (self.__web_page)

    
    def send_data (self, selector, data): 
        """
        Send data to specific input fill
        """
        
        elem = self.driver.find_element_by_css_selector (selector)
        elem.send_keys (data)

    
    def click (self, selector): 
        """
        Send click to specific element in the page
        """
        
        elem = self.driver.find_element_by_css_selector (selector)
        elem.click()
    
    
    def wait_load (self, selector, time_out = 10, refresh_back_tab=-1): 
        """
        Wait to page load an element
        """
        
        total_time = 0
        
        while True: 
            if total_time < time_out: 
                total_time += 1
                try: 
                    elem = self.driver.find_element_by_css_selector (selector)
                    elem.text
                    break
                except:
                    
                    # Wait time or refresh page
                    if refresh_back_tab != -1: 
                        self.refresh_selenium(back_tab=refresh_back_tab)
                    else:
                        time.sleep (self.basetime)
                        
                    continue
            else: 
                raise Exception ("Time out exeded. The element {} is not in the page".format (selector))
    
        
    def wait_die (self, selector, time_out = 10): 
        """
        Wait to page vanish and element
        """
                
        
        total_time = 0
        
        while True: 
            if total_time < time_out: 
                total_time += 1
                try: 
                    elem = self.driver.find_element_by_css_selector (selector)
                    elem.text
                    time.sleep(self.basetime)
                    continue
                except: 
                    break
            else: 
                raise Exception ("Time out exeded. The element {} is until in the page".format (selector))    
    
    
    def get_text (self, selector):
        """
        Return text for specific element in the page
        """
        
        try: 
            elem = self.driver.find_element_by_css_selector (selector)
            return elem.text
        except Exception as err: 
            # print (err)
            return None
        
    
    def get_texts (self, selector):
        """
        Return a list of text for specific selector
        """
        
        texts = []
        
        elems = self.driver.find_elements_by_css_selector (selector)
        
        for elem in elems:         
            try: 
                texts.append(elem.text)
            except:
                continue
        
        return texts
    
     
    def get_attrib (self, selector, attrib_name): 
        """
        Return the class value from specific element in the page
        """
        
        try: 
            elem = self.driver.find_element_by_css_selector (selector)
            return elem.get_attribute(attrib_name)
        except:
            return None
        
        
    def get_attribs (self, selector, attrib_name, allow_duplicates=True, allow_empty=True): 
        """
        Return the attributes value from specific element in the page
        """
        
        attributes = []
        elems = self.driver.find_elements_by_css_selector (selector)

        for elem in elems:

            try: 
                attribute = elem.get_attribute(attrib_name)
                
                # Skip duplicates in not duplicate mode
                if not allow_duplicates and attribute in attributes: 
                    continue
                
                # Skip empty results in not ampty mode
                if not allow_empty and attribute.strip() == "":
                    continue

                attributes.append(attribute)

            except: 
                continue
    
        return attributes
        
    def get_elem (self, selector):
        """
        Return an specific element in the page
        """
        
        elem = self.driver.find_element_by_css_selector (selector)
        return elem
    
    
    def get_elems (self, selector):
        """
        Return a list of specific element in the page
        """
        
        elems = self.driver.find_elements_by_css_selector (selector)
        return elems
    
    
    def set_page_js (self, web_page, new_tab=False): 
        """Open page with js, in current or new tab
        """
        
        self.__web_page = web_page
        
        if new_tab:
            script = f'window.open("{web_page}");'
        else: 
            script = f'window.open("{web_page}").focus();'
        
        print (script)
        
        self.driver.execute_script(script)
    
    def set_page (self, web_page, time_out=0, break_time_out=False):
        """
        Update the web page in browser
        """
        
        try:
            
            self.__web_page = web_page
            
            # Save time out when is greader than 0
            if time_out > 0:  
                self.driver.set_page_load_timeout(time_out)
            
            self.driver.get(self.__web_page)
            
        # Catch error in load page
        except TimeoutException: 
            
            # Raise error
            if break_time_out: 
                raise Exception(f"Time out to load page: {web_page}")
        
            # Ignore error
            else: 
                self.driver.execute_script("window.stop();")


    
    
    def click_js (self, selector): 
        """
        Send click with js, for hiden elements
        """
        
        elem = self.driver.find_element_by_css_selector (selector)
        self.driver.execute_script("arguments[0].click();", elem)
        
    
    def select_drop_dopwn (self, selector, item_index): 
        """
        Select specific elemet (with number) in a drop down elemet
        """
        
        elem = self.driver.find_element_by_css_selector (selector)
        
        elem.click()
        for _ in range(0, item_index):
            time.sleep(0.1)
            elem.send_keys(Keys.DOWN)
        elem.send_keys(Keys.ENTER)
    
    
    def go_bottom (self): 
        """
        Go to the end of the page, sending keys
        """
        
        elem = self.driver.find_element_by_css_selector ("body")
        elem.send_keys(Keys.CONTROL + Keys.END)
    
    
    def go_top (self): 
        """
        Go to the start of the page, sending keys
        """
        
        elem = self.driver.find_element_by_css_selector ("body")
        elem.send_keys(Keys.CONTROL + Keys.UP)
    
    
    def go_down (self): 
        """
        advance to down, in the page, sending keys
        """
        
        elem = self.driver.find_element_by_css_selector ("body")
        elem.send_keys(Keys.PAGE_DOWN)
    
    
    def go_up (self): 
        """
        Return to up, in page, sending keys
        """
        
        elem = self.driver.find_element_by_css_selector ("body")
        elem.send_keys(Keys.PAGE_UP)
    
    
    def switch_to_main_frame (self): 
        """
        Switch to the main contecnt of the page
        """
        
        self.driver.switch_to_default_content()
    
    
    def switch_to_frame (self, frame_id): 
        """
        Switch to iframe inside the main content
        """

        self.driver.switch_to_frame(frame_id)

    
    def open_tab (self): 
        """
        Create new empty tab in browser
        """

        self.driver.execute_script("window.open('');")

    
    def close_tab (self): 
        """
        Clase the current tab in the browser
        """

        self.driver.close()

    
    def switch_to_tab (self, number): 
        """
        Switch to specific number of tab
        """

        windows = self.driver.window_handles
        self.driver.switch_to.window(windows[number])
    
    
    def refresh_selenium (self, time_units=1, back_tab=0): 
        """
        Refresh the selenium data, creating and closing a new tab
        """
        
        # Open new tab and go to it
        self.open_tab()
        self.switch_to_tab(len(self.driver.window_handles)-1)
        
        # Wait time
        time.sleep(self.basetime * time_units)
        
        # Close new tab and return to specific tab
        self.close_tab()
        self.switch_to_tab(back_tab)     
        
        # Wait time
        time.sleep(self.basetime * time_units)   
    
    def save_page(self, file_html): 
        """ Save current page in local file"""
        page_html = self.driver.page_source
        current_folder = os.path.dirname (__file__)
        page_file = open(os.path.join (current_folder, file_html), "w")
        page_file.write(page_html)
        page_file.close()

    def zoom (self, percentage=50): 
        """ Custom page zoom with JS"""

        script = f"document.body.style.zoom='{percentage}%'"
        self.driver.execute_script (script)

    def kill (self):
        """ Detect and close all tabs """
        tabs = self.driver.window_handles
        for _ in tabs:
            self.switch_to_tab(1)
            self.end_browser()