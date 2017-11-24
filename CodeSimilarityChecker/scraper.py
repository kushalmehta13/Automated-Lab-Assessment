import urllib2
import sys
from bs4 import BeautifulSoup
#get URL from the terminal somehow
result_page = str(sys.argv)[0]
#for testing purposes, using a static url
page = urllib2.urlopen(result_page)
soup = BeautifulSoup(page, 'html.parser')
if soup.find('td') == None:
    print "Similarity is 0"
    sys.exit()
td1 = soup.find('td')
text = td1.text.strip().split('\n')
file1 = str(text[0].split(' ')[0])
perc1 = str(text[0].split(' ')[1])
file2 = str(text[1].split(' ')[0])
perc2 = str(text[1].split(' ')[1])
linesCount = text[2]
print file1,perc1
print file2,perc2
print "Number of lines that match are:",linesCount
