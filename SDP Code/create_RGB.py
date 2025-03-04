import numpy as np
from PIL import Image
import os

def GeoColor(chan1, chan2, chan3, path, num):
    true_green = 0.48358168 * chan2 + 0.45706946 * chan1 + 0.06038137 * chan3
    truecolor = np.stack([chan2, true_green, chan1], axis=2)

    rgbImage = truecolor.astype(np.uint8)

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB")
    #img.show()  
    img.save(os.path.join(path, "GeoColor", str(num) + ".jpg"))

def loadFiles(path):
    channel1_files = os.listdir(os.path.join(path, "01"))
    channel1_files.remove("latest.jpg")
    channel2_files = os.listdir(os.path.join(path, "02"))
    channel2_files.remove("latest.jpg")
    channel3_files = os.listdir(os.path.join(path, "03"))
    channel3_files.remove("latest.jpg")
    channel4_files = os.listdir(os.path.join(path, "04"))
    channel4_files.remove("latest.jpg")
    channel5_files = os.listdir(os.path.join(path, "05"))
    channel5_files.remove("latest.jpg")
    channel6_files = os.listdir(os.path.join(path, "06"))
    channel6_files.remove("latest.jpg")
    channel7_files = os.listdir(os.path.join(path, "07"))
    channel7_files.remove("latest.jpg")
    channel8_files = os.listdir(os.path.join(path, "08"))
    channel8_files.remove("latest.jpg")
    channel9_files = os.listdir(os.path.join(path, "09"))
    channel9_files.remove("latest.jpg")
    channel10_files = os.listdir(os.path.join(path, "10"))
    channel10_files.remove("latest.jpg")
    channel11_files = os.listdir(os.path.join(path, "11"))
    channel11_files.remove("latest.jpg")
    channel12_files = os.listdir(os.path.join(path, "12"))
    channel12_files.remove("latest.jpg")
    channel13_files = os.listdir(os.path.join(path, "13"))
    channel13_files.remove("latest.jpg")
    channel14_files = os.listdir(os.path.join(path, "14"))
    channel14_files.remove("latest.jpg")
    channel15_files = os.listdir(os.path.join(path, "15"))
    channel15_files.remove("latest.jpg")
    channel16_files = os.listdir(os.path.join(path, "16"))
    channel16_files.remove("latest.jpg")

    #channels = [channel1_files, channel2_files, channel3_files, channel4_files, channel5_files, channel6_files, channel7_files, channel8_files, channel9_files, channel10_files, channel11_files, channel12_files, channel13_files, channel14_files, channel15_files, channel16_files]

    for i in range(len(channel1_files)):
        chan1 = Image.open(os.path.join(path, "01", channel1_files[i]))
        chan2 = Image.open(os.path.join(path, "02", channel2_files[i]))
        chan3 = Image.open(os.path.join(path, "03", channel3_files[i]))
        chan1_array = np.array(chan1)
        chan2_array = np.array(chan2)
        chan3_array = np.array(chan3)

        GeoColor(chan1_array, chan2_array, chan3_array, path, i)


#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

path = "../Sample Images/Full Disk"
loadFiles(path)
'''
path = "../Sample Images/Conus"
loadFiles(path)

path = "../Sample Images/Meso"
loadFiles(path)
'''