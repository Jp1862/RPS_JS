import { MOVES, ComputerPlayer, playGame, HumanPlayer } from '../RPS'
import { describe, test, expect, afterEach, beforeEach, jest } from '@jest/globals'

const [ROCK, PAPER, SCISSORS] = MOVES

describe('MOVES', () => {
  for (const move of MOVES) {
    describe(move.toString(), () => {
      test(`${move} should not beat itself`, () => {
        expect(move.beats(move)).toBeFalsy()
      })
      test(`${move} should beat one other move`, () => {
        let victories = 0
        for (const defender of MOVES) {
          victories += move.beats(defender)
        }
        expect(victories).toBe(1)
      })
      test(`${move} should lose to one other move`, () => {
        let defeats = 0
        for (const aggressor of MOVES) {
          defeats += aggressor.beats(move)
        }
        expect(defeats).toBe(1)
      })
    }
    )
  }
})

describe(ComputerPlayer, () => {
  const computerPlayer = new ComputerPlayer()
  describe(ComputerPlayer.prototype.chooseMove, () => {
    const realRandom = Math.random


    afterEach(() => {
      Math.random = realRandom
    })

    const testCase = [
      [ROCK, 0.1],
      [PAPER, 0.5],
      [SCISSORS, 0.8],
    ]
    for (const [expectedMove, randomValue] of testCase) {
      test(`chooseMove() should return ${expectedMove} when Math.random() returns ${randomValue}`, async () => {
        // Arrange
        Math.random = () => randomValue
        // Act
        const move = computerPlayer.chooseMove()
        // Assert
        await expect(move).resolves.toBe(expectedMove)
      })
    }
  })
})

describe(HumanPlayer, () => {
  const rl = { question: jest.fn() }
  const humanPlayer = new HumanPlayer(rl)
  describe(HumanPlayer.prototype.chooseMove, () => {
    const testCase = [
      [ROCK, '1'],
      [PAPER, '2'], 
      [SCISSORS, '3']
    ]

    for(const[expectedMove, answer] of testCase){
    test(`chooseMove should return ${expectedMove} when rl.question resolves to '${answer}'`, async () => {
      rl.question.mockResolvedValueOnce(answer)
      const move = humanPlayer.chooseMove()
      await expect(move).resolves.toBe(expectedMove)
    })
    }
  })
})

describe(playGame, () => {
  const playsRock = { toString: () => 'Rocky', chooseMove: async () => ROCK }
  const playsScissors = { toString: () => 'Scissory', chooseMove: async () => SCISSORS }
  const playsRockThenScissors = {
    toString: () => 'RockyScissory',
    chooseMove: jest.fn().mockResolvedValueOnce(ROCK).mockResolvedValueOnce(SCISSORS)
  }

  const realConsoleLog = console.log

  beforeEach(() => {
    console.log = jest.fn()
  })
  afterEach(() => {
    console.log = realConsoleLog
  })

  test('Player 1\'s move should be reported', async () => {
    await playGame(playsRock, playsScissors)
    expect(console.log).toHaveBeenCalledWith('Rocky chose Rock')
  })
  test('Player 2\'s move should be reported', async () => {
    await playGame(playsRock, playsScissors)
    expect(console.log).toHaveBeenCalledWith('Scissory chose Scissors')
  })
  test('should report when player 1 wins', async () => {
    await playGame(playsRock, playsScissors)
    expect(console.log).toHaveBeenCalledWith('Rocky wins')
  })
  test('should report when player 2 wins', async () => {
    await playGame(playsScissors, playsRock)
    expect(console.log).toHaveBeenCalledWith('Rocky wins')
  })
  test('game should replay on draw', async () => {
    await playGame(playsRockThenScissors, playsRock)
    expect(console.log).toHaveBeenCalledWith('The game is a draw')
    expect(console.log).toHaveBeenCalledWith('Rocky wins')
  })
})
