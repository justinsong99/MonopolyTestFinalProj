# monopoly

A JavaScript/HTML/CSS Monopoly implementation with full game play. Supports two-eight players.

Play online at [http://www.intrepidcoder.com/projects/monopoly/](http://www.intrepidcoder.com/projects/monopoly/).

Includes an experimental capability to play against an AI. A test AI for demonstration purposes is included.

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
    -
    -

Things we have mock tested:

- Player
- Trade
- addamount
- subtractamount
- gotojail
- gobackthreespaces
- payeachplayer
- collectfromeachplayer
