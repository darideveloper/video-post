#! python3
# Conect to google spreadsheets
import os
import gspread
import time
from oauth2client.service_account import ServiceAccountCredentials

class google_shets (): 
    """ Class to conect to google shets and upload data"""

    def __init__ (self, google_sheet_link, sheet_name=None): 
        """ Construtor of the class"""

        # Read credentials
        creds_path = os.path.join (os.path.dirname(__file__), 'credentials.json')
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

    def write_data (self, data): 
        """ Write list of data in the worksheet"""
        
        # check if data exist
        if not data: 
            print ("THERE IS NO NEW INFORMATION TO WRITE IN THE FILE.")
        else:
            print ("Writing information on spreadsheet...")

            # Loop for each row of data
            for row in data: 

                # Set the position of the next row. Omit the header
                position = data.index(row) + 2

                # Write data in gss
                self.write_row (row, position)


    def write_row (self, data, row):
        """ Write a row in the spread sheet, at specific position"""

        time.sleep (10)

        # Insert row in specific position of the worksheet
        self.worksheet.insert_row (data, row)

    def get_data (self): 
        """ Read all records of the sheet"""

        records = self.worksheet.get_all_records()
        return records

    def skip_duplicates (self, data): 
        """ Skip duplicate registers from the data"""

        if data: 
            print ("Deleting duplicates...")


        # Request all data of the sheet
        sheet_data = self.get_data()

        # List of duplicated records
        duplicated_records = []

        # loop for each row in the current data of the files
        for row_files in data: 

            # Read each row of the data in the current sheet
            for row_sheet in sheet_data: 
                
                # Get text values from the google sheet
                vendor = row_sheet["Vendor"]
                number = row_sheet["Invoice number"]
                date = row_sheet["Invoice date"]
                customer = row_sheet["Customer"]
                concept = row_sheet["Concept"]

                # Get number values from google sheet
                total = row_sheet["Total invoice amount"]
                concept_amount = row_sheet["Concept amount"]
                client_reference = row_sheet["PO#"]
                
                # Skip empty rows
                if total == '': 
                    continue

                # Dalete comma and replice total with the same value * 100 (for avoid decimals)
                if str(total).count(","): 
                    total = int(float(str(total).replace(",",""))*100)
                else: 
                    total = int(total * 100)
                
                # Dalete comma and replice concept_amount with the same value * 100 (for avoid decimals)
                concept_amount = self.remove_extra_info (concept_amount)                

                # Verify each value of the data row
                concept_amount_files = self.remove_extra_info (row_files[5])
      

                # Verify each value of the data row
                client_reference_files = row_files[7]

            
                if (str(row_files[1]).strip().lower() == number.strip().lower()
                    and str(row_files[2]).strip().lower() == date.strip().lower()
                    and str(row_files[3]).strip().lower() == customer.strip().lower()
                    and int(float(row_files[4].replace(',',''))*100) == total
                    and concept_amount_files == concept_amount
                    and str(row_files[6]).strip().lower() == concept.strip().lower() 
                    and client_reference_files == client_reference):

                    # Add current row to duplicated records
                    duplicated_records.append (row_files)
                
        # Remove each duplicated row od the data
        for duplicated_row in duplicated_records: 

            # Check if the current duplicate row is in the data list yet, and remove
            if duplicated_row in data: 
                data.remove (duplicated_row)

        return data

    def update_data (self, data): 
        """ Seach row to update and replice it with the new information"""

        if data: 
            print ("Updating records...")

        # Request all data of the sheet
        sheet_data = self.get_data()

        # List of update records
        update_records = []

        # loop for each row in the current data of the files
        for row_files in data: 

            # Read each row of the data in the current sheet
            for row_sheet in sheet_data: 
                
                # Get text values from the google sheet
                vendor = row_sheet["Vendor"]
                number = row_sheet["Invoice number"]
                date = row_sheet["Invoice date"]
                customer = row_sheet["Customer"]
                concept = row_sheet["Concept"]

                # Get number values from google sheet
                total = row_sheet["Total invoice amount"]
                concept_amount = row_sheet["Concept amount"]
                

                # Dalete comma and replice total with the same value * 100 (for avoid decimals)
                total = self.remove_extra_info (total)
                    
                # Dalete comma and replice concept_amount with the same value * 100 (for avoid decimals)
                concept_amount = self.remove_extra_info (concept_amount)

                # Verify each value of the data row
                if (str(row_files[1]).strip().lower() == number.strip().lower()
                    and str(row_files[3]).strip().lower() == customer.strip().lower()
                    and str(row_files[6]).strip().lower() == concept.strip().lower() ):
                    
                    print (row_files)

                    # Get the position in the sheet of he row to update
                    position = sheet_data.index (row_sheet) + 2

                    # Replice the last data
                    self.worksheet.delete_row (position)

                    time.sleep (5)

                    # Write new information
                    self.write_row (row_files, position)

                    # Add current row to update records
                    update_records.append (row_files)

        # Remove each update row of the data
        for update_row in update_records: 

            # Check if the current duplicate row is in the data list yet, and remove
            if update_row in data: 
                data.remove (update_row)

        return data

    def print_data (self, data): 
        """ Print all data for debug"""

        for row in data: 
            print (row)

    def remove_extra_info (self, value): 
        """
        Remove text and comas in quantity
        """

        if value != "":

            # Remove comas
            if "," in str(value).strip(): 
                value = str(value).replace(",","")

            # Remove white spaces
            if " " in str(value).strip():
                position = str(value).strip().rfind (" ")
                value = value[position+1:]

            # Convert value to int and multiply
            value = int(float(str(value).strip()) * 100)
        
        return value



