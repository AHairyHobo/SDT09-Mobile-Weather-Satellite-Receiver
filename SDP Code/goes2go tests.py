from goes2go import GOES
import os

fulldisk_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Full Disk"
conus_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Conus"
meso_path = "C:/Users/Sam/Documents/Senior Design Project/netCDF Unprocessed/Meso"

G = GOES(satellite=16, product="ABI-L1b-RadF")
G.timerange(recent='30min')

root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadF"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(fulldisk_path, filename)
            os.replace(old_path, new_path)
            
G = GOES(satellite=16, product="ABI-L1b-RadC")
G.timerange(recent='30min')

root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadC"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(conus_path, filename)
            os.replace(old_path, new_path)

G = GOES(satellite=16, product="ABI-L1b-RadM")
G.timerange(recent='30min')

root = "C:/Users/Sam/data/noaa-goes16/ABI-L1b-RadM"
for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_path = os.path.join(meso_path, filename)
            os.replace(old_path, new_path)