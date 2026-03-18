import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<string>('smtp.SMTP_HOST'),
			port: this.configService.get<number>('smtp.SMTP_PORT'),
			secure: this.configService.get<boolean>('smtp.SMTP_SECURE'),
			auth: {
				user: this.configService.get<string>('smtp.SMTP_USER'),
				pass: this.configService.get<string>('smtp.SMTP_PASSWORD'),
			}
		});
	}

	async sendMail(
		to: string[],
		subject: string,
		templateName: string,
		context: Record<string, any>,
	): Promise<boolean> {
		// Create the HTML content for the email
		const html = this.generateHTMLFromTemplate(templateName, context);

		const mailOptions = {
			from: this.configService.get<string>('smtp.FROM_EMAIL'),
			to,
			subject,
			html
		};

		const response = await this.transporter.sendMail(mailOptions);
		if (response) return true;
	}

	private generateHTMLFromTemplate(templateName: string, context: Record<string, any>) {
		// Read the handlebars template file

		const templateFile = fs.readFileSync(path.resolve(__dirname, 'templates', `${templateName}.hbs`), 'utf8');

		// Compile the handlebars template
		const template = handlebars.compile(templateFile);

		// Create the HTML content for the email
		const html = template(context);

		return html;
	}
}
