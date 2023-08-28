import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

function createRandomRoom(): Prisma.RoomUncheckedCreateInput {
  return {
    name: faker.system.commonFileName('pdf'),
  };
}

export const rooms = faker.helpers.multiple(createRandomRoom, {
  count: 25,
});
