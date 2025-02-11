from goes2go import GOES

G = GOES(satellite=16, product="ABI-L1b-RadF")
G.timerange(recent='30min')