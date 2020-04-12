
# Express error handling sample

> Little project focused on Nodejs error handling through Express middlewares.

## The goals are:
- handle errors that can crash the node process (in the "let is crash" way)
- define a set of standard lightweight erros that will be returned to the client (web app), hiding the complexity of the real error happened 
- log operational and programmers errors with a logger so that it is possible to reconstruct what happened


## Disclaimer
No attention is made to topics such as validation, code structuring, databases, etc. Only error handling!


## Routes

### Get all users
- url: http://localhost:3000/users
- method: GET

### Get one user
- url: http://localhost:3000/users/{{user_id}}
- method: GET
- params: user id

### Create user
- url: http://localhost:3000/users
- method: POST
- body:
    - name: user name
    - age: user age

### Update user
- url: http://localhost:3000/users/{{user_id}}
- method: PUT
- params: user id
- body:
    - name: user name
    - age: user age

### Delete user
- url: http://localhost:3000/users/{{user_id}}
- method: DELETE
- params: user id