$(function () {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    let gameNineWon = false;
    let gameTwentyFiveWon = false;
    let goalNine = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let currentNine = [];
    let goalFive = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let currentFive = [];
    let currTiles = [];
    let goalTiles = [];
    let currFiveTiles = [];
    let testing = false;



    let input = document.getElementById('input');
    let image = document.getElementById('testimg');

if(!gameNineWon)  makeNine('./assets/images/asteroid_basic.png');
else(makeTwentyFive);


    function makeTwentyFive(src) {
        let j = 0;
        for (let i = 0; i < 25; i++) {
            let xShift = (750 - (150 * (i % 5))).toString();
            let yShift = (750 - (150 * j)).toString();
            if (i === 4 || i === 9 || i === 14 || i === 19) { j++ };
            let tile = $("<div class='tile5'>").css("background-image", "url(" + src + ") ").css("background-position", xShift + 'px' + ' ' + yShift + 'px').html('&nbsp').css('color', 'white').attr('id', 'tile' + i);
            if (i === 20) { tile.css("background-image", "none").attr("class", "tile5 empty"); }
            $("#tile-frame").append(tile);
        }

        let inversionCount = 1;
        while (inversionCount % 2 != 0) {
            inversionCount = 0;
            currentFive = [];
            shuffle(goalFive).map((item) => currentFive.push(item));
            goalFive.sort((a, b) => a - b);
            for (let i = 0; i < currentFive.length; i++) {
                for (let j = i + 1; j < currentFive.length; j++) {
                    if (currentFive[i] > currentFive[j] && currentFive[i] != 20 && currentFive[j] != 20) {
                        inversionCount++;
                    }
                }
            }

        }
        $("#img-frame").empty();
        for (let i = 0; i < currentFive.length; i++) {
            let idStr = '#tile' + currentFive[i];
            let tile = $(idStr);
            // console.log(tile);
            currFiveTiles.push(tile);
        }
        currFiveTiles.map((item) => {
            $("#img-frame").append(item);
        })

        $(".tile5").on('click', tileFiveClickHandler);


    }
    function makeNine(src) {
        // console.log('in makenine function');
        let j = 0;
        for (let i = 0; i < 9; i++) {

            let xShift = (750 - (250 * (i % 3))).toString();
            let yShift = (750 - (250 * j)).toString();
            // console.log(xShift, yShift);
            if (i === 2 || i === 5) { j++ };
            let tile = $("<div class='tile9'>").css("background-image", "url(" + src + ") ").css("background-position", xShift + 'px' + ' ' + yShift + 'px').html('&nbsp').css('color', 'white').attr('id', 'tile' + i);
            if (i == 6 && j === 2) {
                tile.css("background-image", "none").attr("class", "tile9 empty");
            }
            goalTiles.push(tile);
            $("#tile-frame").append(tile);

        }


        let inversionCount = 1;
        while (inversionCount % 2 != 0) {
            inversionCount = 0;
            currentNine = [];
            shuffle(goalNine).map((item) => currentNine.push(item));
            goalNine = [0, 1, 2, 3, 4, 5, 6, 7, 8];

            goalNine.sort((a, b) => a - b);
            for (let i = 0; i < currentNine.length - 1; i++) {
                for (let j = i + 1; j < currentNine.length; j++) {
                    if (currentNine[i] > currentNine[j] && currentNine[i] != 6 && currentNine[j] != 6) {
                        inversionCount++;
                    }
                }
            }

        }
        // console.log( goalNine);
        $("#img-frame").empty();
        for (let i = 0; i < currentNine.length; i++) {
            let idStr = '#tile' + currentNine[i];
            let tile = $(idStr);
            // console.log(tile);
            currTiles.push(tile);
        }
        currTiles.map((item) => {
            $("#img-frame").append(item);
        })

        $(".tile9").on('click', tileClickHandler);
    }

    function adjacentCheck(numstr) {
        numstr.replace('tile', '');
        let num = parseInt(numstr[numstr.length - 1]);
        // console.log(num);
        // console.log(currentNine);
        let numIndex = currentNine.indexOf(num);
        // console.log(numIndex);
        let emptyDiv = $(".empty").attr("id");
        //    console.log(emptyDiv);
        let emptyIndex = currentNine.indexOf((parseInt(emptyDiv[emptyDiv.length - 1])));
        //    console.log(emptyIndex);
        if (numIndex === emptyIndex) {
            return false;
        }
        let adjacent = isAdjacent(emptyIndex, numIndex, currentNine.length);
        // console.log(adjacent);
        return adjacent;

    }
    function adjacentCheckFive(numstr) {
        numstr.replace('tile', '');
        let num = parseInt(numstr.split("e")[1]);
        let numIndex = currentFive.indexOf(num);
        let emptyDiv = $(".empty").attr("id");
        let emptyIndex = currentFive.indexOf((parseInt(emptyDiv.split('e')[1])));
        if (numIndex === emptyIndex) {
            return false;
        }
        let adjacent = isAdjacent(emptyIndex, numIndex, currentFive.length);
        // console.log(adjacent);
        return adjacent;
    }
    function isAdjacent(emptyIndex, clickedIndex, arrLen) {
        let rowLen = Math.sqrt(arrLen);
        let emptyRowNumber = Math.floor(emptyIndex / rowLen);
        let clickedRowNumber = Math.floor(clickedIndex / rowLen);
        if (emptyRowNumber === clickedRowNumber && Math.abs(emptyIndex - clickedIndex) <= 1) {

            return true;
        }
        if (emptyRowNumber != clickedRowNumber && Math.abs(emptyRowNumber - clickedRowNumber) == 1) {
            let emptyRowIndex = emptyIndex % rowLen;
            let clickedRowIndex = clickedIndex % rowLen;
            if (emptyRowIndex === clickedRowIndex) {
                return true;
            }
        }
        return false;
    }

    function tileFiveClickHandler() {
        let id = $(this).attr("id");
        let isAdjacent = adjacentCheckFive(id);;
        if (isAdjacent) {
            let emptyDiv = $(".empty");
            let emptyDivId = $(".empty").attr("id");
            let currentDiv = $(this);
            let currentDivId = $(this).attr("id");
            let currIdStr = $(this).attr("id");
            let currentDivIndex = currentFive.indexOf(parseInt(currIdStr.split('e')[1]));
            let emptyDivIndex = currentFive.indexOf(parseInt(emptyDivId.split('e')[1]));
            let currentDivNum = parseInt(currIdStr.split('e')[1]);
            let emptyDivNum = parseInt(emptyDivId.split('e')[1]);

            //instead of replacewith, just change the offset of the background image to match.
            let backgroundURL = currentDiv.css("background-image");
            let backgroundOffset = currentDiv.css("background-position");
            emptyDiv.css("background-image", backgroundURL).removeClass("empty").css("background-position", backgroundOffset).attr("id", currentDivId);
            currentDiv.css("background-image", "none").addClass("empty").attr("id", emptyDivId);
            currentFive[emptyDivIndex] = currentDivNum;
            currentFive[currentDivIndex] = emptyDivNum;
            let wonGame = gameCheckFive();
            if(wonGame){
                // console.log('game won');
                gameTwentyFiveWon = true;
                partTwoEnd();
            }

        }

    }
    function tileClickHandler() {
        let id = $(this).attr("id");
        let isAdjacent = adjacentCheck(id);
        if (isAdjacent) {
            let emptyDiv = $(".empty");
            let emptyDivId = $(".empty").attr("id");
            let currentDiv = $(this);
            let currentDivId = $(this).attr("id");
            let currIdStr = $(this).attr("id");
            let currentDivIndex = currentNine.indexOf(parseInt(currIdStr[currIdStr.length - 1]));
            let emptyDivIndex = currentNine.indexOf((parseInt(emptyDivId[emptyDivId.length - 1])));
            let currentDivNum = parseInt(currIdStr[currIdStr.length - 1]);
            let emptyDivNum = parseInt(emptyDivId[emptyDivId.length - 1]);

            //instead of replacewith, just change the offset of the background image to match.
            let backgroundURL = currentDiv.css("background-image");
            let backgroundOffset = currentDiv.css("background-position");
            emptyDiv.css("background-image", backgroundURL).removeClass("empty").css("background-position", backgroundOffset).attr("id", currentDivId);
            currentDiv.css("background-image", "none").addClass("empty").attr("id", emptyDivId);
            currentNine[emptyDivIndex] = currentDivNum;
            currentNine[currentDivIndex] = emptyDivNum;
            let wonGame = gameCheck();
            if (wonGame) {
                gameReset();
            }
        } else {
            // console.log($("not adjacent"));
        }
    }
    function gameCheck() {
        // gameNineWon = true;
        for (let i = 0; i < currentNine.length; i++) {
            if(testing) return true;
            if (currentNine[i] != goalNine[i]) {
                //change back to return false when done checking second game
                return false;
            }
        }
        //uncomment gameninewin here and remove earlier change to gamenine in function
        gameNineWon = true;
        return true;
    }
    function gameCheckFive(){
        if(testing) return true;
        for( let i=0;i<currentFive.length; i++){
            if(currentFive[i] != goalFive[i]){
                return false
            }
        }
        return true;
    }
    function gameReset() {
        $("#img-frame").empty();
        currentNine = [];
        goalNine = [];
        $('#game-win').css('display', 'inline-block');
        $('.close-btn').on('click', ()=>{
            // document.location = document.location;
            $('#main-banner').text('A second, more intricate design.')
            $('#tile-frame').empty();
            $('#game-win').hide();
            makeTwentyFive('./assets/images/originator_throughway.jpg');
        })

    }
    function partTwoEnd(){
        $('#popup-header').text(`Once more the interior components of the artifact fit into place. This section of the artifact depresses and pulls away.`);
        $('.close-btn').hide();
        $('#main-banner').text('An empty repository. Barren, hollow.');
        $("#popup-additional").html('Unfortunately there is nothing obvious in the space within. You may want to <u>Console</u> yourselves with getting out alive. Perhaps <u>log</u> it as a good effort for the next (browser) inspector or artifact specialist.');
        console.log('The search deepens.')
        $("#img-frame").empty();
        $('#tile-frame').empty();
        $('#game-win').show();
        const unspaceEgg = {
            hint: 'Nintendo base before Gamecube',
            code: `NDAxNzA4NTI3MDgwMjQyODM4MS9zdXRhdHMvZWNhcHNuVWZvZXlFL21vYy54Ly86c3B0dGg=`
        }
        console.log(unspaceEgg);
    }

})

