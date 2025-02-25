from goes2go import GOES
import os

#Absolute paths to where netCDF files should be moved before processing
fulldisk_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Full Disk"
conus_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Conus"
meso_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Meso"

#Download time range of full disk images
G = GOES(satellite=16, product="ABI-L1b-RadF")
G.timerange(recent='30min')
#Move files to new directory in project folder
root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadF"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(fulldisk_path, filename)
            os.replace(old_path, new_path)

#Download time range of Continental US images        
G = GOES(satellite=16, product="ABI-L1b-RadC")
G.timerange(recent='30min')
#Move to new directory in project folder
root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadC"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(conus_path, filename)
            os.replace(old_path, new_path)

#Download mesoscale images
G = GOES(satellite=16, product="ABI-L1b-RadM")
G.timerange(recent='30min')
#Move to new directory in project folder
root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadM"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(meso_path, filename)
            os.replace(old_path, new_path)