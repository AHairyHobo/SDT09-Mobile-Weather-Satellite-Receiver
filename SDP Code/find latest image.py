import datetime
import os
import shutil

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
#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

#Find latest
path = "../Sample Images"
for dirpath, dirname, filenames in os.walk(path):
    if not dirname:
        latest_time = 0
        for file in os.listdir(dirpath):
            if file != "latest.jpg":
                if dirpath[17:21] == "Meso":
                    start_time = file[28:42]
                else:
                    start_time = file[27:41]
                if int(start_time) > int(latest_time):
                    latest_time = start_time
        old_name = os.path.join(dirpath, file)
        new_name = os.path.join(dirpath, "latest.jpg")
        shutil.copy(old_name, new_name)
