# csvtojson.py
# Phillip Kersten
# Dataprocessing

# Define functions for later
def stripit(text):
	"""takes and returns a list with text without whitespaces"""
	striptext = []

	for x in text:
		striptext.append(x.strip())
	return striptext

def format(names, data):
	"""Takes an array of data points and a list with keys and formats to json"""
	result = '\n{\n'
	for i in range(0,numvar):
		result += '"'+str(names[i])+'":"'+str(data[i])+'"'
		if i != len(data) - 1:
			result += ',\n'
		else:
			result += '\n'
	result += '}'
	return result

# I wrote this function when using the dataset with precise dates,
# now its unecessary but useful for the future
def date(date):
	"""Converts to date"""
	if len(date) == 8:
		result = str(date[6:]+"."+date[4:6]+"."+date[0:4])
		return result
	return date

# This function prompts the user for filename, number of variables and their
# names if they are not given within the script
def prompt(filename, numvar, names):
	"""Prompts the user for filename number of variables and names of variables"""
	if not filename:
		filename = input("Please enter Filename of datasource: ")
	if not numvar:
		numvar = int(input("Enter number of variables: "))
	if not names:
		names = []
		count = 0
		while len(names) < numvar:
			count += 1
			names.append(input("Enter Variable name " + str(count) + " : "))
	return[filename, numvar, names]

# Initiate filename, number of variables and names of variables
# If they are empty then the user is prompted for them
filename = "test.txt"
numvar = ""
names = []
vars = prompt(filename, numvar, names)
filename = vars[0]
numvar = vars[1]
names = vars[2]

# Open file
infile = open(filename, "r")

# Initialize empty list for data
data = []

# Select only valid data and leave comments out
for line in infile.readlines():
    if line[0] != "#":
        data.append(stripit(line.split(sep= ",")))


# Close File again
infile.close()


# Open outfile
outfile = open("data.json","w")

# Write data to outfile
outfile.write("[")
for entry in range(0,len(data)):
	outfile.write(format(names,data[entry]))
	if entry != len(data)-1:
		outfile.write(",")
	else:
		outfile.write("\n]")
outfile.close()
