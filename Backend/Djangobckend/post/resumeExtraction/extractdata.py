import re
import openai
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from Djangobckend import settings
#Gemini Response Section

# You have to get the free gemini api for it, it can have 2 requestes in 1 minute
# api = settings.GEMINI_API_KEY    
api = "AIzaSyAXOFC8l3Pm1gU7BDM5TT5LDZatcw7Fjl8"
genai.configure(api_key=api)



def get_gemini_response(input,img):
    model=genai.GenerativeModel('gemini-pro-vision')
    response=model.generate_content([input,img])
    return response

# Function to load image from URL
def load_image_from_url(image_url):
    try:
        # Fetch the image from the URL
        response = requests.get(image_url)
        # Check if the request was successful
        if response.status_code == 200:
            # Read the image data from the response content
            image_data = BytesIO(response.content)
            # Open the image using PIL
            img = Image.open(image_data)
            return img
        else:
            print("Failed to fetch image from URL. Status code:", response.status_code)
            HttpResponse("Failed to fecth Image")
            return None
    except Exception as e:
        print("An error occurred:", e)
        return None
    
    # img = Image.open(image_url)
    # return img

def load_response(image_url,input_prompt):
    # Load the image from the URL
    img = load_image_from_url(image_url)
    if img is None:
        print("Image is None")
    else:
        print("Image loaded successfully")
    # img = Image.open("../googlegemini/sharanya.jpg")
    response = get_gemini_response(input_prompt, img).text
    return response

#Section Division

# regex wala code for section
# Section header mapping with regex patterns
header_mapping = {
    r"\b(edu|education)\b": 'Education',
    r"\b(proj|projects?)\b": 'Projects',
    r"\b(achieve|achievements?)\b": 'Achievements',
    r"\b(curricular)\b": 'Curricular',
    # r"\b(tech( nical)? skills?)\b": 'Skills',
    r"\b(skills?)\b": 'Skills',
    r"\b(cert(ifications?)?)\b": 'Certifications',
    r"\b(training|experience|internship)\b": 'Training/Experience/Internship',
}

# Create a regex pattern to match any section header
section_regex = "|".join(header_mapping.keys())

# Function to get the standard section name from a regex match
def get_section_name(match):
    for pattern, name in header_mapping.items():
        if re.search(pattern, match.group(0), re.IGNORECASE):
            return name
    return None

# Function to extract sections from the given text
def extract_sections(response):
    sections = {}
    lines = response.splitlines()
    sect_text = ""
    current_sect = None
    
    for line in lines:
        # Check if this line indicates a new section header
        if "**" in line:
            sect_match = re.search(section_regex, line, re.IGNORECASE)
            if sect_match:
                # If there's an ongoing section, save its content
                if current_sect:
                    sections[current_sect] = sect_text.strip()
                # Get the standard section name
                current_sect = get_section_name(sect_match)
                sect_text = line + "\n"  # Reset section text
                continue  # Move to the next line
            
        # If it's not a section header, add to the current section
        if current_sect:
            sect_text += line + "\n"
    
    # Store the last section
    if current_sect and sect_text:
        sections[current_sect] = sect_text.strip()

    # for key, value in sections.items():
    #     print(f"{key}:\n{value}\n")

    return sections

# Function to extract education details
def extract_education(text):
    # Dictionary to hold education details
    education_info = {
        "Degree": None,
        "Branch": None,
        "CGPA/SGPA/GPA": None
    }

    branch_mapping = {
        r"\b(comp|computer)\b": "Computer Engineering",
        r"\b(mech|mechanical)\b": "Mechanical Engineering",
        r"\b(e&tc|electronics & telecommunication)\b": "Electronics & Telecommunication",
        r"\b(civil|civ)\b": "Civil Engineering",
        r"\b(chem|chemical)\b": "Chemical Engineering",
        r"\b(ai|artificial intelligence)\b": "Artificial Intelligence",
        r"\b(bio|biotechnology)\b": "Biotechnology",
        # Add more branches and their abbreviations as needed
    }
    
    # Regular expression pattern to match any known branch abbreviation or full form
    branch_regex = "|".join(branch_mapping.keys())

    # Regular expression to extract degree and branch
    degree_regex = r"(B\.E|B\.Tech|B\.Sc|M\.E|M\.Tech|M\.Sc|Ph\.D|M\.S|MBA|BA|BBA|BCA|MCA)\s*(?:\((.*?)\))?"

    # Regular expression to extract CGPA/SGPA
    cgpa_sgpa_regex = r"CGPA[: -]*(\d+\.?\d*)|SGPA[: -]*(\d+\.?\d*)|GPA[: -]*(\d+\.?\d*)"

    # Find degree and branch
    degree_match = re.search(degree_regex, text, re.IGNORECASE)
    if degree_match:
        education_info["Degree"] = degree_match.group(1) or degree_match.group(2)
        
    # Find CGPA/SGPA
    cgpa_sgpa_match = re.search(cgpa_sgpa_regex, text, re.IGNORECASE)
    if cgpa_sgpa_match:
        education_info["CGPA/SGPA/GPA"] = cgpa_sgpa_match.group(1) or cgpa_sgpa_match.group(2)

    branch_match = re.search(branch_regex, text, re.IGNORECASE)
    if branch_match:
        education_info["Branch"] = branch_match.group(1) or branch_match.group(2)
    
    return education_info

def load_education(sections):
    # Extract education details
    # education_details = extract_education(sections['Education'])
    if sections['Education']:
        education_details = extract_education(sections['Education'])
    else:
        education_details = extract_education("")

    # Display the extracted information
    # print("Extracted Education Details:")
    # for key, value in education_details.items():
    #     print(f"{key}: {value}")

    return education_details

#Skill Count
def skill_count(sections):
    # List of keywords
    keywords = [
        'Python', 'Java', 'C/C\+\+', 'JavaScript', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'C#', 'Go', 'Rust',
        'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Bootstrap',
        'Android Development', 'iOS Development', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Xamarin',
        'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase',
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Subversion \\(SVN\\)',
        'Visual Studio Code', 'IntelliJ IDEA', 'PyCharm', 'Eclipse', 'Android Studio', 'Xcode',
        'Agile Development', 'Scrum', 'Kanban', 'Test-Driven Development \\(TDD\\)', 'Continuous Integration/Continuous Deployment \\(CI/CD\\)',
        'Flask', 'Django', 'Spring Boot', '\\.NET Core', 'React\\.js', 'Vue\\.js', 'Angular', 'TensorFlow', 'PyTorch',
        'Windows', 'macOS', 'Linux/Unix','C','C\+\+',
        'Jira', 'Trello', 'Asana', 'Microsoft Project','Elinlist\(Auth0\)', 'QuillEditor', 'Google Analytics',
        'Unit Testing', 'Integration Testing', 'Regression Testing', 'Selenium', 'Jest', 'JUnit',
        'Problem Solving', 'Algorithm Design', 'Data Structures', 'Object-Oriented Programming \\(OOP\\)', 'Functional Programming','web'
        'DSA', 'Digital Marketing', 'Redux', 'React Leaflet',' NodeJS', 'ExpressJS','JavaFX','ReactJS', 'Redux', 'NodeJS', 'Svelte', 'Go', 'TensorFlow', 'Deep Learning, Perl', 'Blockchain', 
        'MATLAB', 'Ansible'
    ]

    # Create the regex pattern directly
    skills_regex = r'\b(' + '|'.join(keywords) + r')\b'

    skill_text = ""
    if "Skills" in sections:
        skill_text = sections['Skills']
        
    if "Projects" in sections:
        skill_text = skill_text + sections['Projects']

    if 'Training/Experience/Internship' in sections:
        skill_text = skill_text + sections['Training/Experience/Internship']

    # Search for keywords in this user_input_text
    matches = set()

    for match in re.finditer(skills_regex, skill_text, re.IGNORECASE):
        matches.add(match.group())

    # Assign values to the skills based on their categories
    grade_a_skills = ['Python', 'Java', 'JavaScript', 'React', 'SQL', 'Git', 'Agile Development', 'HTML', 'CSS', 'Android Development','Web '
        'iOS Development', 'Flask', 'Django', 'Spring Boot', 'Windows', 'macOS', 'Linux/Unix','Unit Testing', 'C\+\+','C',
        'Integration Testing', 'Problem Solving', 'Algorithm Design', 'Data Structures', 'Object-Oriented Programming (OOP)',' NodeJS', 'ExpressJS'
        'Functional Programming', 'DSA','Elinlist\(Auth0\)', 'QuillEditor', 'Google Analytics','ReactJS', 'Redux', 'NodeJS','Svelte', 'Go', 'TensorFlow', 'Deep Learning, Perl', 'Blockchain', 
        'MATLAB', 'Ansible']

    grade_b_skills = ['Swift', 'Kotlin', 'Firebase', 'GitLab', 'Bitbucket', 'Subversion \(SVN\)', 'Visual Studio Code', 'IntelliJ IDEA', 
        'PyCharm', 'Eclipse', 'Android Studio', 'Xcode', 'Scrum', 'Kanban', 'Test-Driven Development \(TDD\)', 
        'Continuous Integration/Continuous Deployment \(CI/CD\)', 'Bootstrap', 'MongoDB', 'SQLite', 'React Native', 
        'Xamarin', 'TensorFlow', 'PyTorch', 'Digital Marketing', 'Redux', 'Ruby', 'PHP', 'C#', 'Go', 'Rust', 'Angular',
        'Vue.js', 'Node.js', 'Express.js', '\.NET Core', 'Jira', 'Trello', 'Asana', 'Microsoft Project','JavaFX']
    
    grade_c_skills = ['Regression Testing', 'Selenium', 'Jest', 'JUnit', 'React Leaflet']

    # Assign values to the skills based on their categories
    skill_count = 0
    for skill in matches:
        if skill in grade_a_skills:
            skill_count += 3
        elif skill in grade_b_skills:
            skill_count += 2
        elif skill in grade_c_skills:
            skill_count += 1

    # Print the sum of the values
    # print("Skill Count:", skill_count)

    return skill_count

#Certifications
def count_certifications(text):
    # Step 1: Find the Certifications section
    # cert_section_match = re.search(r"\*\* Certifications \*\*(.*?)(?:\*\*|$)", text, re.DOTALL)
    cert_section_match = text
    
    # Step 2: Initialize count
    certificate_count = 0
    
    if cert_section_match:
        # Get the extracted Certifications section
        cert_section = cert_section_match.strip()
        
        # Step 3: Split the section into lines and count non-empty lines
        certificate_lines = [line.strip() for line in cert_section.split("\n") if line.strip()]
        
        # The certificate count should be the number of non-empty lines
        certificate_count = len(certificate_lines) - 1
    
    return certificate_count

def load_count_certifications(sections):
    if "Certifications" in sections:
        certifications = sections['Certifications']
    else:
        certifications = ""

    certificate_count = count_certifications(certifications)
    print(certificate_count)

    return certificate_count

#Curricular and Achievements
# Function to extract degree, CGPA/Percentage, skills, achievements, extra-curricular, certificates
def extract_curricular_and_achievements(sections):
    # Counting achievements
    achievements_section = ""
    if 'Achievements' in sections:
        achievements_section = sections['Achievements']
    else:
        achievements_section = ""

    achievements_count = 0
    if achievements_section:
        achievements_count = len(re.findall(r"[^\n]+ ", achievements_section))
    
    extra_curricular_section = ""
    if 'Curricular' in sections:
        extra_curricular_section = sections['Curricular']
    else:
        extra_curricular_section = ""

    extra_curricular_count = 0
    if extra_curricular_section:
        extra_curricular_count = len(re.findall(r"[^\n]+", extra_curricular_section)) - 1
    
    # Count certificates using the external function
    # certificate_count = count_certifications(text)
    # print("Achievements count:", achievements_count)
    # print("Extra-curricular count:", extra_curricular_count)

    return achievements_count,extra_curricular_count
        
#Extract Projects
def extract_projects(sections):
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    # Initialize project count
    project_count = 0

    # Text data
    text_data = ""
    if 'Projects' in sections:
        text_data = sections['Projects']
    else:
        text_data = ""

    # Split text data into lines
    lines = text_data.split('\n')

    # Iterate through each line
    for line in lines:
        # Check if any month is present in the line
        if any(month in line for month in months):
            # If a month is found, increment project count
            project_count += 1

    print("Total projects:", project_count)
    return project_count

#Final Output in json
@csrf_exempt
def json_data_from_resume(request):
    body_str = request.body.decode('utf-8')

    # Parse the JSON data
    body_data = json.loads(body_str)

    # print("request body ",body_str)
    # Access the URL from the parsed JSON data
    # print("dtype ",body_data)
    if request.method == "POST":
        output = {
            "Degree": "",
            "Branch": "",
            "CGPA" : 0,
            "skill_count": 0,
            "Projects": 0,
            "Achivements": 0,
            "ExtracurricularActivities": 0,
            "WorkshopsCertifications": 0
        }


        # Example image URL
        # image_url = "https://res.cloudinary.com/dhedlkgfi/image/upload/v1714297677/zwpmfehgx3tcny3resle.png"
        # image_url = request.body.url
        image_url = body_data.get('url')
        # image_url = "./post/resumeextraction/sharanya.jpg"

        # place prompt here 
        input_prompt = """Divide the image content into different sections('Education',
        'Projects', 'Achievements', 'Curricular', 'Skills', 'Certifications',
        'Training/Experience/Internship') and start the section using the header **
        and only use ** for section headers also give the pointer of all the skills  
        combined as readiness from 1 to 1000 according to real world job requirements"""

        print("started !!")
        response = load_response(image_url,input_prompt)
        # print(response)
        sections = extract_sections(response)
        education = load_education(sections)
        output['Degree'] = education['Degree']
        output['Branch'] = education['Branch']
        output['CGPA'] = education["CGPA/SGPA/GPA"]
        output['skill_count'] = skill_count(sections)
        output['WorkshopsCertifications'] = load_count_certifications(sections)
        output['Achivements'],output['ExtracurricularActivities'] = extract_curricular_and_achievements(sections)
        output['Projects'] = extract_projects(sections)
        print(output)
        return JsonResponse(output)
