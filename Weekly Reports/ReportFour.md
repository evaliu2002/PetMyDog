# **Report 4 5/4/2022**

#### Team Report: Status Update and Project Meeting Agenda
   - Goals from last week:
     - Front-end: Figure out how to navigate between web pages. Eva will work on the Login and Signup components. An will work on the view dog profile component.
     - Back-end: Work on login, get dog profile, create dog profile, get user profile and update location.

   - What we did:
     - Front-end: Finished implementing react router, login, map, create dog profile 
                  and view dog profile components
     - Back-end: Finished implementing APIs: login, getDogProfile, createDogProfile, getUserProfile, and
                  set up JUnit with Maven and CircleCI CI for the backend.

   - What we plan to do:
     - Front-end: Finish implementing the rest of our listed components. Add more tests
                  to develop our front end test suite.
     - Back-end: Finish implemented the remaining APIs for the beta release, and work on
                 making an exhaustive test suite to make sure everything works well.
     - Front&Back: Develop and figure out communication and responses between the front end components
                   and the APIs so that we're set up for the beta release.

#### Individual Reports

###### Eva Liu: 
     - Goals from last week: Figure out how we are going to navigate between pages in the web app. 
                             Finish implementing the login and signup page for the web app.
     - Progress and Issues: I finished implementing the login component. I also finished set up Jest and
                            CircleCI testing for the front-end. I set up react-router for our web app
                            pages. I had a few issues when setting up react router and got stuck with
                            a few bugs but managed to fix the bugs after talking to the other front end
                            developers. I didn't get stuck for anything this week, just a few issues that
                            were eventually fixed.
       - Plans and Goals for the Next Week: My goal for the next week is finishing implementing all the
                                          necessary components for the beta. I also plan on implementing
                                           more tests to develop front end's test suite. 


###### An Nguyen

     - Goals from last week:    Continue building other components.
                                Figure out and implement React Router to navigate between the pages.
     - What I did: I finished the ViewMyDog components. I changed the structure of ViewMyDog and 
                            CreateMyDog to React Hook's structure. I added UploadPhoto so now CreateMyDog
                            page allows uploading profile photo from the local memory and preview them. 
                            
     - What we plan to do: Build the remaining components and discuss the communication with back end.

##### Kevin Kong
    - Goals from last week: Help setup ElasticSearch. Continue to work on backend API calls.

    - Progress and Issues: I added a junit test to the API that I wrote. 

    - Plans and Goals for the next week: Continue to work on backend API calls. Write documentation.

###### Anish Konanki

     - Goals from last week: Finish createDogProfile API and work with the other backend developers to 
                             finish the updateLocation API.
     - Progress and Issues: I completed implementing the createDogProfile API. I also worked with the other
                            backend developers to set up JUnit with Maven and CircleCI for the backend. I've
                            been trying to figure out ElasticSearch and see how it works so that we can finish
                            updateLocation and getNearbyUsers for next week. I will be looking deeper into it
                            to understand the ins and outs of ElasticSearch.
     - Plans and Goals for the Next Week: Finish the big APIs for next week and set up for the beta release, and
                                          implement proper testing for the backend.

###### Steve Ma
     - Goals from last week: Finish get dog profile API and work with other developers to finish the update location API.
     - Progress and Issues: I completed developing the get dog profile API. I also worked with the other backend developers
                            to figure out which CI/CD platform we would use and how unit tests can be integrated into the build 
                            platform. We chose CircleCI for the build platform and integrated our JUnit Maven build and I completed
                            the config file with Anish. I've also finished setting up ElasticSearch.
     - Plans and Goals for the Next Week: Finish the APIs planned for next week, and figure out testing with the Spark Java server.

###### Wenxuan Liu
     - Goals from last week: I will discuss with backend team to finalize DB design on Thursday and create a database after that.
                             I will work with others to set up GCE and ElasticSearch.
                             I will study more about Spark framework and ElasticSearch.
     - Progress and Issues: Worked with back end members to set up Junit and Jest test environment. 
                            Configured CI/CD with other group members. Adjusted database schema. Completed signup feature.
                            Learned Elasticsearch. Learned React.js. Complete Map component.
     - Plans and Goals for the Next Week: Finish findDogs component and updateLocation, getNearbyUser endpoints.
