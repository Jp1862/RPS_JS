interface Move {
  toString (): string,
  beats (other: Move): boolean,
}

const ROCK: Move = { toString: () => 'Rock', beats: (other) => other === SCISSORS }
const PAPER: Move = { toString: () => 'Paper', beats: (other) => other === ROCK }
const SCISSORS: Move = { toString: () => 'Scissors', beats: (other) => other === PAPER }

export const MOVES = [ROCK, PAPER, SCISSORS]

interface Player {
  toString (): string,
  chooseMove (): Promise<Move>,
}

export class HumanPlayer {
  rl: any
  name: any
  constructor(rl: any, name?: string) {
    this.rl = rl
    this.name = name || 'Human'
  }
  async chooseMove() {
    const answer = await this.rl.question('Enter 1 for Rock, 2 for Paper, 3 for Scissors ')
    const index = parseInt(answer) - 1
    const move = MOVES[index]
    return move
  }
  toString() {
    return this.name
  }
}

export class ComputerPlayer {
  name: any
  constructor(name?: string) {
    this.name = name || 'Computer'
  }
  async chooseMove() {
    return MOVES[Math.floor(Math.random() * MOVES.length)]
  }
  toString() {
    return this.name
  }
}

export async function playGame(player1: Player, player2: Player) {
  let winner;
  while (!winner) {
    const [player1Move, player2Move] = await Promise.all([player1.chooseMove(), player2.chooseMove()])


    console.log(`${player1} chose ${player1Move}`)
    console.log(`${player2} chose ${player2Move}`)

    if (player1Move.beats(player2Move)) {
      winner = player1
    } else if (player2Move.beats(player1Move)) {
      winner = player2
    } else {
      console.log('The game is a draw')
    }
  }
  console.log(`${winner} wins`)
}
