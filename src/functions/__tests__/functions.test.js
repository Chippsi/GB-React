import { getTime } from '../functions'

describe('getTime tests', () => {
    const expected = 5
    const recived = getTime()
    test('should return a string of this format - "hh:mm"', () => {
        expect(recived).toHaveLength(expected);
    });
})