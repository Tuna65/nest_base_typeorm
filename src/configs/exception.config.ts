import {
  ConflictException as cf,
  NotFoundException as nf,
} from '@nestjs/common';

export const ConflictException = (message: string) => {
  throw new cf(message);
};

export const NotFoundException = (message: string) => {
  throw new nf(message);
};

export const MsgResponse = (message: string): any => {
  return {
    status: true,
    message,
  };
};
