from netCDF4 import Dataset
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

g16nc = Dataset('../netCDF Test Files/OR_ABI-L1b-RadF-M6C01_G16_s20250412230206_e20250412239514_c20250412239559.nc', 'r')
radiance = g16nc.variables['Rad'][:]
g16nc.close()
g16nc = None

'''
fig = plt.figure(figsize=(6,6),dpi=200)
im = plt.imshow(radiance, cmap='Greys_r')
cb = fig.colorbar(im, orientation='horizontal')
cb.set_ticks([1, 100, 200, 300, 400, 500, 600])
cb.set_label('Radiance (W m-2 sr-1 um-1)')
plt.show()
'''
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

# Plot gamma adjusted reflectance
fig = plt.figure(figsize=(6,6),dpi=200)
im = plt.imshow(ref_gamma, vmin=0.0, vmax=1.0, cmap='Greys_r')
cb = fig.colorbar(im, orientation='horizontal')
cb.set_ticks([0, 0.2, 0.4, 0.6, 0.8, 1.0])
cb.set_label('Reflectance')
plt.show()
