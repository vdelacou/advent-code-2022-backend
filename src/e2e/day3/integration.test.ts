import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day3Error } from 'app-core/port/api/day3/error';
import { Day3Response } from 'app-core/port/api/day3/response';
import { Day3UseCaseInject, day3UseCasePart1 } from 'app-core/use_case/day3';
import { LOGGER } from 'app-infra/common/logger';
import { getDay3StorageImpl } from 'app-infra/day3/day3-storage-impl';

describe('Day3 Integration', async () => {
  it('Get Result Part 1', async () => {
    // arrange
    const presenter = fakePresenter<Day3Response, Day3Error>();
    const logger = LOGGER;
    const inject: Day3UseCaseInject = { day3Storage: getDay3StorageImpl() };

    // act
    await day3UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
