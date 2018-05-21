const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-stirng value', () => {
    var nonStr = 10;
    expect(isRealString(nonStr)).toBeFalsy();
  });

  it('should reject string with onlye white spaces', () => {
    var str = "     ";
    expect(isRealString(str)).toBeFalsy();
  });

  it('shoud allow string with non-space characters', () => {
    var str = "  Daniel   ";
    expect(isRealString(str)).toBeTruthy();
  })
});
