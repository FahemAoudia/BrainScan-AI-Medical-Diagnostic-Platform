import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
from .utils import highlight_tumor  
model_path = os.path.join(os.path.dirname(__file__), "model.h5")
print(f"🔍 Chargement du modèle depuis : {model_path}")

# Chargement du modèle
model = tf.keras.models.load_model(model_path)
print("✅ Modèle chargé avec succès")


class_labels = {0: "glioma", 1: "meningioma", 2: "notumor", 3: "pituitary"}
print(f"✅ {class_labels}")

def predict_tumor(image_path):
    if not os.path.exists(image_path):
        return {"error": "❌ "}

    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)[0]
    predicted_class_index = np.argmax(prediction)
    predicted_class = class_labels[predicted_class_index]
    confidence = np.max(prediction) * 100

    probabilities = {class_labels[i]: f"{prob * 100:.2f}%" for i, prob in enumerate(prediction)}

    tumor_location = None  
    if tumor_location:
        highlighted_image_path = highlight_tumor(image_path, tumor_location)
    else:
        highlighted_image_path = None

    return {
        "prediction": predicted_class,
        "confidence": f"{confidence:.2f}%",
        "probabilities": probabilities,
        "highlighted_image": highlighted_image_path
    }