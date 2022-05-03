import ViewDogProfile from "./ViewDogProfile";


const vp = require('./ViewDogProfile');

test("View A Dogs Profile", () => {
    expect(ViewDogProfile(1, 2)).toBe(3);
});