import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day2Error } from 'app-core/port/api/day2/error';
import { Day2Response } from 'app-core/port/api/day2/response';
import { Day2UseCaseInject, day2UseCasePart1, day2UseCasePart2 } from 'app-core/use_case/day2';
import { LOGGER } from 'app-infra/common/logger';
import { getDay2StorageImpl } from 'app-infra/day2/day2-storage-impl';

describe('Day2 Integration', async () => {
  it('Get Result Part 1', async () => {
    // arrange
    const presenter = fakePresenter<Day2Response, Day2Error>();
    const logger = LOGGER;
    const inject: Day2UseCaseInject = { day2Storage: getDay2StorageImpl() };

    // act
    await day2UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });

  it('Get Result Part 2', async () => {
    // arrange
    const presenter = fakePresenter<Day2Response, Day2Error>();
    const logger = LOGGER;
    const inject: Day2UseCaseInject = { day2Storage: getDay2StorageImpl() };

    // act
    await day2UseCasePart2(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
