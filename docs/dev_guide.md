### Layout of the repository

All the code will be contained in the main directory. The main directory is divided into front
and back end code, each in a sub directory. We will have our weekly reports in the Weekly Reports
directory, which we will update every week to report our progress and action items. Our tests are contained
within the front and back end sub directories, within the src sub directory (and the tests are in the test
sub directory).

## Back-end:

### Setup Instructions (for use in IntelliJ with Maven):

#### Building and Running the project
1. Build the project in IntelliJ by navigating to the Maven tab in IntelliJ, opening `Lifecycle` in the `back-end` tab, and clicking the
   `Compile` button.
2. Run Elasticsearch locally. Follow the instructions provided here:
   https://www.elastic.co/downloads/elasticsearch
3. Run `Main.java` to launch the Spark server on localhost port 4567.

#### Testing the project
1. Run Elasticsearch locally before testing by following the instructions provided here:
   https://www.elastic.co/downloads/elasticsearch
2. Navigate to the Maven tab in IntelliJ, open `Lifecycle` in the `back-end` tab, and click the `Test` button to run the provided
   tests.
3. JUnit tests are located and can be added in main/back-end/src/test/java.
4. Before running JUnit tests, make sure that Main.java is not running already. Otherwise, stop Main.java.

#### Adding new tests

To add a new test, navigate to `main/back-end/src/test`, and add the test to the appropriate test file.

For naming conventions, we name the test based on the use case it will be testing. Each test should go into the corresponding
Java test file for the method it is testing (ex: for testing getUserProfile in Main.java, we add our test to GetUserProfileTest.java).

## Front-end:

### Setup Instructions

1. Obtain source code by cloning this repo.

2. Navigate to main/front-end.

3. Run npm install.
4. Users will also be
   prompted by IntelliJ or npm to install all the imported
   packages used for the project. Users may proceed to install
   the imported packages.

5. To run PetMyDog on localhost, run npm start.

#### How to run tests
1. Navigate to main/front-end.
2. Run npm test.

#### Adding new tests

To add a new test, navigate to `main/front-end/src/test`, and add the test to the appropriate test file.

#### How to build a release of the software
1. Navigate to main/front-end.
2. Run npm build.

## How to file a Bug Report:
To report a bug, navigate to our [Issue](https://github.com/evaliu2002/PetMyDog/issues/new/choose) page nad choose the
Bug Report template and fill in the information below:
- Describe the bug: A clear and concise description of what the bug is.
- To Reproduce: Steps to reproduce the behavior.
- Expected behavior: A clear and concise description of what you expected to happen.
- Screenshots: If applicable, add screenshots to help explain your problem.
- Desktop: Information regarding your PC, if applicable.
- Smartphone: Information regarding your phone, if applicable.
- Additional context: Add any other context about the problem here.