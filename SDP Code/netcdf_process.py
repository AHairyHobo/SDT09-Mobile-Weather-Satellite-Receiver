from netCDF4 import Dataset
import numpy as np
from PIL import Image
import os

#reshape the array of data by finding the average of the values
def rebin(a):
    if (a.shape[0] % 10848 == 0) and (a.shape[1] % 10848 == 0):
        shape = (1356, 1356)
    elif (a.shape[0] % 750 == 0) and (a.shape[1] % 1250 == 0):
        shape = (750, 1250)
    elif (a.shape[0] % 1000 == 0) and (a.shape[1] % 1000 == 0):
        shape = (1000, 1000)
    elif (a.shape[0] % 500 == 0) and (a.shape[1] % 500 == 0):
        shape = (500, 500)
    else:
        print("Unhandled image dimensions")
        print(a.shape[0])
        print(a.shape[1])
        exit()
    sh = shape[0],a.shape[0]//shape[0],shape[1],a.shape[1]//shape[1]
    return a.reshape(sh).mean(-1).mean(1)

def scaleVals(min, max, arr):
    # Avoid division by zero if min and max values are the same
    if max == min:
      return np.zeros_like(arr, dtype=np.uint8)

    scaled_arr = (arr - min) / (max - min) * 255
    return scaled_arr.astype(np.uint8)

#Load in netCDF File, read radiance values, convert to reflectance, save as image
def loadFile(filename, dest):
    #Open netCDF file and load relevant values to variables
    g16nc = Dataset(filename, 'r')
    radiance = g16nc.variables['Rad'][:] #Load 2d array of radiance values
    radiance = rebin(radiance) #reshape to smaller data array
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

        # Apply the formula to adjust reflectance gamma and scale it
        reflectance = np.sqrt(reflectance)
        greyscale_img = (reflectance*255).astype(np.uint8) #scale float to 8 bit int

    #If its IR band 7-16, convert radiance to temperature kelvin
    else:
        #load min/max values
        min = g16nc.variables['min_radiance_value_of_valid_pixels'][:]
        max = g16nc.variables['max_radiance_value_of_valid_pixels'][:]

        greyscale_img = scaleVals(min, max, radiance)

    #save image
    img = Image.fromarray(greyscale_img, mode="L")
    #img.show()
    img.save(dest + filename[:-3] + ".jpg")
    

    #close file
    g16nc.close()
    g16nc = None


#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

path = "../netCDF Unprocessed/Full Disk" #path to folder of unprocessed netcdf files
dest = "../../Sample Images/Full Disk/" #Path to destination for saved image
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".nc"):
        filename = f"{file}"
        #print(filename)
        loadFile(filename, dest)
        new_path = os.path.join("../../netCDF Processed/Full Disk", filename)
        os.replace(filename, new_path)

path = "../Conus" #path to folder of unprocessed netcdf files
dest = "../../Sample Images/Conus/" #Path to destination for saved image
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".nc"):
        filename = f"{file}"
        #print(filename)
        loadFile(filename, dest)
        new_path = os.path.join("../../netCDF Processed/Conus", filename)
        os.replace(filename, new_path)

path = "../Meso" #path to folder of unprocessed netcdf files
dest = "../../Sample Images/Meso/" #Path to destination for saved image
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".nc"):
        filename = f"{file}"
        #print(filename)
        loadFile(filename, dest)
        new_path = os.path.join("../../netCDF Processed/Meso", filename)
        os.replace(filename, new_path)
