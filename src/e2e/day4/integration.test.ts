import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day4Error } from 'app-core/port/api/day4/error';
import { Day4Response } from 'app-core/port/api/day4/response';
import { Day4UseCaseInject, day4UseCasePart1 } from 'app-core/use_case/day4';
import { LOGGER } from 'app-infra/common/logger';
import { getDay4StorageImpl } from 'app-infra/day4/storage-impl';

describe('Day4 Integration', async () => {
  it('Get Result Part 1', async () => {
    // arrange
    const presenter = fakePresenter<Day4Response, Day4Error>();
    const logger = LOGGER;
    const inject: Day4UseCaseInject = { day4Storage: getDay4StorageImpl() };

    // act
    await day4UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
