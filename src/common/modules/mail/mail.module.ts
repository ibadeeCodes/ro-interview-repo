import { Global, Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Global() // 👈 global module
@Module({
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}