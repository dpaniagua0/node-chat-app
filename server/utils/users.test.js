const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: "Mike",
      room: "Dev"
    },{
      id: '2',
      name: "Dan",
      room: "Dev2"
    },{
      id: '3',
      name: "Andrew",
      room: "Dev"
    }]
  })

  it('should add a new user', () => {
    var users = new Users();
    var user =  { id:123, name: "Daniel", room: "Dev room" };
    var resUser =  users.addUser(user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for Dev room', () => {
    var userList = users.getUserList('Dev');

    expect(userList).toEqual(['Mike','Andrew']);
  });

  it('should return names for Dev2 room', () => {
    var userList = users.getUserList('Dev2');

    expect(userList).toEqual(['Dan']);
  });


  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find a user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).not.toEqual('10');
  });
});
