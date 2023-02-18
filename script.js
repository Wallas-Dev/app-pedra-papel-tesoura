var elementos = document.querySelectorAll('.player-options div > img');
var elementosInimigo = document.querySelectorAll('.enemy-options div > img');
var playerOpt = "";
var playerOptIni = "";
var ptsPlayer = 0;
var ptsRobo = 0;

function resetOpacityPlayer() {
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.opacity = 0.3;
    }
}

function resetOpacityPlayerInimigo() {
    for (var i = 0; i < elementosInimigo.length; i++) {
        elementosInimigo[i].style.opacity = 0.3;
    }
}
function inimigoJogar() {
    let rand = Math.floor(Math.random() * 3);
    resetOpacityPlayerInimigo();
    elementosInimigo[rand].style.opacity = 1;
    let opt = elementosInimigo[rand].getAttribute('optIni');
    return opt;
}

function acerto(player, inimigo) {
    //Possibilidades do player ganhar
    if ((player == 'papel') && (inimigo == 'papel')) {
        return 0;
    } else if ((player == 'papel') && (inimigo == 'pedra')) {
        return 1;
    } else if ((player == 'papel') && (inimigo == 'tesoura')) {
        return 2;

    } else if ((player == 'pedra') && (inimigo == 'papel')) {
        return 2;
    } else if ((player == 'pedra') && (inimigo == 'pedra')) {
        return 0;
    } else if ((player == 'pedra') && (inimigo == 'tesoura')) {
        return 1;

    } else if ((player == 'tesoura') && (inimigo == 'papel')) {
        return 1;
    } else if ((player == 'tesoura') && (inimigo == 'pedra')) {
        return 2;
    } else if ((player == 'tesoura') && (inimigo == 'tesoura')) {
        return 0;
    }

}


function winner(win) {

    let player = document.querySelectorAll('.player .bullet');
    let robo = document.querySelectorAll('.robo .bullet');

    win = parseInt(win);

    if (win == 1) {
        console.log(win + " pts " + ptsPlayer);
        player[ptsPlayer].style.backgroundColor = 'blueviolet';
        ptsPlayer++;
    } else if (win == 2) {
        console.log(win + " pts " + ptsRobo);
        robo[ptsRobo].style.backgroundColor = 'blueviolet';
        ptsRobo++;
    }

    if (ptsPlayer == 2) {
        let cleanTelaPlayer = document.querySelector('.player-options');
        let cleanTelaIni = document.querySelector('.enemy-options');

        cleanTelaPlayer.style.display = 'none';
        cleanTelaIni.style.display = 'none';
        document.querySelector('.winner').innerHTML = `
            <div class="alinhar">
                <h3>Voçê</h3>
                <h3>VENCEU o jogo</h3>
            </div>
            <button name="reiniciar" class="btn-reset">Reiniciar</button>
        `;
        ptsPlayer = 0;
        ptsRobo = 0;

        document.querySelector('button[name=reiniciar]')
            .addEventListener('click', function () {
                document.querySelector('.winner').innerHTML = "";
                for (var i = 0; i < robo.length; i++) {
                    robo[i].style.backgroundColor = '#ccc';
                    player[i].style.backgroundColor = '#ccc';
                }
                cleanTelaPlayer.style.display = 'block';
                cleanTelaIni.style.display = 'block';
                resetOpacityPlayer();
                resetOpacityPlayerInimigo();
            });

    } else if (ptsRobo == 2) {

        let cleanTelaPlayer = document.querySelector('.player-options');
        let cleanTelaIni = document.querySelector('.enemy-options');

        cleanTelaPlayer.style.display = 'none';
        cleanTelaIni.style.display = 'none';

        document.querySelector('.winner').innerHTML = `
            <div class="alinhar">
                <h3>Robô</h3>
                <h3>VENCEU o jogo</h3>
            </div>
            <button name="reiniciar" class="btn-reset">Reiniciar</button> 
        `;
        ptsRobo = 0;
        ptsPlayer = 0;
        document.querySelector('button[name=reiniciar]')
            .addEventListener('click', function () {
                document.querySelector('.winner').innerHTML = "";
                for (var i = 0; i < player.length; i++) {
                    player[i].style.backgroundColor = '#ccc';
                    robo[i].style.backgroundColor = '#ccc';
                }
                cleanTelaPlayer.style.display = 'block';
                cleanTelaIni.style.display = 'block';
                resetOpacityPlayer();
                resetOpacityPlayerInimigo();
            });
    }

}


for (var i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', function (t) {
        resetOpacityPlayer();
        t.target.style.opacity = 1;
        playerOpt = t.target.getAttribute('opt');
        playerOptIni = inimigoJogar();

        winner(acerto(playerOpt, playerOptIni));



    })
}




