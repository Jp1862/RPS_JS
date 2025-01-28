import { stdin, stdout } from 'node:process'
import * as readline from 'node:readline/promises'
import { ComputerPlayer, HumanPlayer, playGame } from './RPS.js'

const rl = readline.createInterface({ input: stdin, output: stdout })
const human = new HumanPlayer(rl)
const computer = new ComputerPlayer()

playGame(human, computer).then(() => rl.close())
