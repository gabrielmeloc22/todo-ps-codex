#Documentation for help

Controllers - recieve the entries (params, body, headers) and send them to the use case;
Use Case - recieve the data from the controller treats it and send it to the repository to be put in BD
index file at each useCase - create a instance of the controller with getInstance method

<br>

#What needs to be done

Error handling
tries and catches

<br>

Base Usage for BD:
Users:
{
  "email": "user1@ccc",
	"password": "40028922",
	"name" : "user1"
}
Tasks:
{
  "title": "task teste {number} - user{number}",
	"authorId" : "{UserId}",
	"content": "content teste task teste {number}",
	"status": true/false
}