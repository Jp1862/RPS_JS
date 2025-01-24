const ROCK = {toString: () => "Rock", beats: (other)=>other === SCISSORS }
const PAPER = {toString: () => "Paper", beats: (other)=>other === ROCK }
const SCISSORS = {toString: () => "Scissors", beats: (other)=>other === PAPER }

const MOVES = [ROCK,PAPER,SCISSORS]


module.exports = {MOVES}

const computerPlayer = {
    chooseMove:()=>{
        return MOVES[Math.floor(Math.random() *MOVES.length)]
    }
}
module.exports = {MOVES, computerPlayer}


// for (const aggressor of MOVES){
//     for (const defender of MOVES){
//         console.log(`Does ${aggressor} beat ${defender}? ${aggressor.beats(defender)? 'Yes' : 'No'}`)
//     }
// }