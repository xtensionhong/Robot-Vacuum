function start() {
    let currentX = 0;
    let currentY = 0;
    let gridXLength = 5;
    let gridYLength = 5;
    let placeCommand = "";
    let facingDirection = "";
    let directions = [];

    report();

    function report() {
        $("#report-btn").on("click", function(event) {
            let input = $("#input-value").val().toLowerCase();

            // split the input to array and clear any empty value
            input = input.split("\n").filter(Boolean);

            // read the place command
            placeCommand = input[0].split(/[ ,]+/);
            currentX = parseInt(placeCommand[1]);
            currentY = parseInt(placeCommand[2]);
            facingDirection = placeCommand[3];


            //check valid command start with "place" and end with "report"
            //if valid run the command
            if(placeCommand[0] === "place" && placeCommand.length === 4 && input[input.length-1] === "report"){
                input.shift();
                input.pop();
                directions = input;

                //check robot place position
                if(currentX <= gridXLength && currentY <= gridYLength){
                    runDirection(directions);
                    console.log("output = " + currentX  + " " + currentY + " " + facingDirection);
                    $("#output").html(currentX  + ", " + currentY + ", " + facingDirection.toUpperCase());
                }else{
                    console.log("output = invalid location - please place the robot within the grid area!");
                    $("#output").html("Invalid location - Please place the robot within the grid area!");
                }
            }else{
                console.log("output = invalid command");
                $("#output").html("Invalid command!");
            }

        })
    }

    function runDirection(directions) {
        for (let i = 0; i < directions.length; i++) {
            updateLocation(directions[i], facingDirection, currentX, currentY);
        }
    }

    //check command against current location
    //if ok to move, update current location
    function updateLocation(direction) {
        if (direction === "move"){
            updateDirection();
        }else if (direction === "left"){
            updateFacingDirection(direction);
        }else if (direction === "right"){
            updateFacingDirection(direction);
        }
    }

    function updateDirection(direction) {
        if (facingDirection === "north" && currentY < gridYLength) {
            currentY++;
        }else if (facingDirection === "south" && currentY > 0) {
            currentY--;
        }else if (facingDirection === "east" && currentX < gridXLength) {
            currentX++;
        }else if (facingDirection === "west" && currentX > 0) {
            currentX--;
        }
    }

    function updateFacingDirection(direction) {
        if (direction === "left"){
            if (facingDirection === "north"){
                facingDirection = "west";
            }else if (facingDirection === "east"){
                facingDirection = "north";
            }else if (facingDirection === "south"){
                facingDirection = "east";
            }else if (facingDirection === "west"){
                facingDirection = "south";
            }
        }else if (direction === "right"){
            if (facingDirection === "north"){
                facingDirection = "east";
            }else if (facingDirection === "east"){
                facingDirection = "south";
            }else if (facingDirection === "south"){
                facingDirection = "west";
            }else if (facingDirection === "west"){
                facingDirection = "north";
            }
        }
    }
}

$(start);
