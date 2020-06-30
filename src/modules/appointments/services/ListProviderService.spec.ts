import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Augusto',
      email: 'augusto@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Augusto2',
      email: 'augusto2@gmail.com',
      password: '123456',
    });

    const loguedUser = await fakeUsersRepository.create({
      name: 'Augusto3',
      email: 'augusto3@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loguedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
