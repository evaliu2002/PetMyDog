# User Documentation

### What does our system do?
Our web-app, Pet My Dog--PMD for short--is a social web-app
for dog lovers who wish to interact with different dogs or
enable their dogs to interact more with other people. The app
allows people to request to meet with nearby pet owners' dogs 
for a petting meeting where the user can play and pet the dog
for a short amount of time. <br>

### How to install the software for the system
Users will need to install IntelliJ and clone the GitHub repo for
access in their local device. The users will then navigate to
main/front-end in the IntelliJ terminal and install the npm
package manager using npm install. Users will also be 
prompted by IntelliJ or npm to install all the imported
packages used for the project. Users may proceed to install
the imported packages.<br>

### How to start up the system
Since cloud hosting isn't completed for this web-app yet, users
will have to first run main, and then use npm start in terminal 
to be able to run the app on local host. 
Once the implementation of cloud hosting is 
completed, users are required to have access to the internet 
and also have a working browser in their device to use the 
web-app. Then, the users can input the url 
https://petmydog.fun into their browser. This will direct 
them to the login page of Pet My Dog. From there, users are 
then able to access and use the app as they please. <br>

### How to use the software
The homepage of the app will contain a login with Google button
and a temporary second button for the users to direct themselves
to the find-dogs path of the webpage. Dogs will then appear in
the page. Users can click on the individual dogs and choose to
meet with the dogs. All users have access to their profiles where
they are allowed to add dog profiles to their account. These
dog profiles allow them to display their dogs to nearby users
for petting. Owners will have a button that they can press
in find dogs labeled "Owner Mode" where they can receive requests
for users who wish to meet with their dogs. Owners can choose to
accept or reject the meeting requests.

### Unfinished Functionalities (work in progress)
<li>Front end: Displaying dog meeting requests sent from app user to pet
owner (Planned completion by end of Wednesday)</li>
<li>Front end: Allow owners to accept requests</li>
<li>Front end: Redirect petters to the navigation page when their request is approved</li>
<li>Front end: Show the user helpful message when error occur</li>
<li>Back end: Give the petters and owners location of each other by adding an api /activeMeetup</li>
<li>Back end: Validate request parameters and through correct error code to frond end</li>

### How to report a bug
An example of a bug report looks like this: 
[Bug Report Example](https://github.com/evaliu2002/PetMyDog/issues/47) <br>
Best Practices for Bug Reporting: [Best Bug Reporting Practices](https://rewind.com/blog/best-practices-for-using-github-issues/)

### Known Bugs
Sometimes each nearby dog is displayed twice on the page.
No input validation on back end, so unexpected inputs will cause undefined behavior on back end. For example, out of bound longitude/latitude are not handled.

