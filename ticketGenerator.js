//Max value for white ball
const whiteBallMax = 70;
//Min value for white ball
const whiteBallMin = 1;

//Max number of white balls for lottery
const whiteBallCount = 5;

//Max value for red ball
const redBallMax = 26;
//Min value for red ball
const redBallMin = 1;

const ticketNumber = "";
//Method that generates the random numbers for both the red and white balls
/////////////////////////////////////////////////////////////////////////////////////////////////////
function generateValues(tickets) {
    //Create un-initalized array everytime function is called
    let unsortedWhiteBalls = [];
    //Initialize white ball number to be used for random value
    let whiteBallNumber = 0;
    //Initalize red ball number to be used for random value
    let redBallNumber = 0;

    clearTickets();
    //Generates the number of random drawings based on the number of tickets the user selects (1, 5, 10)
    for(let i = 1; i <= tickets; i++) {

        const ticketNumber = document.createElement("div");
        ticketNumber.setAttribute("class", "ticket-number");
        ticketNumber.innerText = `Ticket ${i}:`;
        document.getElementById("lotto").appendChild(ticketNumber);

        //Create element for additional tickets
        const addTickets = document.createElement("div");

        //Generate an array of unsorted white ball values
        for(let j = 0; j < whiteBallCount; j++) {
            //Draw random value for white ball
            whiteBallNumber = Math.floor(Math.random() * (whiteBallMax - whiteBallMin)) + whiteBallMin; 
            //Check and redraw white ball value if there is a duplicate value
            while(checkDuplicate(whiteBallNumber, unsortedWhiteBalls) == true) {
                whiteBallNumber = Math.floor(Math.random() * (whiteBallMax - whiteBallMin)) + whiteBallMin; 
            };
            unsortedWhiteBalls[j] = whiteBallNumber;
        }
    
        //Sort the unsorted white ball array
        let sortedWhiteBalls = unsortedWhiteBalls.sort(function(a, b){return a - b});

        //Create white ball elements and set and append its attribute to the additional ticket
        for(let j = 0; j < whiteBallCount; j++) {
            const whiteBall = document.createElement("p");
            whiteBall.innerText = sortedWhiteBalls[j];
            whiteBall.setAttribute("class", "white-ball");
            addTickets.appendChild(whiteBall); 
        }

        //Create a red ball element
        const redBall = document.createElement("p");
        //Set the red ball element to its corresponding attribute
        redBall.setAttribute("class", "red-ball");
        //Generate random value for red ball
        redBall.innerText =  Math.floor(Math.random() * (redBallMax - redBallMin)) + redBallMin;
        //Append the values to the red ball elements
        addTickets.appendChild(redBall);
        //Set the additional ticket element to its corresponding attribute
        addTickets.setAttribute("class", "ticket-set");
        //Add the additional ticket (div) element to the lotto element.
        ticketNumber.appendChild(addTickets);

    }
}
/*  Method that checks if there is a duplicate white ball value by comparing the random drawn value 
 *  passed as a parameter with that of every index from the unsortedWhiteBall array. 
 */////////////////////////////////////////////////////////////////////////////////////////////////////
function checkDuplicate(whiteBallNumber, unsortedWhiteBalls) {
    let isDuplicate = false;
    for(let i = 0; i < unsortedWhiteBalls.length; i++) {
        if(whiteBallNumber == unsortedWhiteBalls[i]) {
            isDuplicate = true;
        }
    }
    return isDuplicate;
}
//Method that clears the ticket generator everytime the generate buttons are clicked. 
function clearTickets() {
    const tickets = document.getElementById("lotto");
    tickets.innerHTML = '';
}

/*
 *Method that creates a collection of tickets (size specified by user) and compiles the tickets into 
 *one array consisting of highest probability.
 *
 */
function winningTicket() {
    clearTickets(); 
    
    //Array to hold the set of 5 white balls
    let whiteBallNumbers = [];

    let redBallNumbers = [];

    //The number of white balls that can be chosen 
    const whiteBalls = 70; 

    //Initialize empty array to be used later as a 2D array.
    let lottoTickets = [];
    //How many tickets should be created
    const numOfTickets = 150000;
    //Create the 2D array for the lotto tickets where the size is determined by the 'numOfTickets'
    for(let i = 0; i < numOfTickets; i++) {
        lottoTickets[i] = new Array(5);
    }

    //Create an array with every possible white ball number.
    //This array will be used to compare with each of the lotto ticket's 
    //numbers to see if there is a match found
    for(let i = 1; i <= whiteBalls; i++) {
        whiteBallNumbers[i - 1] = i;
    }

    //Create the white ball numbers for each ticket.
    for (var i = 0; i < lottoTickets.length; i++) {
        redBallNumbers[i] = Math.floor(Math.random() * (redBallMax - redBallMin)) + redBallMin
        for (var j = 0; j < 5; j++) {

            //Draw random value for white ball
            value = Math.floor(Math.random() * (whiteBallMax - whiteBallMin)) + whiteBallMin; 

            //Check and redraw white ball value if there is a duplicate value
            while(checkDuplicate(value, lottoTickets[i]) == true) {
                value = Math.floor(Math.random() * (whiteBallMax - whiteBallMin)) + whiteBallMin; 
            };
            lottoTickets[i][j] = value;
        }
        //Sort the white balls for each ticket array. 
        lottoTickets[i].sort(function(a, b){return a - b});
    } 

    let whiteBallCollection = compileTickets(lottoTickets, whiteBallNumbers);

    let whiteBallList = getUniqueNumbers(whiteBallCollection);
    let whiteBallResult = getResult(whiteBallCollection, whiteBallList);
    let whiteBallChances = getChances(whiteBallResult, numOfTickets);
    let winningWhiteBalls = getWinningWhiteBalls(whiteBallChances, whiteBallList);

    let redBallList = getUniqueNumbers(redBallNumbers);
    let redBallResult = getResult(redBallNumbers, redBallList);
    let redBallChances = getChances(redBallResult, numOfTickets);
    let winningRedBall = getWinningRedBall(redBallChances, redBallList);
    //console.log(redBallNumbers);
    generateTicket(winningWhiteBalls, winningRedBall);

}

function compileTickets(lottoTickets, whiteBallNumbers) {
    //Create an array that puts the all ticket numbers into a single array. 
    let lottoCollection = [];
    for(let t = 0; t < whiteBallNumbers.length; t++) {
        for(let i =0; i < lottoTickets.length; i++) {
            for(let j = 0; j < whiteBallNumbers.length; j++) {
                if(whiteBallNumbers[t] == lottoTickets[i][j]) {
                    lottoCollection.push(whiteBallNumbers[t]);
                }
            }
        }
    }
    return lottoCollection;
}

function getUniqueNumbers(lottoCollection) {
    //Create an array of the ticket numbers that excludes 
    //any duplicates found from the lottoCollection array.
    return [...new Set(lottoCollection.map(item => item))];
}

function getResult(lottoCollection, numbersList) {
    //Initialize an array to be used later as a 2D array to hold the values of each unique number
    //generated from the lotto tickets
    let lottoNumberSet = [];

    //Create an empty 2D array with the size being that of the numbersList array
    for (var i = 0; i < numbersList.length; i++) {
      lottoNumberSet[i] = [];
    }

    //Populate the lotto number set with the values from the lotto collection
    for(let i = 0; i < lottoNumberSet.length; i++) {
        for(let j = 0; j < lottoCollection.length; j++) {
            if(lottoCollection[j] == numbersList[i]) {
                lottoNumberSet[i][j] = lottoCollection[j];
            }
        }
    }
    //Create filtered array of the lottoNumberSet which removes undefined and null values. 
    let numberResult = [];
    for(let i = 0; i < lottoNumberSet.length; i++) {
        numberResult[i] = lottoNumberSet[i].filter(n => n);
    }
    return numberResult;
}

function getChances(result, numOfTickets) {
    let total = [];

    for(let i = 0; i < result.length; i++) {
        total[i] = result[i].length;
    }

    let percentages = total.map(x => (x / numOfTickets) * 100);

    return percentages;
}
//Method that gets the winning white balls based on probability 
function getWinningWhiteBalls(chances, numbersList) {
    //Hold the max chance value
    let max = 0;
    //Hold the associated white ball number of the highest chance
    let number = 0;
    //Hold the index of the chances array
    let index = 0;
    //Hold the array of white balls that have the highest chances of being selected
    let winningTicket = [];  

    //console.log(chances);
    //console.log("Numbers: " + numbersList);

        //Go through 5 times, finding the next highest chance of white ball being selected
        for(let i = 0; i < whiteBallCount; i++) {

            //Hold the white balls that have the same chances of being selected
            let duplicate = [];
            //Get the max value in the chances array
            max = Math.max.apply(null, chances);
            //Get the index of the chances array associated with the max value
            index = chances.indexOf(max);
            //Get the next max chance value
            let value = Math.max.apply(null, chances);

            //console.log("next greatest: " + value);

            //Populate the duplicate array with values with the same chances
            for(let j = 0; j < chances.length; j++) {
                if(value == chances[j]) {
                    duplicate.push(numbersList[j]);
                }
            }

            //console.log("value : " + duplicate);
            
            //If there is more than one white ball value with the same chances, randomly select the ball
            if(duplicate.length > 1) {
                index = Math.floor(Math.random() * duplicate.length);

                //Add the selected white ball value to the white ball winning ticket
                number = duplicate.splice(index, 1);
                winningTicket.push(number);

                //console.log(parseInt(number));
                //console.log(index);
                
                //Remove assoicated chance value from chances array
                chances.splice(numbersList.indexOf(parseInt(number)), 1);

                //Remove the white ball value from the white ball numbers array
                numbersList.splice(numbersList.indexOf(parseInt(number)), 1);
            }
            //If only one max chance was found, simply select that white ball value and add it to the white ball winning ticket
            else {
                winningTicket.push(numbersList.splice(index, 1));
                chances.splice(index, 1);
            }
            //console.log(numbersList.length);
            //winningTicketChance.push(max); //Figure out how to also return the chances for the numbers chosen for the winning ticket
        }

        //Merge into a 1 dimensional array
        let ticket = [].concat(...winningTicket);
        //Return the white ball ticket array 
        return ticket.sort(function(a, b){return a - b});   
}

//Method that puts the winning ticket numbers to the website page
function generateTicket(winningWhiteBalls, winningRedBall) {

    const ticketNumber = document.createElement("div");
    ticketNumber.setAttribute("class", "ticket-number");
    document.getElementById("lotto").appendChild(ticketNumber);

    //Create element for additional tickets
    const addTickets = document.createElement("div");


    //Set winning white ball tickets from parameter to display on page
    for(let j = 0; j < whiteBallCount; j++) {
        const whiteBall = document.createElement("p");
        whiteBall.innerText = winningWhiteBalls[j];
        whiteBall.setAttribute("class", "white-ball");
        addTickets.appendChild(whiteBall); 
    }

    //Create a red ball element
    const redBall = document.createElement("p");
    //Set the red ball element to its corresponding attribute
    redBall.setAttribute("class", "red-ball");
    //Generate random value for red ball
    redBall.innerText =  winningRedBall;
    //Append the values to the red ball elements
    addTickets.appendChild(redBall);

    //Set the additional ticket element to its corresponding attribute
    addTickets.setAttribute("class", "ticket-set");
    //Add the additional ticket (div) element to the lotto element.
    ticketNumber.appendChild(addTickets);
}

function getWinningRedBall(chances, redBalls) {
    //Get the max value in the chances array
    let max = Math.max.apply(null, chances);
    //Get the index of the chances array associated with the max value
    let index = chances.indexOf(max);
    //Get the next max chance value
    let value = Math.max.apply(null, chances);

    //Hold the white balls that have the same chances of being selected
    let duplicate = [];
    
    //Hold the winning red ball value
    let winningRedBall = [];

    
    //Populate the duplicate array with values with the same chances
    for(let j = 0; j < chances.length; j++) {
        if(value == chances[j]) {
            duplicate.push(redBalls[j]);
        }
    }
    //If there is more than one red value with the same chances, randomly select the ball
    if(duplicate.length > 1) {
        index = Math.floor(Math.random() * duplicate.length);

        //Add the selected red ball value to the red ball winning ticket
        winningRedBall.push(duplicate.splice(index, 1));
    }
    //If only one max chance was found, simply select that red ball value and add it to the red ball winning ticket
    else {
        winningRedBall.push(redBalls.splice(index, 1));
    }
    //Merge into a 1 dimensional array
    let ticket = [].concat(...winningRedBall);
    //Return the red ball ticket array 
    return ticket;
}
