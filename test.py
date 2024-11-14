from datetime import datetime, timedelta
from PIL import Image
import os

def ccsds_to_datetime(ccsds_epoch):
    """
    Convert a CCSDS epoch (seconds since 1958-01-01T00:00:00 TAI) to a Python datetime object.
    """
    ccsds_epoch_start = datetime(1958, 1, 1)
    return ccsds_epoch_start + timedelta(seconds=ccsds_epoch)

def readImageData(imageBytes,width,height,bitDepth,imgName):
    if bitDepth == 8:
        img = Image.frombytes('L',(width,height), imageBytes)
        #img.show()
        img.save("../GOES Files Decoded/" + imgName[:-5] + ".jpg")
    else:
        print("TODO FIX BIT DEPTH != 8")

def readLRIT(in_file):
    #Reads Primary Header
    print("\nPrimary Header Record:")
    data = in_file.read(1) #header type, should be 0
    print("Header Type Code: %d" % int.from_bytes(data))
    data = in_file.read(2) #This headers size, should be 16
    print("Header Size: %d Bytes" % int.from_bytes(data))
    data = in_file.read(1) #file type code, determines top level structure of file data field
    fileType = int.from_bytes(data)
    print("File Type Code: %d" % fileType)
    dataType = int.from_bytes(data)
    if dataType == 0:
        print("File Type: Image Data File")
    elif dataType == 1:
        print("File Type: GTS Message")
    elif dataType == 2:
        print("File Type: Alphanumeric Text File")
    elif dataType == 3:
        print("File Type: Encryption Key Message")
    elif dataType >= 4 and dataType <= 127:
        print("File Type: Reserved for future global use")
    else:
        print("File Type: For mission specific use")
    data = in_file.read(4) #Total size of all headers in bytes
    headerSize = int.from_bytes(data) #variable to keep track of total header size
    print("Total Header Size: %d Bytes" % int.from_bytes(data))
    data = in_file.read(8) #Total size of data field
    dataSize = int(int.from_bytes(data) / 8) #variable to keep track of total data size, given in bits converted to bytes
    print("Total Data Field Size: %d Bytes" % dataSize)

    #Reads Remaining Optional Headers
    headerPointer = 16
    headerCounter = 2
    while headerPointer < headerSize:
        print("\nHeader Record #%d:" % headerCounter)
        data = in_file.read(1) #header type
        headType = int.from_bytes(data)
        print("Header Type Code: %d" % int.from_bytes(data))
        if headType == 0:
            print("Header Type: Primary Header") #If you end up here something is wrong...
        elif headType == 1:
            print("Header Type: Image Structure")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(1) #num bits per pixel 1-255
            numBits = int.from_bytes(data)
            print("Number of Bits Per Pixel: %d" % numBits)
            data = in_file.read(2) #num columns 1 - 65535
            numCols = int.from_bytes(data)
            print("Number of Columns: %d" % numCols)
            data = in_file.read(2) #num lines 1 - 65535
            numRows = int.from_bytes(data)
            print("Number of Lines: %d" % numRows)
            data = in_file.read(1) #compression flag (0,1,2)
            print("Compression Flag: %d" % int.from_bytes(data))
        elif headType == 2:
            print("Header Type: Image Navigation")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(32) #projection name
            print("Projection Name: %s" % data.decode("ASCII"))
            data = in_file.read(4) #column scaling factor
            print("Column Scaling Factor: %d" % int.from_bytes(data))
            data = in_file.read(4) #line scaling factor
            print("Line Scaling Factor: %d" % int.from_bytes(data))
            data = in_file.read(4) #column offset
            print("Column Offset: %d" % int.from_bytes(data))
            data = in_file.read(4) #line offset
            print("Line Offset: %d" % int.from_bytes(data))
        elif headType == 3:
            print("Header Type: Image Data Function")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #data definition block
            print("Data Definition Block: %s" % data.decode("ASCII"))
        elif headType == 4:
            print("Header Type: Annotation")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #annotation text
            imgName = data.decode("ASCII")
            print("Annotation Text: %s" % imgName)
        elif headType == 5:
            print("Header Type: Time Stamp")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(1)
            binRep = bin(int.from_bytes(data))[2:].zfill(8) #mess of code to convert byte object into string of 8 bits
            print("CCSDS time format fields:")
            print("  P-Field:")
            print("  Extention Flag: %s" % binRep[0]) #extention flag bit
            print("  Time Code Identification: %s" % binRep[1:4]) #time code identification bits, 100 is CCSDS DAY SEGMENTED TIME CODE(CDS)
            print("  Epoch Identification: %s" % binRep[4]) #epoch identification, 0 - 1958 January 1 epoch, 1 - Agency defined epoch
            print("  Length of Day Segment: %s" % binRep[5]) #0 - 16-bit segment, 1 - 24 bit segment
            print("  Length of Submillisecond Segment: %s" % binRep[6:]) #00 - no submillisecond segment, 01 - 16 bit, 10 - 32 bit, 11 - reserved for future use
            if binRep[1:4] != '100' or binRep[4] != '0' or binRep[5] != '0' or binRep[6:] != '00':
                print("MODIFY CODE FOR TIME FORMAT INTERPRETATION")
            print("  T-Field:")
            data = in_file.read(2)
            ccsdsDays = int.from_bytes(data)
            print("  Days since 1958 Jan 1: %d days" % ccsdsDays)
            data = in_file.read(4)
            ccsdsMilliseconds = int.from_bytes(data)
            print("  Milliseconds of current day: %d ms" % ccsdsMilliseconds)
            ccsds_epoch = (ccsdsDays * 86400) + (ccsdsMilliseconds / 1000) #This code to convert ccsds time to a date is slightly off from date given in file name, maybe fix later
            datetime_obj = ccsds_to_datetime(ccsds_epoch)
            print("  %s" % datetime_obj)
        elif headType == 6:
            print("Header Type: Ancillary text")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #ancillary text
            print("Ancillary Text: %s" % data.decode("ASCII"))
        elif headType == 7:
            print("Header Type: Key Header")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #key header info
            print("Key Header Information (mission specific): %s" % data.decode("ASCII"))
        elif headType >= 8 and headType <= 127:
            print("Header Type: Reserved for future global use")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #Reads remaining header info
        else:
            print("Header Type: For mission specific use")
            data = in_file.read(2) #This headers size
            tempHeadSize = int.from_bytes(data)
            print("Header Size: %d Bytes" % tempHeadSize)
            data = in_file.read(tempHeadSize - 3) #Reads remaining header info
        headerPointer += tempHeadSize
        headerCounter += 1
    
    #Reading data field depending on file type
    if fileType == 0:
        data = in_file.read(dataSize) #reads entire data field
        readImageData(data,numCols,numRows,numBits,imgName)
    

#Temp code to clear console during development
clear = lambda: os.system('cls')
clear()

path = "../GOES Files HRIT/" #path to folder of HRIT files
os.chdir(path) #change directory to folder
for file in os.listdir(): #iterate through all files in folder
    if file.endswith(".lrit"):
        file_path = f"{path}\{file}"
        in_file = open(file_path,"rb")
        readLRIT(in_file)
        in_file.close()
