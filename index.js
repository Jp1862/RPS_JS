const ROCK = { toString: () => "Rock", beats: (other) => other === SCISSORS }
const PAPER = { toString: () => "Paper", beats: (other) => other === ROCK }
const SCISSORS = { toString: () => "Scissors", beats: (other) => other === PAPER }

const MOVES = [ROCK, PAPER, SCISSORS]

const computerPlayer = {
    chooseMove: () => {
        return MOVES[Math.floor(Math.random() * MOVES.length)]
    }
}
function playGame(player1, player2) {
    let winner
    while (!winner) {
        const player1Move = player1.chooseMove()
        const player2Move = player2.chooseMove()

        console.log(`${player1} chose ${player1Move}`)
        console.log(`${player2} chose ${player2Move}`)

        if (player1Move.beats(player2Move)) {
            winner = player1
        }
        else if (player2Move.beats(player1Move)) {
            winner = player2
        }
        else{
            console.log("The game is a draw")
        }
        console.log(`${winner} wins`)
    }
}

module.exports = { MOVES, computerPlayer, playGame }

// for (const aggressor of MOVES){
//     for (const defender of MOVES){
//         console.log(`Does ${aggressor} beat ${defender}? ${aggressor.beats(defender)? 'Yes' : 'No'}`)
//     }
// }