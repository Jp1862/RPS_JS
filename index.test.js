const { MOVES, computerPlayer, playGame } = require('./index')

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

describe('computerPlayer', () => {
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
        test(`chooseMove() should return ${expectedMove} when Math.random() returns ${randomValue}`, () => {
            //Arrange
            Math.random = () => randomValue
            //Act
            const move = computerPlayer.chooseMove()
            //Assert
            expect(move).toBe(expectedMove)

        })
    }
})

describe('playGame', () => {
    const playsRock = { toString: () => "Rocky", chooseMove: () => ROCK }
    const playsScissors = { toString: () => "Scissory", chooseMove: () => SCISSORS }
    const playsRockThenScissors = {
        toString: () => 'RockyScissory',
        chooseMove: jest.fn().mockReturnValueOnce(ROCK).mockReturnValueOnce(SCISSORS)
    }

    const realConsoleLog = console.log

    beforeEach(() => {
        console.log = jest.fn()
    })
    afterEach(() => {
        console.log = realConsoleLog
    })

    test(`Player 1's move should be reported`, () => {
        playGame(playsRock, playsScissors)
        expect(console.log).toHaveBeenCalledWith('Rocky chose Rock')
    })
    test(`Player 2's move should be reported`, () => {
        playGame(playsRock, playsScissors)
        expect(console.log).toHaveBeenCalledWith('Scissory chose Scissors')
    })
    test(`should report when player 1 wins`, () => {
        playGame(playsRock, playsScissors)
        expect(console.log).toHaveBeenCalledWith('Rocky wins')
    })
    test(`should report when player 2 wins`, () => {
        playGame(playsScissors, playsRock)
        expect(console.log).toHaveBeenCalledWith('Rocky wins')
    })
    test(`game should replay on draw`, () => {
        playGame(playsRockThenScissors, playsRock)
        expect(console.log).toHaveBeenCalledWith('The game is a draw')
        expect(console.log).toHaveBeenCalledWith('Rocky wins')
    })
})
