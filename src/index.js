import './style.css';

const currentMode = [0, 17];

const displayController = (() => { 
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

        btn.addEventListener("click", ()=>{
            setTimeout(mainMenu,175);
        });

        usernameForm.appendChild(label);
        usernameForm.appendChild(inp);
        usernameForm.appendChild(btn);

        menu.appendChild(usernameForm);

        content.appendChild(menu);
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
        modeBtn.textContent = `Mode : ${(currentMode[0] === 0 ? "Standard" : `Custom - ${currentMode[1]}`)}`;
        modeBtn.id = `${(currentMode[0] === 0 ? "standard" : "custom")}`;;
        modeBtn.addEventListener("click", () =>{
            const showPopUp = () => {
                hideBg();
                modePopUp();
            };
            setTimeout(showPopUp, 175);
        });

        const startBtn = document.createElement("button");
        startBtn.classList.add("start-btn");
        startBtn.classList.add("big-button");
        startBtn.textContent = "Start";
        startBtn.addEventListener("click", () => {
            setTimeout(gameInterface, 175);
        });

        mainContainer.appendChild(title);
        mainContainer.appendChild(modeBtn);
        mainContainer.appendChild(startBtn);
        content.appendChild(mainContainer);
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

        rangeSlider.addEventListener("input", () => {
            const rangeVal = document.querySelector(".custom-text-right p");
            const rangeSli = document.querySelector(".custom-text-right input");
            rangeVal.textContent = `${rangeSli.value} clues`;
            currentMode[1] = rangeSli.value;
        });

        standardContainer.addEventListener("click", () => {
            currentMode[0] = 0;
            mainMenu();
        });
        customLeft.addEventListener("click", () => {
            currentMode[0] = 1;
            mainMenu();
        });
        
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

    function gameInterface(){
        console.log("hi");
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
        curTime.textContent = "0";

        timeContainer.appendChild(timeText);
        timeContainer.appendChild(curTime);
        const btns = [];
        for(let i = 0; i < 4; i++){
            btns.push(document.createElement("button"));
            btns[i].classList.add("big-button");
            btns[i]
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
        btns[3].addEventListener("click", () => {
            setTimeout(mainMenu, 175);
        });

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
    
    function init(){
        initMenu();
    }

    return {
        init
    };
})();

displayController.init();