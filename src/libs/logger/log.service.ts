import { Injectable } from "@nestjs/common";

@Injectable()
export class LogService {
    constructor() { }
    sayHello(): string {
        return 'hello world'
    }
}