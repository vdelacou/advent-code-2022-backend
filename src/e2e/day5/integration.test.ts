import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day5Error } from 'app-core/port/api/day5/error';
import { Day5Response } from 'app-core/port/api/day5/response';
import { Day5UseCaseInject, day5UseCasePart1 } from 'app-core/use_case/day5/part1';
import { LOGGER } from 'app-infra/common/logger';
import { getDay5StorageImpl } from 'app-infra/day5/storage-impl';

describe('Day5 Integration', async () => {
  it('Get Result Part 1', async () => {
    // arrange
    const presenter = fakePresenter<Day5Response, Day5Error>();
    const logger = LOGGER;
    const inject: Day5UseCaseInject = { day5Storage: getDay5StorageImpl() };

    // act
    await day5UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    expect(presenter.getPresentSuccessCallCounter()).toBe(1);
    expect(presenter.getPresentFailCallCounter()).toBe(0);

    // Diplay Result
    logger.info('Result', presenter.getPresentSuccessCallInput());
  });
});
