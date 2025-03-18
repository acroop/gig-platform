import unittest
import json
import os
import nltk
from preprocess_email import preprocess_email


class TestPreprocessEmailWithJSON(unittest.TestCase):

    def setUp(self):
        # Ensure NLTK data path is correctly set
        nltk.data.path.append(r"D:\Files and Folders\web development\emailextraction\nlp\nltk")
        
        # Paths to input and output JSON files
        self.input_file = r"D:\Files and Folders\web development\emailextraction\email_details.json"  # Input JSON file
        self.output_file = "preprocessed_emails.json"  # Output JSON file

    def test_preprocess_email_json(self):
        # Load email data from the input JSON file
        with open(self.input_file, "r") as file:
            email_data = json.load(file)

        # Check if the output file already exists
        if os.path.exists(self.output_file):
            with open(self.output_file, "r") as file:
                existing_data = json.load(file)
        else:
            existing_data = []

        # Preprocess emails, ensuring no duplicate entries
        preprocessed_emails = existing_data + [
            preprocess_email(email) for email in email_data
            if preprocess_email(email) not in existing_data
        ]

        # Save the updated preprocessed data to the output file
        with open(self.output_file, "w") as file:
            json.dump(preprocessed_emails, file, indent=4)

        # Verify that the updated output file contains data
        with open(self.output_file, "r") as file:
            saved_data = json.load(file)

        self.assertGreater(len(saved_data), 0, "Preprocessed data should not be empty.")


if __name__ == "__main__":
    unittest.main()
