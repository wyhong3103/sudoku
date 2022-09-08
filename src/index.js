import './style.css';

const currentMode = [0, 17];
let isInGame = false;
let currentState = {};

const game = (() => {
    const solBoard = [];
    const initBoard = [];
    const userBoard = [];
    let time = 0;

    function shuffle(array){
        let currentIndex = array.length; let  randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // eslint-disable-next-line no-param-reassign
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function solveSudoku(i, j){
        if (solBoard[i][j] !== 0){
            if (j+1 < 9){
                return solveSudoku(i,j+1);
            }
            if (i+1 < 9){
                return solveSudoku(i+1,0);
            }
            return true;
        }

        const available = [];
        for(let k = 0; k < 9; k++){
            available.push(true);
        }

        // row
        for(let k = 0; k < 9; k++){
            if (solBoard[i][k] !== 0){
                available[solBoard[i][k]-1] = false;
            }
        }

        // col
        for(let k = 0; k < 9; k++){
            if (solBoard[k][j] !== 0){
                available[solBoard[k][j]-1] = false;
            }
        }

        // 3x3
        for(let k = 0; k < 3; k++){
            for(let l = 0; l < 3; l++){
                const curVal = solBoard[(Math.floor(i/3)*3)+k][(Math.floor(j/3)*3)+l];
                if (curVal !== 0){
                    available[curVal-1] = false;
                }
            }
        }

        for(let k = 0; k < 9; k++){
            if (available[k] === true){
                solBoard[i][j] = k+1;
                if (j+1 < 9){
                    if (solveSudoku(i,j+1)){
                        return true;
                    }
                    solBoard[i][j] = 0;
                }
                else if (i+1 < 9){
                    if (solveSudoku(i+1,0)){
                        return true;
                    }
                    solBoard[i][j] = 0;
                }
                else return true;
            }
        }
        return false;
    }

    function fillUserBoard(){
        const chosen = [];
        for(let i = 0; i < 81; i++){
            chosen.push(i);
        }
        shuffle(chosen);
        if (currentMode[0] === 0){
            for(let i = 0; i < 17; i++){
                userBoard[Math.floor(chosen[i]/9)][chosen[i] % 9] = solBoard[Math.floor(chosen[i]/9)][chosen[i] % 9];
                initBoard[Math.floor(chosen[i]/9)][chosen[i] % 9] = solBoard[Math.floor(chosen[i]/9)][chosen[i] % 9];
            }
        }else{
            for(let i = 0; i < currentMode[1]; i++){
                userBoard[Math.floor(chosen[i]/9)][chosen[i] % 9] = solBoard[Math.floor(chosen[i]/9)][chosen[i] % 9];
                initBoard[Math.floor(chosen[i]/9)][chosen[i] % 9] = solBoard[Math.floor(chosen[i]/9)][chosen[i] % 9];
            }
        }
    }

    function genBoard(){
        for(let i = 0; i < 9; i++){
            const temp = [];
            for(let j = 0; j < 9; j++){
                temp.push(0);
            }
            solBoard.push(temp);
        }
        for(let i = 0; i < 9; i++){
            const temp = [];
            for(let j = 0; j < 9; j++){
                temp.push(0);
            }
            userBoard.push(temp);
        }
        for(let i = 0; i < 9; i++){
            const temp = [];
            for(let j = 0; j < 9; j++){
                temp.push(0);
            }
            initBoard.push(temp);
        }

        const temp = [];
        for(let i = 1; i <= 9; i++){
            temp.push(i);
        }

        for(let i = 0; i < 3; i++){
            shuffle(temp);
            for(let j = 0; j < 3; j++){
                for(let k = 0; k < 3; k++){
                    solBoard[j+(i*3)][k+(i*3)] = temp[(j*3) + k];
                }
            }
        }

        solveSudoku(0,0);
        fillUserBoard();
    }

    function addTime(){
        time += 1;
    }
    function getTime(){
        return time;
    }

    function getUserBoard(){
        return userBoard;
    }

    return {
        addTime,
        getTime,
        genBoard,
        getUserBoard
    }
});


const view = (() => { 
    const content = document.querySelector("#content");

    function initMenu(){
        content.innerHTML = "";
        const menu = document.createElement("div");
        menu.classList.add("init-menu");

        const usernameForm = document.createElement("div");
        usernameForm.classList.add("username-form");

        const label = document.createElement("label");
        label.setAttribute("for","username-inp");
        label.textContent = "Hello stranger, how should I address you?";

        const inp = document.createElement("input");
        inp.id = "username-inp";
        inp.type = "text";
        inp.setAttribute('required', '');
        inp.minLength = '6';
        inp.maxLength = '30';

        const btn = document.createElement("button") ;
        btn.classList.add("proceed-btn");
        btn.classList.add("big-button");
        btn.textContent = "PROCEED";


        usernameForm.appendChild(label);
        usernameForm.appendChild(inp);
        usernameForm.appendChild(btn);

        menu.appendChild(usernameForm);

        content.appendChild(menu);
    }

    function setMode(){
        const modeBtn = document.querySelector(".mode-btn");
        modeBtn.textContent = `Mode : ${currentMode[0] === 0 ? "Standard" : `Custom - ${currentMode[1]}`}`;
        modeBtn.id = `${currentMode[0] === 0 ? "standard" : "custom"}`;
    }

    function mainMenu(){
        content.innerHTML = "";
        const mainContainer = document.createElement("div");
        mainContainer.classList.add("main-menu");

        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "Sudoku";

        const modeBtn = document.createElement("button");
        modeBtn.classList.add("mode-btn");
        modeBtn.classList.add("big-button");

        const startBtn = document.createElement("button");
        startBtn.classList.add("start-btn");
        startBtn.classList.add("big-button");
        startBtn.textContent = "Start";

        mainContainer.appendChild(title);
        mainContainer.appendChild(modeBtn);
        mainContainer.appendChild(startBtn);
        content.appendChild(mainContainer);
        
        // Set current mode
        setMode();
    }
    function hideBg(){
        const bg = document.createElement("div");
        bg.classList.add("hide-bg");
        content.appendChild(bg);
    }

    function modePopUp(){
        const container = document.createElement("div");
        container.classList.add("mode-pop-up-container");

        const popUp = document.createElement("div");
        popUp.classList.add("mode-pop-up");

        const title = document.createElement("h1");
        title.textContent = "Mode";

        const standardContainer = document.createElement("div");
        standardContainer.classList.add("standard-text");
        const standardTitle = document.createElement("h3");
        standardTitle.textContent = "Standard";
        const standardPara = document.createElement("p");
        standardPara.textContent = "In a standard sudoku puzzle, you will be given 17 clues to aid you in the puzzle.";
        standardContainer.appendChild(standardTitle);
        standardContainer.appendChild(standardPara);

        const customContainer = document.createElement("div");
        customContainer.classList.add("custom-text");
        const customLeft = document.createElement("div");
        customLeft.classList.add("custom-text-left");
        const customTitle = document.createElement("h3");
        customTitle.textContent = "Custom";
        const customPara = document.createElement("p");
        customPara.textContent = "In a custom sudoku puzzle, you can set the clues given at the beginning to any number.";
        customLeft.appendChild(customTitle);
        customLeft.appendChild(customPara);
        
        const customRight = document.createElement("div");
        customRight.classList.add("custom-text-right");
        const rangeSlider = document.createElement("input");
        rangeSlider.type = "range";
        rangeSlider.id = "clues";
        rangeSlider.min = "0";
        rangeSlider.max = "80";
        rangeSlider.step = "1";
        rangeSlider.value = `${currentMode[1]}`;

        
        const rangeValue = document.createElement("p");
        rangeValue.textContent = `${rangeSlider.value} clues`;

        
        customRight.appendChild(rangeSlider);
        customRight.appendChild(rangeValue);

        customContainer.appendChild(customLeft);
        customContainer.appendChild(customRight);

        popUp.appendChild(title);
        popUp.appendChild(standardContainer);
        popUp.appendChild(customContainer);

        container.appendChild(popUp);
        content.appendChild(container);
    }

    function choicePopUp(){
        const choicePopUpContainer = document.createElement("div");
        choicePopUpContainer.classList.add("choice-popup-container");
        const choicePopUpDiv = document.createElement("div");
        choicePopUpDiv.classList.add("choice-popup")
        choicePopUpContainer.appendChild(choicePopUpDiv);

        const choiceContainer = document.createElement("div");
        choiceContainer.classList.add("choice-container");
        for(let i = 0; i < 9; i++){
            const choice = document.createElement("div");
            choice.classList.add("choice");
            choice.classList.add("active");
            choice.textContent = i+1;
            choiceContainer.appendChild(choice);
        }
        choicePopUpDiv.appendChild(choiceContainer);

        const unsetBtn = document.createElement("div");
        unsetBtn.textContent = "UNSET";
        unsetBtn.classList.add("unset-btn");
        choicePopUpDiv.appendChild(unsetBtn);
        content.appendChild(choicePopUpContainer);
    }
    

    function gameInterface(){
        content.innerHTML = "";
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");

        const gameTitle = document.createElement("h1");
        gameTitle.classList.add("game-title");
        gameTitle.textContent = "Sudoku";

        const gameOption = document.createElement("div");
        gameOption.classList.add("game-options");

        const timeContainer = document.createElement("div");
        timeContainer.classList.add("time");
        const timeText = document.createElement("h4");
        timeText.textContent = "Elapsed Time :";
        const curTime = document.createElement("h4");
        curTime.classList.add("cur-time");
        curTime.textContent = (isInGame === true ?`${Math.floor(currentState.getTime()/60)}m ${currentState.getTime()%60}s`: "0m 0s");

        timeContainer.appendChild(timeText);
        timeContainer.appendChild(curTime);
        const btns = [];
        for(let i = 0; i < 4; i++){
            btns.push(document.createElement("button"));
            btns[i].classList.add("big-button");
        }

        btns[0].classList.add("hint-btn");
        btns[0].textContent = "Hint";

        btns[1].classList.add("ans-btn");
        btns[1].textContent = "Reveal Solution";

        btns[2].classList.add("restart-btn");
        btns[2].textContent = "Restart";

        btns[3].classList.add("exit-btn");
        btns[3].textContent = "Exit";
        btns[3].id = "exit";

        gameOption.appendChild(timeContainer);
        for(let i = 0; i < 4; i++){
            gameOption.appendChild(btns[i]);
        }
        
        const gameBoardContainer = document.createElement("div");
        gameBoardContainer.classList.add("game-board-container");
        const gameBoard = document.createElement("div");
        gameBoard.classList.add("game-board");
        gameBoardContainer.appendChild(gameBoard);

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                const cell = document.createElement("div");
                cell.classList.add("cell");
                if (Math.floor(i/3) % 2 === 1 && Math.floor(j/3) % 2 === 0 || (Math.floor(i/3) % 2 === 0 && Math.floor(j/3) % 2 === 1)){
                    cell.classList.add("cell_b");
                }else cell.classList.add("cell_a");
                cell.classList.add("user-cell");
                const p = document.createElement("p");
                cell.appendChild(p);


                gameBoard.appendChild(cell);
            }
        }
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(gameOption);
        gameContainer.appendChild(gameBoardContainer);
        content.appendChild(gameContainer);
    }


    return {
        hideBg,
        initMenu,
        mainMenu,
        modePopUp,
        choicePopUp,
        gameInterface,
        setMode
    };
})();

const controller = (() => {
    function removeLastChild(){
        const content = document.querySelector("#content");
        content.removeChild(content.lastChild);
    }

    function setInitMenu(){
        const proceedBtn = document.querySelector(".proceed-btn");
        proceedBtn.addEventListener("click", ()=>{
            function switchTo(){
                view.mainMenu();
                setMainMenu();
            }
            setTimeout(switchTo,175);
        });
    }

    function setMainMenu(){
        const modeBtn = document.querySelector(".mode-btn");
        modeBtn.addEventListener("click", () =>{
            const showPopUp = () => {
                view.hideBg();
                view.modePopUp();
                setModePopUp();
            };
            setTimeout(showPopUp, 175);
        });
        const startBtn = document.querySelector(".start-btn");
        startBtn.addEventListener("click", () => {
            function switchTo(){
                view.gameInterface();
                setGameInterface();
            }
            setTimeout(switchTo, 175);
        });
    }

    function setModePopUp(){
        const rangeSlider = document.querySelector(".custom-text-right input");
        rangeSlider.addEventListener("input", () => {
            const rangeVal = document.querySelector(".custom-text-right p");
            const rangeSli = document.querySelector(".custom-text-right input");
            rangeVal.textContent = `${rangeSli.value} clues`;
            currentMode[1] = rangeSli.value;
        });

        const standardContainer = document.querySelector(".standard-text");
        standardContainer.addEventListener("click", () => {
            currentMode[0] = 0;
            view.setMode();
            removeLastChild();
            removeLastChild();
        });

        const customLeft = document.querySelector(".custom-text-left");
        customLeft.addEventListener("click", () => {
            currentMode[0] = 1;
            view.setMode();
            removeLastChild();
            removeLastChild();
        });
    }

    function setChoicePopUp(){
        const choices = document.querySelectorAll(".choice");
        

        choices.forEach(item => {
            item.addEventListener("click", ()=>{
                removeLastChild();
                removeLastChild();
            })
        });
        const unsetBtn = document.querySelector(".unset-btn");
        unsetBtn.addEventListener("click", ()=>{
                removeLastChild();
                removeLastChild();
        })
    }
    
    function fillBoard(){
        const userBoard = currentState.getUserBoard();
        const cells = document.querySelectorAll(".cell");
        for(let i = 0; i < 81; i++){
            if (userBoard[Math.floor(i/9)][i%9] !== 0){
                const tempNode = cells[i].cloneNode(true);
                tempNode.firstChild.textContent = `${userBoard[Math.floor(i/9)][i%9]}`;
                tempNode.classList.remove("user-cell");
                tempNode.classList.add("preloaded-cell");
                cells[i].parentNode.replaceChild(tempNode, cells[i]);
            }
        }
    }

    function setGameInterface(){
        const cells = document.querySelectorAll(".cell");

        cells.forEach(cell => {
            cell.addEventListener("click", ()=>{
                function showPopUp(){
                    view.hideBg();
                    view.choicePopUp();
                    setChoicePopUp();
                };
                setTimeout(showPopUp, 175);
            })
        });

        if (isInGame === false){
            isInGame = true;
            currentState = game();
            currentState.genBoard();
            fillBoard();
        }

        const curTime = document.querySelector(".cur-time")
        const timer = window.setInterval(()=>{
            currentState.addTime();
            curTime.textContent = `${Math.floor(currentState.getTime()/60)}m ${currentState.getTime()%60}s`;
        }, 1000);

        const exitBtn = document.querySelector("#exit");
        exitBtn.addEventListener("click", () => {
            function switchTo(){
                currentState = {};
                isInGame = false;
                clearInterval(timer);
                view.mainMenu();
                setMainMenu();
            }
            setTimeout(switchTo, 175);
        });
        

    }

    function init(){
        view.initMenu();
        setInitMenu();
    }    

    return {
        init
    };
})();

controller.init();