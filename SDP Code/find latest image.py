import datetime
import os

def julian2std(jdate):
    fmt = '%Y%j%H%M%S%f'
    datestd = datetime.datetime.strptime(jdate, fmt).date()
    return(datestd)

'''
filename = "OR_ABI-L1b-RadF-M6C01_G16_s20250542250205_e20250542259513_c20250542259542.nc"
julian_start = filename[27:41] + "00000"
julian_end = filename[43:57] + "00000"
julian_create = filename[59:73] + "00000"

std_start = julian2std(julian_start)
print(std_start)
'''

#Move all files into correct subfolders
path = "../Sample Images/Full Disk" #path to folder of images
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".jpg"):
        filename = f"{file}"
        #print(filename)
        new_path = os.path.join(filename[19:21], filename)
        os.replace(filename, new_path)

path = "../Conus" #path to folder of images
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".jpg"):
        filename = f"{file}"
        #print(filename)
        new_path = os.path.join(filename[19:21], filename)
        os.replace(filename, new_path)

path = "../Meso" #path to folder of images
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".jpg"):
        filename = f"{file}"
        #print(filename)
        new_path = os.path.join(filename[14:16], filename[20:22], filename)
        os.replace(filename, new_path)


#Find latest
path = ".."
for dirpath, dirname, filenames in os.walk(path):
    if not dirname:
        
        for file in os.listdir(dirpath):
            