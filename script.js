function start() {
    let currentX = 0;
    let currentY = 0;
    let gridXLength = 5;
    let gridYLength = 5;
    let placeCommand = "";
    let facingDirection = "";
    let directions = [];
    let reachBoundary;
    
    let gridWidth = 60;
    let gridWidthOffset = 9;
    let stepCount;

    report();

    function report() {
        $("#report-btn").on("click", function(event) {
            // reset grid output
            reset();
            
            // case sensitive check
            let input = $("#input-value").val().toLowerCase();

            // split the input to array and clear any empty value
            input = input.split("\n").filter(Boolean);

            // read the place command
            placeCommand = input[0].split(/[ ,]+/);
            currentX = parseInt(placeCommand[1]);
            currentY = parseInt(placeCommand[2]);
            facingDirection = placeCommand[3];
            
            console.log("placeCommand = " + placeCommand);
            console.log("intput = " + currentX  + " " + currentY + " " + facingDirection);


            // check valid command start with "place" and end with "report"
            // if valid run the command
            if(placeCommand[0] === "place" && placeCommand.length === 4 && input[input.length-1] === "report"){
                input.shift();
                input.pop();
                directions = input;

                //check robot place position
                if((currentX >= 0 && currentX <= gridXLength) && (currentY >= 0 && currentY <= gridYLength)){
                    // print intial robot location on map
                    appendRobot("initial-location","");
                    // print intial robot location on output
                    $("#initial-output").html(currentX  + ", " + currentY + ", " + facingDirection.toUpperCase());
                    $("#initial-output").append("<span class=\"robot " + facingDirection + "\"></span>");
                    
                    runDirection(directions);
                    
                    // print final robot location on map
                    appendRobot("finial-location","");
                    
                    // print final robot location on output
                    console.log("output = " + currentX  + " " + currentY + " " + facingDirection);
                    $("#finial-output").html(currentX  + ", " + currentY + ", " + facingDirection.toUpperCase());
                    $("#finial-output").append("<span class=\"robot finial-location " + facingDirection + "\"></span>");

                }else{
                    console.log("output = invalid location - please place the robot within the grid area!");
                    $("#initial-output").html("Invalid location - Please place the robot within the grid area!");
                    $("#finial-output").html("NA");
                }
            }else{
                console.log("output = invalid command");
                $("#initial-output").html("Invalid command!");
                $("#finial-output").html("NA");
            }

        });
    }
    
    function reset(){
        $("#grid-chart").empty();
        stepCount = 0;
        reachBoundary = false;
        $("#initial-output").html("");
        $("#finial-output").html("");
    }
    
    function appendRobot(stage, moveCount){
        $("#grid-chart").append("<div class=\"robot "+ stage + " " + moveCount + " " + facingDirection + "\"></div>");
        if(moveCount){
            $("#grid-chart ." + stage + "." + moveCount).css({"left": (gridWidth * currentX - gridWidthOffset + "px"), "bottom":  (gridWidth * currentY - gridWidthOffset + "px")});
        }else{
            $("#grid-chart ." + stage).css({"left": (gridWidth * currentX - gridWidthOffset + "px"), "bottom":  (gridWidth * currentY - gridWidthOffset + "px")});
        }
        
    }

    function runDirection(directions) {
        for (let i = 0; i < directions.length; i++) {
            updateLocation(directions[i], facingDirection, currentX, currentY, stepCount);
        }
    }

    //check command against current location
    //if ok to move, update current location
    function updateLocation(direction) {
        if (direction === "move"){
            updateDirection();
            
            stepCount++;
    
            // print on going robot location on map
            if(!reachBoundary){
                appendRobot("change-location", "move-" + stepCount);
             }
        }else if (direction === "left"){
            updateFacingDirection(direction);
        }else if (direction === "right"){
            updateFacingDirection(direction);
        }
    }

    function updateDirection(direction) {
        if (facingDirection === "north" && currentY < gridYLength) {
            currentY++;
            reachBoundary = false;
        }else if (facingDirection === "south" && currentY > 0) {
            currentY--;
            reachBoundary = false;
        }else if (facingDirection === "east" && currentX < gridXLength) {
            currentX++;
            reachBoundary = false;
        }else if (facingDirection === "west" && currentX > 0) {
            currentX--;
            reachBoundary = false;
        }else{
            reachBoundary = true;
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

    


