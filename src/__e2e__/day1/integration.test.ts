import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day1Error } from 'app-core/port/api/day1/error';
import { Day1Response } from 'app-core/port/api/day1/response';
import { day1UseCase, Day1UseCaseInject } from 'app-core/use_case/day1';
import { LOGGER } from 'app-infra/common/logger';
import { getDay1StorageImpl } from 'app-infra/day1/day1-storage-impl';

describe('Day1 Integration', async () => {
  it('Get Result', async () => {
    // arrange
    const presenter = fakePresenter<Day1Response, Day1Error>();
    const logger = LOGGER;
    const inject: Day1UseCaseInject = {
      day1Storage: getDay1StorageImpl()
    };

    // act
    await day1UseCase(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallInput()).toBeDefined();

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
