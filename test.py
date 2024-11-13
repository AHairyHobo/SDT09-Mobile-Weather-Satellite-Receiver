def readHeaders(in_file):
    #Reads Primary Header
    print("\nPrimary Header Record:")
    data = in_file.read(1) #header type, should be 0
    print("Header Type Code: %d" % int.from_bytes(data))
    data = in_file.read(2) #This headers size, should be 16
    print("Header Size: %d Bytes" % int.from_bytes(data))
    data = in_file.read(1) #file type code, determines top level structure of file data field
    print("File Type Code: %d" % int.from_bytes(data))
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
    dataSize = int.from_bytes(data) #variable to keep track of total data size
    print("Total Data Field Size: %d Bytes" % int.from_bytes(data))

    #Reads Remaining Optional Headers
    headerPointer = 16
    headerCounter = 2
    while headerPointer < headerSize:
        print("\nHeader Record #%d:" % headerCounter)
        data = in_file.read(1) #header type
        headType = int.from_bytes(data)
        print("Header Type Code: %d" % int.from_bytes(data))
        if headType == 0:
            print("Header Type: Primary Header")
        elif headType == 1:
            print("Header Type: Image Structure")
        elif headType == 2:
            print("Header Type: Image Navigation")
        elif headType == 3:
            print("Header Type: Image Data Function")
        elif headType == 4:
            print("Header Type: Annotation")
        elif headType == 5:
            print("Header Type: Time Stamp")
        elif headType == 6:
            print("Header Type: Ancillary text")
        elif headType == 7:
            print("Header Type: Key Header")
        elif headType >= 8 and headType <= 127:
            print("Header Type: Reserved for future global use")
        else:
            print("Header Type: For mission specific use")
        data = in_file.read(2) #This headers size, should be 16
        tempHeadSize = int.from_bytes(data)
        print("Header Size: %d Bytes" % tempHeadSize)
        data = in_file.read(tempHeadSize - 3) #This headers size, should be 16
        headerPointer += tempHeadSize
        headerCounter += 1
    return

#Temp code to clear console during development
import os
clear = lambda: os.system('cls')
clear()

in_file = open("../GOES Files HRIT/VC2_20180223175001_39326_OR_ABI-L2-CMIPF-M3C02_G16_s20180541730394_e20180541741161_c20180541741231.lrit","rb")
readHeaders(in_file)
in_file.close()
