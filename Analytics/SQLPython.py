''' do the following installations
sudo apt-get install python-pip python-dev libmysqlclient-dev
pip install MySQL-python
sudo pip install boto
sudo pip install matplotlib
'''

#all output is in form of tuple !! its indexed so i think u can access it

import MySQLdb
import matplotlib.pyplot
import pylab
import matplotlib.pyplot as plt; plt.rcdefaults()
import matplotlib.pyplot as plt
import boto
import boto.s3
import sys
import os
from boto.s3.key import Key
#import sys
matplotlib.use('Agg')

#sys.stdout = open('output.txt', 'a')

db = MySQLdb.connect("seproject.clwivtvb39ox.us-east-2.rds.amazonaws.com","SEProject","seproject","SEProject")
cursor = db.cursor()

try:
	#To fetch data about the student
	sql = "Select Stud_ID from Student"
	cursor.execute(sql)
	studentID = cursor.fetchall()
	#print(type(studentID[1][1]),studentID)

	sql = "Select name from Student"
	cursor.execute(sql)
	studentName = cursor.fetchall()
	#print(type(studentName[1][1]),studentName)

	sql = "Select email from Student"
	cursor.execute(sql)
	studentEmail = cursor.fetchall()
	#print(type(studentEmail[1][1]),studentEmail)

	sql = "Select phone from Student"
	cursor.execute(sql)
	studentPhone = cursor.fetchall()
	#print(type(studentPhone[1][1]),studentPhone)

	sql = "Select dep_ID from Student"
	cursor.execute(sql)
	studentDepID = cursor.fetchall()
	#print(type(studentDepID[1][1]),studentDepID)

	sql = "Select Sem from Student"
	cursor.execute(sql)
	studentSem = cursor.fetchall()
	#print(type(studentSem[1][1]),studentSem)

	sql = "Select Section from Student"
	cursor.execute(sql)
	studentSection = cursor.fetchall()
	#print(type(studentSection[1][1]),studentSection)

	sql = "Select password from Student"
	cursor.execute(sql)
	studentPassword = cursor.fetchall()
	#print(type(studentPassword[1][1]),studentPassword)

	#Fetch the data about the answer submitted by the student
	sql = "Select Stud_ID from Student_Ans"
	cursor.execute(sql)
	Answer_StudentID = cursor.fetchall()
	#print(type(Answer_StudentID[1][1]),Answer_StudentID)

	sql = "Select Ques_ID from Student_Ans"
	cursor.execute(sql)
	Answer_QuesID = cursor.fetchall()
	#print(type(Answer_QuesID[1][1]),Answer_QuesID)

	sql = "Select submitted_ans from Student_Ans"
	cursor.execute(sql)
	Answer_SubmittedAns = cursor.fetchall()
	#print(type(Answer_SubmittedAns[1][1]),Answer_SubmittedAns)

	sql = "Select score from Student_Ans"
	cursor.execute(sql)
	Answer_StudentScore = cursor.fetchall()
	#print(type(Answer_StudentScore[1][1]),Answer_StudentScore)

	sql = "Select sub_ID from Student_Ans"
	cursor.execute(sql)
	Answer_SubjectID = cursor.fetchall()
	#print(type(Answer_SubjectID[1][1]),Answer_SubjectID)

	#Fetch the data about the teacher
	sql = "Select Teach_ID from Teacher"
	cursor.execute(sql)
	TeacherID = cursor.fetchall()
	#print(type(TeacherID[1][1]),TeacherID)

	sql = "Select name from Teacher"
	cursor.execute(sql)
	TeacherName = cursor.fetchall()
	#print(type(TeacherName[1][1]),TeacherName)

	sql = "Select email from Teacher"
	cursor.execute(sql)
	TeacherEmail = cursor.fetchall()
	#print(type(TeacherEmail[1][1]),TeacherEmail)


	sql = "Select phone from Teacher"
	cursor.execute(sql)
	TeacherPhone = cursor.fetchall()
	#print(type(TeacherPhone[1][1]),TeacherPhone)

	sql = "Select dep_ID from Teacher"
	cursor.execute(sql)
	TeacherDepID = cursor.fetchall()
	#print(type(TeacherDepID[1][1]),TeacherDepID)

	sql = "Select sub_ID from Teacher"
	cursor.execute(sql)
	TeacherSubID = cursor.fetchall()
	#print(type(TeacherSubID[1][1]),TeacherSubID)



except:
	print ("unable to connect")

db.close()

def preprocess(data):
	return [element[0] for element in data]

scores = Answer_StudentScore



scores = preprocess(scores)

plt.scatter(range(len(scores)), scores)
plt.title('Scatter Plot')
plt.xlabel('Students')
plt.ylabel('Score')
plt.savefig('scatter')
freq = dict()
plt.clf()

for i in scores:
	if i not in freq:
		freq[i] = 0
	freq[i] += 1
x = sorted(set(scores))

y = []
for i in x:
	y.append(freq[i])

import matplotlib.pyplot as plt1


plt.boxplot(scores)
plt.title('Box Plot')
plt.ylabel('Frequency')
plt.savefig('box')
plt.clf()

import matplotlib.pyplot as plt2

plt.bar(x,y)
plt.title('Bar Graph')
plt.ylabel('Frequency')
plt.savefig('bar')
plt.clf()

os.environ['S3_USE_SIGV4'] = 'True'
conn = boto.connect_s3('AKIAJSN7SL5NGLAOE3PA', 'DsDm+WVD/p2kOrC7uxVC/kqN9I8zEth6fX+IB+wY', host='s3.us-east-2.amazonaws.com')
buckets = conn.get_all_buckets()
b = conn.get_bucket(buckets[0])
k = Key(b)
k.key = 'scatter.png'
k.set_contents_from_filename('scatter.png')

k = Key(b)
k.key = 'box.png'
k.set_contents_from_filename('box.png')

k = Key(b)
k.key = 'bar.png'
k.set_contents_from_filename('bar.png')

# For Node.js
print('Done')
sys.stdout.flush()
