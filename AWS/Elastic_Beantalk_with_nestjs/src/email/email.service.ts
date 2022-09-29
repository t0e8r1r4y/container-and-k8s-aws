import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

interface IEmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor(@Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>, 
    ) {
        this.transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            }
        });
    }


    async sendMemverJoinVerification(emailAddress: string, signupVerifyToken: string)
    {
        const baseUrl =  this.config.baseUrl; //'http://localhost:3000';

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

        const mailOptions: IEmailOptions = {
            to: emailAddress,
            subject: '가입인증메일',
            html: `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br/>
                <form action="${url}" method="POST">
                    <button>가입확인</button>
                </form>
            `
        }

        return await this.transporter.sendMail(mailOptions);
    }

}
