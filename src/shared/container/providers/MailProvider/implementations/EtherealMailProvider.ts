import { injectable } from "tsyringe";
import nodemailer, {Transporter} from 'nodemailer';
import { IMailProvider } from "../IMailProvider";
import handlebars from "handlebars";
import fs from 'fs';

@injectable()
class EtherealMailProvider implements IMailProvider{

    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            this.client = transporter;
        }).catch(error => console.log(error));

        
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateparse = handlebars.compile(templateFileContent);

        const templateHTML = templateparse(variables);       
        
        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com.br>',
            subject,
            html: templateHTML
        });


        console.log('message sent:%s', message.messageId);
        console.log('preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export {EtherealMailProvider};