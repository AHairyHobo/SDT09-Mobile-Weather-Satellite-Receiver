from netCDF4 import Dataset
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

def rebin(a, shape):
    sh = shape[0],a.shape[0]//shape[0],shape[1],a.shape[1]//shape[1]
    return a.reshape(sh).mean(-1).mean(1)

#Loading channel 2
g16nc = Dataset('../netCDF Test Files/OR_ABI-L1b-RadF-M6C02_G16_s20250412230206_e20250412239514_c20250412239542.nc', 'r')
radiance = g16nc.variables['Rad'][:]
g16nc.close()
g16nc = None

#defining some constants
Esun_Ch_01 = 726.721072
Esun_Ch_02 = 663.274497
Esun_Ch_03 = 441.868715
d2 = 0.3

# Apply the formula to convert radiance to reflectance
ref = (radiance * np.pi * d2) / Esun_Ch_02

# Make sure all data is in the valid data range
ref = np.maximum(ref, 0.0)
ref = np.minimum(ref, 1.0)

# Apply the formula to adjust reflectance gamma
ref_gamma = np.sqrt(ref)


# Load Channel 1 - Blue Visible
g16nc = Dataset('../netCDF Test Files/OR_ABI-L1b-RadF-M6C01_G16_s20250412240206_e20250412249514_c20250412249551.nc', 'r')
radiance_1 = g16nc.variables['Rad'][:]
g16nc.close()
g16nc = None
ref_1 = (radiance_1 * np.pi * d2) / Esun_Ch_01
# Make sure all data is in the valid data range
ref_1 = np.maximum(ref_1, 0.0)
ref_1 = np.minimum(ref_1, 1.0)
ref_gamma_1 = np.sqrt(ref_1)


# Load Channel 3 - Veggie Near IR
g16nc = Dataset('../netCDF Test Files/OR_ABI-L1b-RadF-M6C03_G16_s20250412240206_e20250412249514_c20250412249561.nc', 'r')
radiance_3 = g16nc.variables['Rad'][:]
g16nc.close()
g16nc = None
ref_3 = (radiance_3 * np.pi * d2) / Esun_Ch_03
# Make sure all data is in the valid data range
ref_3 = np.maximum(ref_3, 0.0)
ref_3 = np.minimum(ref_3, 1.0)
ref_gamma_3 = np.sqrt(ref_3)

# Rebin function from https://stackoverflow.com/questions/8090229/resize-with-averaging-or-rebin-a-numpy-2d-array

ref_gamma_2 = rebin(ref_gamma, ref_gamma_3.shape)

ref_gamma_true_green = 0.48358168 * ref_gamma_2 + 0.45706946 * ref_gamma_1 + 0.06038137 * ref_gamma_3

truecolor = np.stack([ref_gamma_2, ref_gamma_true_green, ref_gamma_1], axis=2)
rgbImage = (truecolor*255).astype(np.uint8)

#print(truecolor)
img = Image.fromarray(rgbImage, mode="RGB")
img.show()

'''
fig = plt.figure(figsize=(6,6),dpi=200)
im = plt.imshow(truecolor)
plt.title('TrueColor - Red - Psuedo-Green - Blue')
plt.show()
'''