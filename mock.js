import faker from 'faker';
var avGen = require('random-avatar-generator')
const generator = new avGen.AvatarGenerator();

export const generateChatData = ({recordNumber = 10}) => {
  let data = [];
  for (let i = 0; i < recordNumber; i++) {
    let chatObject = {
      message: faker.lorem.paragraph(),
      username: `${faker.name.firstName()} ${faker.name.lastName()}`,
      initials: `${faker.name.firstName().split("")[0]}${faker.name.lastName().split("")[0]}`,
      color:faker.internet.color(),
      usericon: generator.generateRandomAvatar(),
    };
    data.push(chatObject);
  }

  return data;
};
