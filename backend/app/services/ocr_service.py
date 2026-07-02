import os
import requests


API_KEY = os.getenv("OCR_SPACE_API_KEY")


def extract_text_from_image(image_path: str):

    with open(image_path, "rb") as image_file:

        response = requests.post(
            "https://api.ocr.space/parse/image",
            files={
                "filename": image_file
            },
            data={
                "apikey": API_KEY,
                "language": "eng",
                "isOverlayRequired": False,
            },
        )

    result = response.json()

    if result.get("IsErroredOnProcessing"):
        raise Exception(result.get("ErrorMessage"))

    parsed_results = result.get("ParsedResults")

    if not parsed_results:
        return ""

    return parsed_results[0].get("ParsedText", "")