# MonopolyTestFinalProj

Final project for STAD class

HOW TO RUN:

- download all necessary dependencies such as jest, pupeteer, istanbul, babel, etc
- npm test
  - This run our testing scripts against the source code

REPORT:

We split up our project testing with whitebox, mock, and GUI testing on a web based monopoly game to try and break it down and expose as many faults as possible. As you can see from the results after running npm test, we have achieved branch coverage for mostly all feasible functions. There are some functions which we were just unable to test with backend whitebox and mock testing because they were either solely front end DOM manipulation functions or the functions were just way too highly coupled and needed the game state to be defined in very particular ways which would have been way too complex to test in Jest. So, for those functions we just use GUI tests to try and find faults.

As I mentioned, the original SUT is extremely coupled, meaning that almost every function in the entire project makes calls to other functions in the project. This means that the only realistic way to test a function by itself would be to mock the other functions it calls. This added a whole layer of complexity to our project since we needed to mock test pretty much every single function in conjunction with the whitebox testing. Figuring out how to properly mock test was an extremely complicated process which took numerous hours. Some of the challenges we faced with mock testing include the fact that every function in the project is inside of the same exact file. So, if function A calls function B and we try to mock function B in the testing file, the test will ignore our mock and just call the original function because it is in the same file. It took a long time to debug why mock testing wasn't working until we realized and came up with a workaround. So, the only way to have mocks work is if the mocked function is not in the same file as the function we are testing. For this reason, we created other files inside a folder called mocks which include small groups of functions from the original monopoly code. Then, we would test the functions from these mocks/filename files and mock the functions in the original monopoly.js file. Another issue was just learning the sytax and methods to mock test in jest with calls like mockImplementation and mockreturnvalue.

This code is a javascript project with many DOM manipulation lines so it took us a while to find the right tools to test this and there are a lot of differences from JUnit since most of these functions deal with browser javascript. Learning the new tools such as jest (for testing), istanbul (for coverage), pupeteer (for some GUI testing), and even just jQuery and javascript took a while and made basic testing set up challenging.

The fact that the code itself had DOM manipulation and jQuery in it actually caused a lot of errors in our testing for a very long time because our jest files would complain about jQuery '$' and not knowing what document.getelement is. We eventually found a work around to have each of out jest files just make a copy of the index.html page which was honestly really difficult to figure out. We spent at least a full day trying to find workarounds for the tests not working with document being null until we fould this work around because there was limited support online. Moreover, we discovered jest set up files where we could make jquery a global import for each file.

Regarding imports, another challenge we faced was the fact that the javascript files never imported functions or exported their functions. This is because the html file brings all the source files it needs in with the <script></script> tags so importing is not needed. Due to this, the javascript files used global variables across functions and files which were constantly being updated and modified. The authors of this code used these variables rather than passing in parameters to the functions so we needed to figure out a way to mock the states of these global variables so that out tests could run properly. Also, in order to run the tests we needed to import in the functions under test to our testing files meaning we needed to change the source code to export the information we needed.

As mentioned earlier, we used the described techniques for mock and whitebox testing. The code coverage reports are given after running npm test. Also, for more detailed reports, you can check the coverage/iCov-report/index.html file.

For GUI testing we used Selenium. Also we used some jest puppeteer for basic GUI testing of openning of the page and starting the game. The coverage for this can be seen in the coverage/index.html file. The pupeteer tests are in the setup.test.js file and in order for this file to pass you need to change the page url from
'file:///Users/anirudhsharma/Documents/Semester8_College/STAD/Final%20Project/MonopolyTestFinalProj/monopoly-master1/index.html'
to the location of the game index file on your computer.

These simple tests show that simply running thr game will cover a lot if the window.onload function code as well as setup and play. Learning about pupeteer and getting coverage to work with it was a tediuos process with a lot of error as well.

The rest of the selenium test will cover the other DOM manipulation functions as well as play/setup/land/onmouseover/roll and update functions. The test are also covered with mock/whitebox testing

There were so many other issues we had while working on this project and problems with the SUT but through our struggles I think we really learned a lot. It was a great learning experience to learn about testing JS code, testing JS web projects, testing really bad coupled code and trying to figure out work arounds. We also got to learn about cool tools such as Jest, Pupetteer for headless chrome GUI testing along with Selenium, Istanbul for code coverage and more.

Things we can not test with white/black box testing

    The following onlt update DOM elements on the front end to reflect the current state of the game.
    We can check this with GUI testing
    - addAlert
    - popup
    - updatePosition
    - updateMoney
    - updateDice
    - updateOwned
    - updateOption
    - window.onload

Things we have mock tested:

- Game
- Player
- Trade
- addamount
- subtractamount
- gotojail
- gobackthreespaces
- payeachplayer
- collectfromeachplayer
- advance
- advanceToNearestUtility
- advanceToNearestRailroad
- streetrepairs
- buyHouse
- sellHouse
- payfifty
- useJailCard
