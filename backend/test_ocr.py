from app.services.ocr_service import extract_text_from_image
import pytesseract

print(
    pytesseract.get_tesseract_version()
)