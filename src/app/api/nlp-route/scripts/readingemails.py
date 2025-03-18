# import marimo as mo
# from readingemailfunc import init_gmail_service, get_email_messages, get_email_message_details

# client_file = 'client_secret.json'
# service = init_gmail_service(client_file)

# messages = get_email_messages(service, max_results=5)
# print(messages)


# for msg in messages:
#     details = get_email_message_details(service, msg['id'])
#     if details:
#         print(f"Subject: {details['subject']}")
#         print(f"From: {details['sender']}")
#         print(f"Recipients: {details['recipients']}")
#         print(f"Body: {details['body'][:100]}...")
#         print(f"Snippet: {details['snippet']}")
#         print(f"Has Attachments: {details['has_attachments']}")
#         print(f"Date: {details['date']}")
#         print(f"Star: {details['star']}")
#         print(f"Label: {details['label']}")
#         print("-" * 50)

import json
import marimo as mo
from readingemailfunc import init_gmail_service, get_email_messages, get_email_message_details

# Initialize Gmail service
client_file = 'client_secret.json'
service = init_gmail_service(client_file)

# Fetch email messages
messages = get_email_messages(service, max_results=5)

# List to store email details
email_details_list = []

# Loop through each message and extract details
for msg in messages:
    details = get_email_message_details(service, msg['id'])
    if details:
        email_details = {
            "subject": details['subject'],
            "sender": details['sender'],
            "recipients": details['recipients'],
            "body": details['body'][:100],  # Limiting body length
            "snippet": details['snippet'],
            "has_attachments": details['has_attachments'],
            "date": details['date'],
            "star": details['star'],
            "label": details['label']
        }
        email_details_list.append(email_details)

# Convert the list of dictionaries to JSON format
email_details_json = json.dumps(email_details_list, indent=4)

# Save the JSON to a file
with open("email_details.json", "w") as json_file:
    json_file.write(email_details_json)

# Print JSON to console
print(email_details_json)

