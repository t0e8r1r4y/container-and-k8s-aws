import { Controller, Get, HostParam } from '@nestjs/common';

// 경로를 여러개로 할 수 있다.
@Controller({ host: ':version.api.localhost' })
export class ApiController {
    @Get()
    index( @HostParam('version') version: string ) : string {
        return `hello api controller test : ${version}`;
    }
}
