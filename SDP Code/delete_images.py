import os

os.chdir("../Sample Images/Full Disk") #change directory to folder
for root, dirs, files in os.walk("."): #iterate through all files in folder
    for file in files:
        if file.endswith(".jpg"):
            os.remove(os.path.join(root, file))

os.chdir("../Conus") #change directory to folder
for root, dirs, files in os.walk("."): #iterate through all files in folder
    for file in files:
        if file.endswith(".jpg"):
            os.remove(os.path.join(root, file))

os.chdir("../Meso") #change directory to folder
for root, dirs, files in os.walk("."): #iterate through all files in folder
    for file in files:
        if file.endswith(".jpg"):
            os.remove(os.path.join(root, file))
        
