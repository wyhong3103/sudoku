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

    
    function init(){
        initMenu();
    }

    return {
        init
    };
})();

displayController.init();