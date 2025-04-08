import numpy as np
from PIL import Image
import os

#Combines channel 1, 2, and 3 to create GeoColor Image
def GeoColor(chan1, chan2, chan3, path, file): #arguments IR channels, path to where images will be saved, and file name for new image
    true_green = 0.48358168 * chan2 + 0.45706946 * chan1 + 0.06038137 * chan3 #Combine channels to create a more realistic green color
    truecolor = np.stack([chan2, true_green, chan1], axis=2) #stack 2d arrays to make 3d array

    rgbImage = truecolor.astype(np.uint8) #Make sure values are 8 bit ints

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB") #use pillow library to turn 3d array into image file
    #img.show()  
    img.save(os.path.join(path, "GeoColor", file)) #save image at the given path with the given name

#Combines channel 8, 10, and 13 to create SimpleWaterVapor Image
def SimpleWaterVapor(chan8, chan10, chan13, path, file): #arguments IR channels, path to where images will be saved, and file name for new image

    #print(chan13[13])

    #for i in chan13:
        #for j in i:
            #print(i[j])
            #if i[j] == 0:
                #i[j] = 255
    
    truecolor = np.stack([0.7*(255-chan13), 0.8*(255-chan8), 255-chan10], axis=2) #stack 2d arrays to make 3d array

    rgbImage = truecolor.astype(np.uint8) #Make sure values are 8 bit ints

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB") #use pillow library to turn 3d array into image file
    #img.show()
    
    # Convert to numpy array
    img_np = np.array(img)

    # Get image dimensions and compute center
    height, width = img_np.shape[:2]
    center_x, center_y = width // 2, height // 2

    # Set radius (in pixels)
    radius = min(center_x, center_y) * 1  # example: half of the smallest image dimension

    # Create mask based on radius
    Y, X = np.ogrid[:height, :width]
    dist_from_center = np.sqrt((X - center_x)**2 + (Y - center_y)**2)
    mask = dist_from_center <= radius

    # Apply mask (set pixels outside radius to zero)
    img_np[~mask] = 0

    # Convert back to PIL image
    img = Image.fromarray(img_np, mode="RGB")
    
    img.save(os.path.join(path, "SimpleWaterVapor", file)) #save image at the given path with the given name

#Combines channel 2, 5, and 13 to create DayCloud Image
def DayCloud(chan2, chan5, chan13, path, file): #arguments IR channels, path to where images will be saved, and file name for new image

    #print(chan13[13])

    #for i in chan13:
        #for j in i:
            #print(i[j])
            #if i[j] == 0:
                #i[j] = 255
    
    truecolor = np.stack([255-chan13, chan2, 0.4*chan5], axis=2) #stack 2d arrays to make 3d array

    rgbImage = truecolor.astype(np.uint8) #Make sure values are 8 bit ints

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB") #use pillow library to turn 3d array into image file
    #img.show()
    
    # Convert to numpy array
    img_np = np.array(img)

    # Get image dimensions and compute center
    height, width = img_np.shape[:2]
    center_x, center_y = width // 2, height // 2

    # Set radius (in pixels)
    radius = min(center_x, center_y) * 1  # example: half of the smallest image dimension

    # Create mask based on radius
    Y, X = np.ogrid[:height, :width]
    dist_from_center = np.sqrt((X - center_x)**2 + (Y - center_y)**2)
    mask = dist_from_center <= radius

    # Apply mask (set pixels outside radius to zero)
    img_np[~mask] = 0

    # Convert back to PIL image
    img = Image.fromarray(img_np, mode="RGB")
    img.save(os.path.join(path, "DayCloud", file)) #save image at the given path with the given name


def loadFiles(path):
    channel1_files = os.listdir(os.path.join(path, "01")) #returns array containing strings of every file within directory
    channel1_files.remove("latest.jpg") #remove the latest image as it is a copy
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

    numImages = min(len(channel1_files), len(channel2_files), len(channel3_files)) #make sure each channel has same amount of files, use the min amount

    for i in range(numImages):
        chan1 = Image.open(os.path.join(path, "01", channel1_files[i]))
        chan2 = Image.open(os.path.join(path, "02", channel2_files[i]))
        chan3 = Image.open(os.path.join(path, "03", channel3_files[i]))
        chan1_array = np.array(chan1)
        chan2_array = np.array(chan2)
        chan3_array = np.array(chan3)

        GeoColor(chan1_array, chan2_array, chan3_array, path, channel1_files[i])


#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

path = "../Sample Images/Full Disk"
loadFiles(path)

path = "../Sample Images/Conus"
loadFiles(path)

path = "../Sample Images/Meso/M1"
loadFiles(path)

path = "../Sample Images/Meso/M2"
loadFiles(path)
