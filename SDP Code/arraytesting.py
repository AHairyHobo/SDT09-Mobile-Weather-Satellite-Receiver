import numpy as np
from PIL import Image

Canvas = np.array([[[255, 0, 0], [0, 255, 0]], [[0, 0, 0], [0, 0, 0]]], dtype=np.uint8)
red = np.array([[255, 0],[0, 0]])
green = np.array([[0, 255],[0, 0]])
blue = np.array([[0, 0],[0, 0]])
rgb = np.stack([red, green, blue], axis=2)
print(rgb)
print(Canvas)
img = Image.fromarray(rgb, 'RGB')
img.show()