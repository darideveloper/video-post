#! python3
# Conect to google spreadsheets
import os
import gspread
import time
import sys
from oauth2client.service_account import ServiceAccountCredentials

class SS_manager (): 
    """ Class to conect to google shets and upload data"""

    def __init__ (self, google_sheet_link, creds_path, sheet_name=None): 
        """ Construtor of the class"""

        # Read credentials
        if not os.path.isfile (creds_path):
            raise FileNotFoundError ("The credential file path is not correct")
        
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        creds = ServiceAccountCredentials.from_json_keyfile_name(creds_path, scope)
        client = gspread.authorize(creds)

        # Conect to google sheet
        sheet = client.open_by_url(google_sheet_link)

        # Set the sheet 1 as worksheet
        if sheet_name:
            self.worksheet = sheet.worksheet(sheet_name)
        else:
            self.worksheet = sheet.sheet1

    def write_cell (self, value, row=1, column=1):
        """ Write data in specific cell 
        """
        self.worksheet.update_cell(row, column, value)

    def write_data (self, data, row=1, column=1): 
        """ Write list of data in the worksheet"""
        
        # check if data exist
        if not data: 
            print ("THERE IS NO NEW INFORMATION TO WRITE IN THE FILE.")
        else:
            print ("Writing information on spreadsheet...")

            # Loop for each row of data
            for row_data in data: 

                # Set the position of the next row. Omit the header
                row_index = data.index(row_data) + row
                
                for cell in row_data:
                    column_index = row_data.index (cell) + column

                    # Write data in gss
                    print (row_index, column_index, cell)
                    self.write_cell (cell, row_index, column_index)


    def get_data (self): 
        """ Read all records of the sheet"""

        records = self.worksheet.get_all_records()
        return records


path = "D:\\Sync\\Dari Developer\\projects resell\\video post\\sheets-340407-d8642222c103.json"
link = "https://docs.google.com/spreadsheets/d/1Eh1cNEcCkgpN9NYtx7_aTUBhNP37zXvzxQWuufPiw0M/edit?usp=sharing"
ss_manager = SS_manager (link, path, sheet_name=None)

ss_manager.write_data ([
    ["hola", "mundo"],
    ["dari", "developer"]
], column=5, row=4)