import sys
import os

# Add the parent directory of Scripts to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from googleapi import create_service

client_secret_file = 'clientsecret.json'
API_SERVICE_NAME = 'gmail'
API_VERSION = 'v1'
SCOPES = ['https://mail.google.com/']

service = create_service(client_secret_file, API_SERVICE_NAME, API_VERSION, SCOPES)
