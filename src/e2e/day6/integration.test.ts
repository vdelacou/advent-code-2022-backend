import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day6Error } from 'app-core/port/api/day6/error';
import { Day6Response } from 'app-core/port/api/day6/response';
import { Day6UseCaseInject, day6UseCasePart1 } from 'app-core/use_case/day6/part1';
import { LOGGER } from 'app-infra/common/logger';
import { getDay6StorageImpl } from 'app-infra/day6/storage-impl';

describe('Day6 Integration', async () => {
  it('Get Result Part 1', async () => {
    // arrange
    const presenter = fakePresenter<Day6Response, Day6Error>();
    const logger = LOGGER;
    const inject: Day6UseCaseInject = { day6Storage: getDay6StorageImpl() };

    // act
    await day6UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
