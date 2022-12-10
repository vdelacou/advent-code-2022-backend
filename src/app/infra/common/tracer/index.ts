import { Tracer } from 'common/interface/observability/tracer';
import { LAMBDA_TRACER } from './lambda_powertools/tracer';

export const TRACER: Tracer = LAMBDA_TRACER;
