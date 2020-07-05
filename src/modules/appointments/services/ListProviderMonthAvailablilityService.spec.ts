import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailablilityService from './ListProviderMonthAvailablilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailablility: ListProviderMonthAvailablilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailablility = new ListProviderMonthAvailablilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 8, 0, 0),
      user_id: '123123123',
      provider_id: 'user',
    });

    const availability = await listProviderMonthAvailablility.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
