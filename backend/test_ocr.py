from PIL import Image
import pytesseract

img = Image.open("test.png")  # Put a test image in the backend folder

text = pytesseract.image_to_string(img)

print("Detected Text:")
print("----------------")
print(text)