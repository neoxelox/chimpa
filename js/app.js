"use strict"

function $(id) {return document.getElementById(id)}
var grid = $('grid');
var max = 60;

window.addEventListener('load', () => {
    
    addCards(max);
    
});

function addCards(num) {
    grid.innerHTML = ' ';

    for(var i = 0; i < num; i++) {
        console.log("Hi");
        grid.innerHTML += `
            <div class="card" id="card">
                <p>0</p>
                <svg class="square" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 160 160" width="160" height="160"><defs><clipPath id="_clipPath_Xay1kkJHnkEU9Qt70UW58jqz0qR7LRpg"><rect width="160" height="160"/></clipPath></defs><g clip-path="url(#_clipPath_Xay1kkJHnkEU9Qt70UW58jqz0qR7LRpg)"><g><g><rect x="0" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="16" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="0" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="32" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="48" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="64" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="80" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="96" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="112" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="0" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="32" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="48" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="64" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="80" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="96" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="112" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="128" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="144" y="144" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g><g><rect x="48" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="16" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="32" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="80" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="64" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="112" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="96" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="0" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/><rect x="144" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="128" y="128" width="16" height="16" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/></g></g></g></svg>
            </div>
        `;
    }
}