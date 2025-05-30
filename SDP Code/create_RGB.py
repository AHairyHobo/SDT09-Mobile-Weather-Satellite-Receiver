import numpy as np
from PIL import Image
import os

#reshapes arrays
def rebin(a, shape):
    sh = shape[0],a.shape[0]//shape[0],shape[1],a.shape[1]//shape[1]
    return a.reshape(sh).mean(-1).mean(1)

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
        
    truecolor = np.stack([0.7*(255-chan13), 0.8*(255-chan8), 255-chan10], axis=2) #stack 2d arrays to make 3d array

    rgbImage = truecolor.astype(np.uint8) #Make sure values are 8 bit ints

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB") #use pillow library to turn 3d array into image file
    #img.show()
    
    # Convert to numpy array
    img_np = np.array(img)

    if(fdbool):
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

#Combines channel2, 5, and 13 to create DayCloud Image
def DayCloud(chan2, chan5, chan13, path, file): #arguments IR channels, path to where images will be saved, and file name for new image
    if(chan2.shape != chan5.shape or chan2.shape != chan13.shape or chan5.shape != chan13.shape):
        shape = (min(chan2.shape[0],chan5.shape[0],chan13.shape[0]), min(chan2.shape[1],chan5.shape[1],chan13.shape[1]))
        chan2 = rebin(chan2, shape)
        chan5 = rebin(chan5, shape)
        chan13 = rebin(chan13, shape)
    
    truecolor = np.stack([255-chan13, chan2, 0.4*chan5], axis=2) #stack 2d arrays to make 3d array

    rgbImage = truecolor.astype(np.uint8) #Make sure values are 8 bit ints

    #print(truecolor)
    img = Image.fromarray(rgbImage, mode="RGB") #use pillow library to turn 3d array into image file
    #img.show()
    
    # Convert to numpy array
    img_np = np.array(img)

    if(fdbool):
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
    if "latest.jpg" in channel1_files: #remove the latest image as it is a copy
        channel1_files.remove("latest.jpg")
    channel2_files = os.listdir(os.path.join(path, "02"))
    if "latest.jpg" in channel2_files:
        channel2_files.remove("latest.jpg")
    channel3_files = os.listdir(os.path.join(path, "03"))
    if "latest.jpg" in channel3_files:
        channel3_files.remove("latest.jpg")
    channel4_files = os.listdir(os.path.join(path, "04"))
    if "latest.jpg" in channel4_files:
        channel4_files.remove("latest.jpg")
    channel5_files = os.listdir(os.path.join(path, "05"))
    if "latest.jpg" in channel5_files:
        channel5_files.remove("latest.jpg")
    channel6_files = os.listdir(os.path.join(path, "06"))
    if "latest.jpg" in channel6_files:
        channel6_files.remove("latest.jpg")
    channel7_files = os.listdir(os.path.join(path, "07"))
    if "latest.jpg" in channel7_files:
        channel7_files.remove("latest.jpg")
    channel8_files = os.listdir(os.path.join(path, "08"))
    if "latest.jpg" in channel8_files:
        channel8_files.remove("latest.jpg")
    channel9_files = os.listdir(os.path.join(path, "09"))
    if "latest.jpg" in channel9_files:
        channel9_files.remove("latest.jpg")
    channel10_files = os.listdir(os.path.join(path, "10"))
    if "latest.jpg" in channel10_files:
        channel10_files.remove("latest.jpg")
    channel11_files = os.listdir(os.path.join(path, "11"))
    if "latest.jpg" in channel11_files:
        channel11_files.remove("latest.jpg")
    channel12_files = os.listdir(os.path.join(path, "12"))
    if "latest.jpg" in channel12_files:
        channel12_files.remove("latest.jpg")
    channel13_files = os.listdir(os.path.join(path, "13"))
    if "latest.jpg" in channel13_files:
        channel13_files.remove("latest.jpg")
    channel14_files = os.listdir(os.path.join(path, "14"))
    if "latest.jpg" in channel14_files:
        channel14_files.remove("latest.jpg")
    channel15_files = os.listdir(os.path.join(path, "15"))
    if "latest.jpg" in channel15_files:
        channel15_files.remove("latest.jpg")
    channel16_files = os.listdir(os.path.join(path, "16"))
    if "latest.jpg" in channel16_files:
        channel16_files.remove("latest.jpg")

    numImages = min(len(channel1_files), len(channel2_files), len(channel3_files), len(channel5_files), len(channel8_files), len(channel10_files), len(channel13_files)) #make sure each channel has same amount of files, use the min amount

    #for the number of images in directory do the following
    for i in range(numImages):
        #load image for given channels directory into 2d array of bytes
        chan1 = Image.open(os.path.join(path, "01", channel1_files[i]))
        chan2 = Image.open(os.path.join(path, "02", channel2_files[i]))
        chan3 = Image.open(os.path.join(path, "03", channel3_files[i]))
        chan5 = Image.open(os.path.join(path, "05", channel5_files[i]))
        chan8 = Image.open(os.path.join(path, "08", channel8_files[i]))
        chan10 = Image.open(os.path.join(path, "10", channel10_files[i]))
        chan13 = Image.open(os.path.join(path, "13", channel13_files[i]))
        
        #convert array to np array
        chan1_array = np.array(chan1)
        chan2_array = np.array(chan2)
        chan3_array = np.array(chan3)
        chan5_array = np.array(chan5)
        chan8_array = np.array(chan8)
        chan10_array = np.array(chan10)
        chan13_array = np.array(chan13)

        #call each function to create rgb image given 2d arrays for each channel, path to sector directory, and a name for file
        GeoColor(chan1_array, chan2_array, chan3_array, path, channel1_files[i])
        SimpleWaterVapor(chan8_array, chan10_array, chan13_array, path, channel8_files[i])
        DayCloud(chan2_array, chan5_array, chan13_array, path, channel2_files[i])


#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

fdbool = True
path = "../Sample Images/Full Disk"
loadFiles(path)

fdbool = False
path = "../Sample Images/Conus"
loadFiles(path)

path = "../Sample Images/Meso/M1"
loadFiles(path)

path = "../Sample Images/Meso/M2"
loadFiles(path)
