import pytesseract
from PIL import Image
import cv2


def extract_text_from_image(image_path: str):
    # Read image
    image = cv2.imread(image_path)

    if image is None:
        return ""

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Enlarge image for better OCR
    gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    # Reduce noise
    gray = cv2.medianBlur(gray, 3)

    # Apply threshold
    gray = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )[1]

    # Convert back to PIL Image
    pil_image = Image.fromarray(gray)

    # OCR
    text = pytesseract.image_to_string(
        pil_image,
        config="--oem 3 --psm 6"
    )

    return text.strip()