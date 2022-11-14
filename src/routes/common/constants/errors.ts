import { HttpStatus } from '@nestjs/common';

const { NOT_FOUND, BAD_REQUEST } = HttpStatus;

const ERRORS = {
  NOT_FOUND: { status: NOT_FOUND, message: 'Document not found' },
  BAD_REQUEST: { status: BAD_REQUEST, message: 'Wrong request' },
};

export { ERRORS };
