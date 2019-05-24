import { Aborter } from './Aborter';
import { Models } from '.';
import { Blob, Container } from './generated/lib/operations';

export interface LeaseOperationOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export class Lease {
  constructor(private _leaseId: string, private readonly containerOrBlob: Container | Blob) {
  }

  public get leaseId() {
    return this._leaseId;
  }

  public async chanageId(proposedLeaseId: string, options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.containerOrBlob.changeLease(this._leaseId, proposedLeaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
    if (!response.errorCode && response.leaseId) {
      this._leaseId = response.leaseId!;
    } else {
      throw new Error("Error changing lease Id to " + proposedLeaseId + ", error code: '" + response.errorCode + "'.");
    }
  }

  public async release(options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    await this.containerOrBlob.releaseLease(this._leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  public async renew(options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    await this.containerOrBlob.renewLease(this._leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }
}
