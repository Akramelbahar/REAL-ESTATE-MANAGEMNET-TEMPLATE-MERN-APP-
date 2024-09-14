import os
import fileinput

def replace_text_in_files(root_dir, old_text, new_text):
    # Walk through the directory tree
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(subdir, file)
            try:
                # Open the file with UTF-8 encoding and ignore encoding errors
                with fileinput.FileInput(file_path, inplace=True, mode='r', encoding='utf-8', errors='ignore') as file:
                    for line in file:
                        
                        print(line.replace(old_text, new_text), end='')
            except Exception as e:
                print(f"Could not process {file_path}: {e}")

if __name__ == "__main__":
    # Define root directory and the text to replace
    root_directory = 'C:/Users/akram/Desktop/BACKEND-main'
    text_to_replace = 'https://backend-hgsc.onrender.com'
    replacement_text = 'https://backend-hgsc.onrender.com'  # Assuming you're replacing with a new URL

    replace_text_in_files(root_directory, text_to_replace, replacement_text)
