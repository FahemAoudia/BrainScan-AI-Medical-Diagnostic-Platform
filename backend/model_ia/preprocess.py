import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

DATASET_PATH = r"C:\Users\Ariska\Desktop\temur\backend\data"

# ✅ Amélioration de l'augmentation des données
datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    validation_split=0.2
)

IMG_SIZE = (224, 224)  

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,  
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,  
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

num_classes = len(train_data.class_indices)
print(f"🔍 Nombre de classes détectées : {num_classes}")