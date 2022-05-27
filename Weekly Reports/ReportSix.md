# **Report 6 5/18/2022**

#### Team Report: Status Update and Project Meeting Agenda
- Goals from last week:
    - Front-end: Finish implementing the rest of our listed components. Add more tests
      to develop our front end test suite.
    - Back-end: Finish implementing the remaining APIs for the beta release, and work on
      making an exhaustive test suite to make sure everything works well.
    - Front&Back: Develop and figure out communication and responses between the front end components
      and the APIs so that we're set up for the final release.

- What we did:
    - Front-end: Made progress on implementing requests from dog requests, create dog profile,
                 and view dog profile component. Started on the nav user and nav owner components.
    - Back-end: Implemented the remaining APIs (editUserProfile, editDogProfile, deleteDogProfile).
                Started working on refining APIs for more optimization and security.

- What we plan to do:
  - Front-end: Finish implementing the rest of our listed components and develop more of our test suite.
  - Back-end: Added three more API and added comments to existing ones.

#### Individual Reports

- ##### Eva Liu:
  - Goals from last week: My goal from last week is start making progress on the 
                                            meetup request component and the rest of the front end components.
                                            I also plan on implementing more tests to develop front end's test suite. 
  - Progress and Issues: I made progress on implementing requests from back end for dog requests. I did have a
                         few issues where back end had to modify their API for us to create seamless request
                         functionality. Our ideas for how the requests leading to navigation has changed several
                         times because everytime we realized we didn't consider something that should have been
                         considered. I didn't get stuck on anything this week, I am still waiting for back end to
                         modify the APIs so I can continue working on my front end component.
  - Plans and Goals for the Next Week: Finish implementing dog requests component and developing front end's
                                       test suite.

- ##### An Nguyen
  - Goals from laste week:  Finish building 'owner-profile' and set up data fetching from the back end.
                            Make the map zoom out to a larger area when finding user's location
  - Progress and Issues: Finished building 'owner-profile' and set up data fetching from the back end on
                        ViewMyDog and OwnerProfile
  - Plans and Goals for the Next Week: Test the CreateDogProfile post request to the back end. Create test suite for
                        front-end components. Edit styling to fit mobile page. Make the map zoom out to a larger area.

- ##### Kevin Kong
    - Goals from last week: I will write documentations. I can also add more tests
      for backend. I will also work with others on coding and debugging.

    - Progress and Issues: I implemented backend API. I also helped write the specs for backend API.

    - Plans and Goals for the next week: I will continue finishing up some backend APIs. I can write test cases and debug any issues in the code.

- ##### Anish Konanki
  - Goals from last week: Complete the editDogProfile API for next week, start building an exhaustive test suite, 
                          and work on improving our old code based on given feedback.
  - Progress and Issues: I finished working on the editDogProfile API, and did some testing on my own to make sure it
                         it is working as intended. I also worked on the developer documentation for this week with Steve
                         and finished the backend portions of it. We also discussed potential improvements to the APIs.
  - Plans and Goals for the Next Week: Work on refining APIs based on feedback and test them thoroughly.

- ##### Steve Ma
    - Goals from last week: Complete the edit user profile feature and revise our beta release based on 
                            the feedback we have released. 
    - Progress and Issues: I finished working on the edit user profile API and completed testing with Postman to make sure it works.
                           I also worked on the developer documentation with Anish this week and the backend portion of it. I am currently
                           working on modifying the Meetup APIs to return user ID for verification.
    - Plans and Goals for the Next Week: Completed modifying the Meetup APIs to meet new frontend requirements.

- ##### Wenxuan Liu
  - Goals from last week: Make server run in https, put together front end with a few more endpoints.
  - Progress and Issues: Applied SSL and configured both backend and front end to run in HTTPS. Learned how to use GCP
                        Directions API to get path between geolocations and used React to display the path on the map. 
                        Worked with other front end members to get data from back-end. Identified necessary changes to
                        back-end. 
  - Plans and Goals for the Next Week: Finish /theOtherUserLocation: make a new endpoint that will return the sender’s 
                        location to the receiver or return the receiver’s location to the sender.
