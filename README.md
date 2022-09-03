RestAPI | BackEnd TypeScript Project | Lachlan Pearce

Version 2.0 (Productionised)
    -Typescript Implementation
    -Project Architecture Implementation with .ts files stored in /src and built to /dist
    -Unit test implementation through jest (issues executing with docker currently)

The following API allows HTTP calls to be executed over Port 3000 to access and edit a PostgreSQL database. The calls: 'GET', 'POST', and 'PUT' are supported.

System Requirements to Execute on Local Machine:
    -Docker and Docker Compose

To Run RestAPI locally:
    -Set Terminal Directory to this folders location
    -Execute "docker-compose up"

To View Database in Browser:
    -Navigate to 'http://localhost:3000/documentation'

To Execute HTTP Calls using Postman or Advanced REST Client:
    -Navigate to 'http://localhost:3000/cows'

To Terminate TestAPI:
    -Execute "docker-compose down"


Using 'POST' and 'PUT'
    -The database is initialised with no members and will thus initially appear empty. To populate the database, use 'POST' in the following format:

    'http://localhost:3000/cows'

    {
     "collarId": "Number",
     "cowNumber": "Number",
     "collarStatus": "Status"
    }

    Member ID's are given as integers in numerical order of population.

    -To edit an existing member use 'PUT' in the following format (using the member ID not collarId in the HTTP call):

    'http://localhost:3000/cows/{id}'

      {
     "collarId": "Number",
     "cowNumber": "Number",
     "collarStatus": "Status"
    }

Solution Technology Stack:
    -RestAPI uses TypeScript, Node.js, and PostgreSQL executed as a Docker container to achieve a functioning Database. 


Current Assumptions, Risks, and Known Issues:
    -Current execution of npm install during 'docker-compose up' process is clunky and has unnecessary depenencies.
    -Unit test executed through jest under npm start is not executing properly (docker image still builds succesfully though)

Anything extra you might think the project could need?

    |￣￣￣￣￣￣￣ |  
    |   COMMENTS   |
    |＿＿＿＿＿ _＿_|
    (\__/) || 
    (•ㅅ•) || 
    / 　 づ  







