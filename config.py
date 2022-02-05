import os
import json

current_file = os.path.basename(__file__)
current_folder = os.path.dirname(__file__)  
default_config_path = os.path.join(current_folder, "config.json")

class Config ():
    def __init__ (self, config_path=default_config_path, utf8=False): 
        """Contructor of class

        Args:
            config_path (str/path, optional): Json file for process credentials. Defaults to config.json file.
            utf8 (bool, optional): Read or write data in utf8 format. Defaults to False.
        """
        self.config_path=config_path
        self.utf8=utf8

        config_exist = os.path.isfile(self.config_path)
        if not config_exist: 
            print (f"NOT FILE {self.config_path}")

    def get (self, credential=""): 
        """
        Get specific credential from config file
        """
        
        # Read credentials file 
        if self.utf8: 
            config_file = open(self.config_path, "r", encoding='utf-8')
        else: 
            config_file = open(self.config_path, "r")
        
        # Get specific credential
        try:
            config_data = json.loads(config_file.read())
            return (config_data[credential])
        except Exception as err: 
            # print (err)
            return ""

        # Close file
        config_file.close()

    def get_all (self): 
        """
        return all crdentials from file
        """

        # Read credentials file 
        if self.utf8: 
            config_file = open(self.config_path, "r", encoding='utf-8')
        else: 
            config_file = open(self.config_path, "r")
        
        # Get specific credential
        try:
            config_data = json.loads(config_file.read())
            return (config_data)
        except Exception as err: 
            print (err)
            return ""

        # Close file
        config_file.close()

    def create_config (self, credentials, rewrite=False): 
        """
        Create a config file with default credentials
        """
        
        if rewrite: 
            open_mode = "w"
        else: 
            open_mode = "a"

        with open (self.config_path, open_mode) as config_file:
            config_file.write(json.dumps(credentials))
            

    def update (self, credential="", value=""): 
        """
        Update specific credential in config file
        """
        
        with open (self.config_path, "r") as config_file: 
            config_data = json.loads(config_file.read())
            config_data[credential] = value
        
        with open (self.config_path, "w") as config_file:
            config_file.write(json.dumps(config_data))

    def update_all (self, credentials, values): 
        """
        Update credentials
        """
        
        for cred_config, cred_gui in credentials.items(): 
            
            new_credential = values[cred_gui]
            self.update (cred_config, new_credential)