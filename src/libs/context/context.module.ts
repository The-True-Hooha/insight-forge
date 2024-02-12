import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { v4 } from "uuid";
import { ContextStorageServiceKey } from "./interface/context.storage.interface";
import { ClsContextStorageService } from "./context.storage.service";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ContextStorageServiceKey,
      useClass: ClsContextStorageService,
    },
    ],
  exports: [ContextStorageServiceKey]
})
export class ContextModule {}