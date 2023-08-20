import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

function createRandomMessage(): Prisma.MessageUncheckedCreateInput {
  return {
    content: faker.lorem.paragraphs(),
    isFromAi: faker.datatype.boolean(),
    roomId: faker.number.int({ min: 1, max: 25 }),
  };
}

export const messages = faker.helpers.multiple(createRandomMessage, {
  count: 1000,
});
