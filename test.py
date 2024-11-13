def readHeaders(in_file):
    #reads first header
    print("\nPrimary Header Record:")
    data = in_file.read(1) #header type, should be 0
    print("Header Type: %d" % int.from_bytes(data))
    data = in_file.read(2) #header size, should be 16
    print("Header Size: %d" % int.from_bytes(data))
    data = in_file.read(1) #file type code, determines top level structure of file data field
    print("File Type Code: %d  " % int.from_bytes(data))
    dataInt = int.from_bytes(data)
    if dataInt == 0:
        print("File Type: Image Data File")
    elif dataInt == 1:
        print("File Type: GTS Message")
    elif dataInt == 2:
        print("File Type: Alphanumeric Text File")
    elif dataInt == 3:
        print("File Type: Encryption Key Message")
    elif dataInt >= 4 and dataInt <= 127:
        print("File Type: Reserved for future global use")
    else:
        print("File Type: For mission specific use")
            
    return

in_file = open("../GOES Files HRIT/VC2_20180223175001_39326_OR_ABI-L2-CMIPF-M3C02_G16_s20180541730394_e20180541741161_c20180541741231.lrit","rb")
readHeaders(in_file)
in_file.close()
