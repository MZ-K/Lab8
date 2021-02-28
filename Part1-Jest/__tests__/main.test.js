const formatVolumeIconPath = require("../assets/scripts/main");

describe('the formatVolumeIconPath function returns correctly when', () => {
    test('volume is High', () => {
        expect(formatVolumeIconPath(100)).toMatch('3');
        expect(formatVolumeIconPath(85)).toMatch('3');
        expect(formatVolumeIconPath(67)).toMatch('3');
    });
    test('volume is Medium', () => {
        expect(formatVolumeIconPath(66)).toMatch('2');
        expect(formatVolumeIconPath(50)).toMatch('2');
        expect(formatVolumeIconPath(34)).toMatch('2');
    });
    test('volume is Low', () => {
        expect(formatVolumeIconPath(33)).toMatch('1');
        expect(formatVolumeIconPath(15)).toMatch('1');
        expect(formatVolumeIconPath(1)).toMatch('1');
    });
    test('volume is High', () => {
        expect(formatVolumeIconPath(0)).toMatch('0');
        expect(formatVolumeIconPath(-1)).toMatch('0');
        expect(formatVolumeIconPath(-100)).toMatch('0');
    });
});