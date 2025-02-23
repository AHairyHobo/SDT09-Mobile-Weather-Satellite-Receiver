from netCDF4 import Dataset
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import os

finalImageShape = (1356, 1356)
#reshape the array of data by finding the average of the values
def rebin(a, shape):
    sh = shape[0],a.shape[0]//shape[0],shape[1],a.shape[1]//shape[1]
    return a.reshape(sh).mean(-1).mean(1)

#Load in netCDF File, read radiance values, convert to reflectance, save as image
def loadFile(filename):
    #Open netCDF file and load relevant values to variables
    g16nc = Dataset(filename, 'r')
    radiance = g16nc.variables['Rad'][:] #Load 2d array of radiance values
    radiance = rebin(radiance, finalImageShape) #reshape to smaller data array
    print(g16nc.variables.keys())
    ir_band = g16nc.variables['band_id'][:][0] #load id of this ir band

    #If its IR band 1-6, convert radiance to reflectance
    if ir_band <= 6:
        esun = g16nc.variables['esun'][:] #load esun value for this channel
        d = g16nc.variables['earth_sun_distance_anomaly_in_AU'][:] #load earth sun distance ratio

        #Converting to reflectance
        reflectance  = (radiance * np.pi * (d**2)) / esun #convert from radiance to reflectance

        # Make sure all data is in the valid data range
        reflectance = np.maximum(reflectance, 0.0)
        reflectance = np.minimum(reflectance, 1.0)

        # Apply the formula to adjust reflectance gamma
        ref_gamma = np.sqrt(reflectance)

    #If its IR band 7-16, convert radiance to temperature kelvin
    else:
        #load planck function constants
        fk1 = g16nc.variables['planck_fk1'][:]
        fk2 = g16nc.variables['planck_fk2'][:]
        bc1 = g16nc.variables['planck_bc1'][:]
        bc2 = g16nc.variables['planck_bc2'][:]

    #save image
    greyscale_img = (ref_gamma*255).astype(np.uint8) #scale float to 8 bit int
    img = Image.fromarray(greyscale_img, mode="L")
    img.show()
    img.save("../Sample Images/" + filename[:-3] + ".jpg")
    

    #close file
    g16nc.close()
    g16nc = None



path = "../netCDF Unprocessed/" #path to folder of unprocessed netcdf files
os.chdir(path) #change directory to folder
#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

filename = "OR_ABI-L1b-RadF-M6C07_G16_s20250412230206_e20250412239525_c20250412239571.nc"
loadFile(filename)
