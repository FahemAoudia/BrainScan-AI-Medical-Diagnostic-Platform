import cv2

def highlight_tumor(image_path, tumor_location):
    img = cv2.imread(image_path)
    x, y, w, h = tumor_location
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
    highlighted_image_path = "highlighted_image.jpg"
    cv2.imwrite(highlighted_image_path, img)
    return highlighted_image_path