import { ContextStorageInterface } from './interface/context.storage.interface';
import { CLS_ID, ClsService } from 'nestjs-cls';

export class ClsContextStorageService implements ContextStorageInterface {
  constructor(private readonly cls: ClsService) {}

  setContextId(contextId: string): void {
    this.cls?.set(CLS_ID, contextId);
  }

  getContextId(): string {
    return this.cls?.getId();
  }

  get<T>(key: string): T {
    return this.cls?.get(key);
  }

  set<T>(key: string, value: T): void {
    this.cls?.set(key, value);
  }
}
