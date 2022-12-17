import { Logger } from 'common/interface/observability/logger';
import { WINSTON_CONSOLE_LOGGER } from './console_winston';

const configLogger = (): Logger => WINSTON_CONSOLE_LOGGER;

export const LOGGER: Logger = configLogger();
