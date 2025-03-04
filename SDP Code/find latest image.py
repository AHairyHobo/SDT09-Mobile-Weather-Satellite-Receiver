import datetime
import os
import shutil

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
        if os.listdir(dirpath): #checks if directory is empty, only runs if it contains files
            old_name = os.path.join(dirpath, file)
            new_name = os.path.join(dirpath, "latest.jpg")
            shutil.copy(old_name, new_name)
