const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const textdisplay = document.querySelector('.win h1')
let currentshooterindex = 250
const img = document.createElement('img')
let width = 15
let direction = 1
let goinigright = true
let aliensRemoved = []
let text 
let result =0 



for(let i=0;i<305;i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders=[
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader")
        }
    }
}
draw()

squares[currentshooterindex].classList.add('shooter')

function remove (){
    for(let i=0; i< alienInvaders.length;i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}



function moveShooter(e) {
    squares[currentshooterindex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft' :
            if(currentshooterindex % width !== 0) currentshooterindex-=1
            break
        case 'ArrowRight' :
            if(currentshooterindex % width < width-1) currentshooterindex+=1
            break
    }
    squares[currentshooterindex].classList.add('shooter')
}

document.addEventListener('keydown',moveShooter)

function moveinvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length -1]% width === width-1
    remove()

    if (rightEdge && goinigright) {
        for(let i =0 ; i<alienInvaders.length; i++){
            alienInvaders[i] += width+1
            direction = -1
            goinigright = false
        }
    }

    if (leftEdge && !goinigright) {
        for(let i =0 ; i<alienInvaders.length; i++){
            alienInvaders[i] += width-1
            direction = 1
            goinigright = true
        }
    }

    for (let i = 0 ; i<alienInvaders.length; i++){
        alienInvaders[i] += direction
    }

    draw()

    if(squares[currentshooterindex].classList.contains('invader','shooter')) {
        textdisplay.innerHTML= 'Game Over Your Score is ' + result
        console.log('game over')
        clearInterval(invadersId)
    }

    for(let i ; i<alienInvaders.length;i++){
        if(alienInvaders[i] > (squares.length))
            textdisplay.innerHTML='game over'
            clearInterval(invadersId)
    }
    if(aliensRemoved.length === alienInvaders.length) {
        textdisplay.innerHTML='you win'
        clearInterval(alienInvaders)
    }
}

invadersId = setInterval(moveinvaders, 100)

function shoot(e){
    let laserId
    let currentLaserIndex = currentshooterindex

    function movelaser(){
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex-= width
        squares[currentLaserIndex].classList.add('laser')
        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            result ++
            resultDisplay.innerHTML = result
            console.log(aliensRemoved)
        }
        
    }
    switch(e.key) {
        case 'ArrowUp' :
            laserId = setInterval(movelaser, 100 )
    }
}


document.addEventListener("keydown", shoot)