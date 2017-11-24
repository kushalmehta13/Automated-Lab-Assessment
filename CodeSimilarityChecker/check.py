import os
import boto3
import botocore
import sys
'''
HOW TO RUN THIS SCRIPT
-----------------------
python check.py path/to/student/code path/to/solution/code path/to/result/file


WHAT THIS DOES
-------------

Downloads the two files temporarily to the EC2 instance and does a similarity match between
the student code and the solution code using MOSS

RETURNS THE NUMBER OF LINES MATCHED BETWEEN THE TWO FILES
'''
s3 = boto3.resource('s3')
BUCKET_NAME = "sourcecodestore"
STUDENT_FILE = sys.argv[1]
SOLUTION_FILE = sys.argv[2]
RESULT_FILE = sys.argv[3]
local_student_file = "tmp_student.cpp"
local_solution_file = "tmp_solution.cpp"
try:
    print "Working"
    sys.stdout.flush()
    s3.Bucket(BUCKET_NAME).download_file(STUDENT_FILE,local_student_file)
    s3.Bucket(BUCKET_NAME).download_file(SOLUTION_FILE,local_solution_file)
except botocore.exceptions.ClientError as e:
    if e.response['Error']['Code'] == '404':
        print("The object does not exist")
    else:
        raise


res1 = os.system("./CodeSimilarityChecker/moss -l c "+local_student_file+" "+local_solution_file + "> serverResp.txt")
f = open("serverResp.txt",'r')
line = str(f.readlines()[-1])
os.system("python ./CodeSimilarityChecker/scraper.py "+line.strip() +"> tmp_res.txt")
try:
    s3.meta.client.upload_file('tmp_res.txt', BUCKET_NAME, RESULT_FILE)
except botocore.exceptions.ClientError as e:
    if e.response['Error']['Code'] == '404':
        print("The object does not exist")
    else:
        raise
os.remove(local_student_file)
os.remove(local_solution_file)
os.remove("tmp_res.txt")
os.remove("serverResp.txt")
