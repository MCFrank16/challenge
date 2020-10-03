Simple Job Application # BK-CHALLENGE

# APP Link: 
https://simple-job-app.herokuapp.com/

### API Endpoints

#### Application Features
| Endpoints                     |         Functionality
| ----------------------        |------------------------                         | 
| POST    /applications         | Send in an application.                         | 
| GET    /applications          | Fetch all applications                          |
| GET   /applications/:id/cv    | Get a single application detail                 |
| GET   /applications/:id?status=value| Update an application status              |

#### Oauth Features
| Endpoints                     |         Functionality
| ----------------------        |------------------------       
| POST   /signin                | Sign In an HR                                   |
| GET   /logout                 | Sign out an HR                                  |
