# Robot-Vacuum

### Introduction:

- This application is a simulation of a robot vacuum moving in an area of dimensions 5 units by 5 units.
- There are no other obstructions in the area.
- The robot is free to roam around the area but must be prevented from leaving the area.
- Any movement that would result in the robot leaving the area must be prevented, however further valid movement commands must still be allowed.

## Instructions for Running This Program

This web interface which can take following commands and display the result by clicking on the "Run" button.

### Input:

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```
- **_PLACE_** will put the robot in the area at position **_X_**,**_Y_** and facing direction F (**_NORTH_**, **_SOUTH_**, **_EAST_**, or **_WEST_**).
- The origin (0,0) can be considered to be the SOUTH WEST corner.
- The first valid command to the robot is a **_PLACE_** command, after that, any sequence of commands may be issued, in any order, including another **_PLACE_** command. The application should discard all commands in the sequence until a valid **_PLACE_** command has been executed.
- **_MOVE_** will move the robot one unit forward in the direction it is currently facing.
- **_LEFT_** and **_RIGHT_** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- **_LEFT_** and **_RIGHT_** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- **_LEFT_** and **_RIGHT_** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- **_REPORT_** will announce the X,Y and F of the robot.
- A robot that is not already placed in the area, commands (the MOVE, LEFT, RIGHT and REPORT) will be ignored.

## Examples:

```
Input:
PLACE 0,0,NORTH
MOVE
REPORT
Output: 
0,1,NORTH

Input:
PLACE 0,0,NORTH
LEFT
REPORT
Output: 
0,0,WEST

Input:
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 
3,3,NORTH

Input:
PLACE 6,6,NORTH
MOVE
REPORT
Output: 
Invalid location - Please place the robot within the grid area!

Input:
0,0,NORTH
MOVE
Output:
Invalid command!
```

