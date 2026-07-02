import os
import pytesseract
from PIL import Image

# Only use the Windows path when running locally on Windows
if os.name == "nt":
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )


def extract_text_from_image(image_path: str):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text