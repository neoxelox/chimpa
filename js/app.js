"use strict"

function $(id) {return document.getElementById(id)}
var gridElement = $('grid');
var scoreboardElement = $('scoreboard');
var showcards_btnElement = $('showcards_btn');
var retry_btnElement = $('retry_btn');
var grid = [];
var nShuffle = [];
var sNumbers = [];
var playable = false;

// Settings (constant! using 'var' for compatibility)
var rows = 5;           // responsive scalar
var cols = 9;           // responsive scalar
var timeout = 1;        // if 0 no timeout
var numbers = 9;        // min 1 max rows*cols
var lifes = 1;          // if 0 no lifes
var language = 'es';
// --------
var misses = 0;
var hits = 0;
var total_time = {
    start: 0,
    end: 0,
    inspection_time: {
        start: 0,
        end: 0
    }
};


window.addEventListener('load', () => {
    initLang(language);
    initCards(rows, cols);
    shuffleCards(rows, cols);
    restart();
});


showcards_btnElement.addEventListener('click', () => {

    var toggle = scoreboardElement.classList.contains('score-opaque');

    for(var i = 0; i < sNumbers.length; i++) {
        var i_index = Math.floor((sNumbers[i]-1)/cols);
        var j_index = sNumbers[i] - i_index*cols - 1;
        grid[i_index][j_index].element.lastElementChild.classList.remove((toggle ? 'visible' : 'hidden'));
        grid[i_index][j_index].element.lastElementChild.classList.add((toggle ? 'hidden' : 'visible'));
    }
 
    scoreboardElement.classList.remove((toggle ? 'score-opaque' : 'score-transparent'));
    scoreboardElement.classList.add((toggle ? 'score-transparent' : 'score-opaque'));
});

retry_btnElement.addEventListener('click', () => {
    restart();
});

function cardClick() {
    if(playable) {
        if(hits + misses === 0) total_time.inspection_time.end = new Date();
        if(this.dataset.number == sNumbers[sNumbers.length-1]) {
            if(this.lastElementChild.classList[0] === 'hidden') {
                for(var i = 0; i < sNumbers.length; i++) {
                    var i_index = Math.floor((sNumbers[i]-1)/cols);
                    var j_index = sNumbers[i] - i_index*cols - 1;
                    grid[i_index][j_index].element.lastElementChild.classList.remove('hidden');
                    grid[i_index][j_index].element.lastElementChild.classList.add('visible');
                }
                this.lastElementChild.classList.remove('visible');
                this.lastElementChild.classList.add('hidden');
            } else {
                this.lastElementChild.classList.remove('visible');
                this.lastElementChild.classList.add('hidden');
            }
            sNumbers.pop();
            hits++;
            if(sNumbers.length === 0) won();
    
        } else lost();
    } else {
        // Do something
    }
}

function restart() {
    
    misses = 0;
    hits = 0;

    scoreboardElement.classList.remove('score-visible');
    scoreboardElement.classList.add('score-hidden');
    scoreboardElement.classList.remove('score-transparent');
    scoreboardElement.classList.add('score-opaque');

    shuffleCards(rows, cols);

    playable = true;
    total_time.start = new Date();
    total_time.inspection_time.start = total_time.start;
}

function won() {
    total_time.end = new Date();
    console.log('win');

    playable = false;
    showScoreboard(true);
}

function lost() {
    console.log('miss');
    misses++;

    if(!(playable = misses < lifes)) {
        total_time.end = new Date();
        showScoreboard(false);
    }
}

function showScoreboard(pass) {
    var texts = document.getElementsByClassName('txt-compound');
    var values = document.getElementsByClassName('value');
    var ind = (pass ? 0 : 1);
    try {
        for(var i = 0; i < texts.length; i++) {
            switch (texts[i].dataset.txt) {
                case 'SCOREBOARD_TITLE':
                        texts[i].classList.remove((pass ? 'game-fail' : 'game-pass'));
                        texts[i].classList.add((pass ? 'game-pass' : 'game-fail'));
                    break;
                default:
                    break;
            }
            texts[i].innerText = languages[language][texts[i].dataset.txt][ind];
            texts[i].value = languages[language][texts[i].dataset.txt][ind];
        }

        for(var i = 0; i < values.length; i++) {
            switch (values[i].dataset.value) {
                case 'TOTAL_CLICKS':
                    values[i].innerText = hits+misses;
                    values[i].value = hits+misses;
                    break;
                case 'HITS':
                    values[i].innerText = `${hits} (${((hits/(hits+misses))*100).toFixed(2)}%)`;
                    values[i].value = `${hits} (${((hits/(hits+misses))*100).toFixed(2)}%)`;
                    break;
                case 'MISSES':
                    values[i].innerText = `${misses} (${((misses/(hits+misses))*100).toFixed(2)}%)`;
                    values[i].value = `${misses} (${((misses/(hits+misses))*100).toFixed(2)}%)`;
                    break;
                case 'TOTAL_TIME':
                    values[i].innerText = `${(total_time.end - total_time.start)/1000} s`;
                    values[i].value =  `${(total_time.end - total_time.start)/1000} s`;
                    break;
                case 'INSPECTION_TIME':
                    values[i].innerText =  `${(total_time.inspection_time.end - total_time.inspection_time.start)/1000} s`;
                    values[i].value =  `${(total_time.inspection_time.end - total_time.inspection_time.start)/1000} s`;
                    break;
                case 'SOLVING_TIME':
                    values[i].innerText = `${((total_time.end - total_time.start)-(total_time.inspection_time.end - total_time.inspection_time.start))/1000} s`;
                    values[i].value = `${((total_time.end - total_time.start)-(total_time.inspection_time.end - total_time.inspection_time.start))/1000} s`;
                    break;
                default:
                    break;
            }
        }
    } catch (error) {
       console.error(error); 
    }
    
    scoreboardElement.classList.remove('score-hidden');
    scoreboardElement.classList.add('score-visible');
}

function shuffleCards(rows, cols) {
    if(numbers > 0 && numbers <= rows*cols) {
        nShuffle = shuffleArray(nShuffle);
        sNumbers = nShuffle.slice(0,numbers);
    } else {
        // Error! Do Something!
        console.error('Numbers passes min/max value!');
    }

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            var n = sNumbers.indexOf(i*cols + j + 1);
            if(n != -1) {
                grid[i][j].hasNumber = true;
                grid[i][j].element.firstElementChild.innerText = sNumbers.length - n;
                grid[i][j].element.lastElementChild.classList.remove('visible');
                grid[i][j].element.lastElementChild.classList.add('hidden');
                // --
            } else {
                grid[i][j].hasNumber = false;
                grid[i][j].element.firstElementChild.innerText = '';
                grid[i][j].element.lastElementChild.classList.remove('hidden');
                grid[i][j].element.lastElementChild.classList.add('visible');
            }
        }
    }

}

function initCards(rows, cols) {
    gridElement.innerHTML = ' ';

    for(var i = 0; i < rows; i++) {
        grid[i] = [];
        for(var j = 0; j < cols; j++) {
            nShuffle.push(i*cols + j + 1);
            var card = {};
            card.hasNumber = false;
            card.element = document.createElement('div');
            card.element.classList.add('card');
            card.element.addEventListener('click', cardClick);
            card.element.setAttribute('data-number', i*cols + j + 1);

            card.element.innerHTML += `
                <p>${i*cols + j + 1}</p>
                <svg class="visible" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 160 160" width="160" height="160"><defs><clipPath id="_clipPath_Xay1kkJHnkEU9Qt70UW58jqz0qR7LRpg"><rect width="160" height="160"/></clipPath></defs><g clip-path="url(#_clipPath_Xay1kkJHnkEU9Qt70UW58jqz0qR7LRpg)"><g><g><rect x="0" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g></g></g></svg>`;

            gridElement.appendChild(card.element);
            grid[i][j] = card;
        }
    }
}

function shuffleArray(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function initLang(language) {
    var texts = document.getElementsByClassName('txt');
    try {
        for(var i = 0; i < texts.length; i++) {
            texts[i].innerText = languages[language][texts[i].dataset.txt];
            texts[i].value = languages[language][texts[i].dataset.txt];
        }
    } catch (error) {
       console.error(error); 
    }
}