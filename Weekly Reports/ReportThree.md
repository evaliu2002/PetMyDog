# **Report 3 4/27/2022**

#### Team Report: Status Update and Project Meeting Agenda
    Goals from last week: 
    - Front-end: Create all necessary components and create the skeleton for the web app before we add functionality.
    - Back-end: Finalize database design on Thursday, setup GCE, Google Cloud SQL, and ElasticSearch.
    - Front&Back: Finalize response/request formats and the list of APIs.
  
    What we did:
    - Front-end: Created all of the possible parts of the components so we have a skeleton of what each component will look like/how it will function.
    - Back-end: Finalized database design, Drew the ER diagram, Completed setup for sql connection and OAUTH. Completed architecture and design. Completed setup for Google Cloud SQL.

    What we plan to do:
    - Front-end: Figure out how to navigate between web pages. Eva will work on the Login and Signup components. An will work on the view dog profile component.
    - Back-end: Work on login, get dog profile, create dog profile, get user profile and update location.
    - Front&Back: 

#### Individual Reports

###### Eva Liu
    - Goals from last week: Create the rest of the necessary components for the web app: profile component, dog profile component, map component, etc.
    
    - Progress and Issues: I worked on the front-end project file organization. I decided to organize the files so that there are sub folders in the components folder for each component rather than store them all together in the components folder. This works because we will need to create test files for each component and rearranging the files this way will make it more organized. I also finished the templates for my assigned components. I am currently working on implementing google login and Oauth with the other developers. I learned how to style component files and organize components. I am having trouble figuring out how to navigate between the implemented web pages. I researched about react router but it seems like I am unable to use react router with buttons and icons. So I am currently stuck on figuring out how navigation between web pages will work.
    
    - Plans and Goals for the Next Week: Figure out how we are going to navigate between pages in the web app. Finish implementing the login and signup page for the web app.
    
###### Steve Ma
    - Goals from last week: I will work with others to finalize DB design on Thursday and setup GCE, Google Cloud SQL, and ElasticSearch.
    
    - Progress and Issues: I worked with other developers to finalize the database design and worked on setting up Google Cloud SQL. I reviewed Wenxuan's code for setting up SQL connection and code for OAUTH and discussed possible changes to the login route. We also reviewed geolocation related designs and finalized different situations on when the location would be updated. I'm currently working on the get dog profile API.
    
    - Plans and Goals for the Next Week: Finish get dog profile API and work with other developers to finish the update location API.

###### Anish Konanki
    - Goals from last week: I will research more about Compute Engine and the database that we will use, and learn more about how to set up the database.

    - Progress and Issues: I discussed with the other backend developers what we would do for the database. We also discussed Oauth and how to set it up. I'm working on the createDogProfile API for this week. I will need to read up more on the Spark framework and familiarize myself with it on how to update the database with the given info.

    - Plans and Goals for the next week: Finish createDogProfile API and work with the other backend developers to finish the updateLocation API.

###### Wenxuan Liu
    - Goals from last week: 
    - I will discuss with backend team to finalize DB design on Thursday and create a database after that.
    - I will work with others to set up GCE and ElasticSearch.
    - I will study more about Spark framework and ElasticSearch.

    - Progress and Issues: I set up and configured: the google oauth, google compute engine, google cloud sql, spark pac4j, sql2o.
    I also finished login endpoint and sql framework and connection.

    - Plans and Goals for the next week: set up elasticsearch, learn how to use elasticsearch, use elasticsearch to make updateLocation endpoint.


##### Kevin Kong
    - Goals from last week: I planned to settle with the team on the relational database,
                                and to figure out how to setup the database in the repo or dev environment.

    - Progress and Issues: I debugged environment settings with a teammate, discussed about the public libraries
                                that we are using for our database, and worked on API calls assigned to me.

    - Plans and Goals for the next week: Help setup ElasticSearch. Continue to work on backend API calls.
    
##### An Nguyen
    Goals from last week: I planned to code the components that I planned and draft
    out what we need to send to and receive from the back end.
  
    What we did:
    -I built the CreateDogProfile and ViewDogProfile components to show the dog's profile photos.
    -I read the tutorials on React Router and how to preview and upload profile photo.

    What we plan to do:
    - Continue building other components 
    - Figure out and implement React Router to navigate between the pages.