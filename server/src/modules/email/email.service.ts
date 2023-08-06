import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
import randomString = require('random-string');
import { getConfig } from '../../utils';

const { Email } = getConfig();

@Injectable()
export class EmailService {
  async send(email: string, device: string, ip: string) {
    if (!email) {
      throw new HttpException('email not found', HttpStatus.FORBIDDEN);
    }
    let transporter = nodemailer.createTransport({
      service: 'QQ',
      port: 587,
      auth: {
        user: Email.user,
        pass: Email.pass,
      },
      secure: false,
    });
    const random = randomString({ length: 6, numeric: true, letters: false });
    // 定义transport对象并发送邮件
    await transporter.sendMail({
      from: `"Fen 👻" <${Email.user}>`, // 发送方邮箱的账号
      to: email, // 邮箱接受者的账号
      subject: 'Hello Fen', // Subject line
      text: 'Fen?', // 文本内容
      html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="description" content="Password Reset - Ac89 - Email Templates for developers" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Verification Code - Ar18 - Email Templates for developers</title>
          <style>
            html,
            body {
              margin: 0 auto !important;
              padding: 0 !important;
              width: 100% !important;
              font-family: sans-serif;
              line-height: 1.4;
              -webkit-font-smoothing: antialiased;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%; 
            }
            * {
              -ms-text-size-adjust: 100%;
            }
            table,
            td {
              mso-table-lspace: 0pt !important;
              mso-table-rspace: 0pt !important;
            }
            img {
              display: block;
              border: none;
              max-width: 100%; 
              -ms-interpolation-mode: bicubic;
            }
            a {
              text-decoration: none;
            }
          </style>
        </head>
        <body
          leftmargin="0" 
          marginwidth="0" 
          topmargin="0" 
          marginheight="0" 
          offset="0" 
          width="100%"
          style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly"
        >
          <table
            role="presentation"
            align="center" 
            valign="top" 
            border="0" 
            cellpadding="0" 
            cellspacing="0" 
            height="100%" 
            width="100%" 
            style="border-spacing: 0; 
              border-collapse: collapse; 
              vertical-align: top; 
              padding: 0; 
              margin: 0; 
              width: 100%;
              text-align: center;" 
          >
            <tr>
              <td align="center" valign="top">
                <table 
                  role="presentation"
                  align="center" 
                  border="0" 
                  cellpadding="0" 
                  cellspacing="0" 
                  width="600" 
                  bgcolor="#ffffff" 
                  style="max-width: 600px; 
                    border-spacing: 0; 
                    border-collapse: collapse; 
                    vertical-align: top; 
                    padding: 0; 
                    margin: 0; 
                    width: 100%;
                    background: #ffffff;"
                >
                  <tr>
                    <td height=40" style="height:40px">
                      <img 
                        src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                        width="1" 
                        height="1" 
                        border="0" 
                        style="display: block; border: none" 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <table 
                        role="presentation"
                        align="center" 
                        border="0" 
                        cellpadding="0" 
                        cellspacing="0" 
                        width="440" 
                        style="max-width: 440px;
                          border-spacing: 0; 
                          border-collapse: collapse; 
                          vertical-align: top; 
                          padding: 0; 
                          margin: 0;
                          width: 100%;
                          text-align: center;"
                      >
                        <tr>
                          <td align="center">
                            <img 
                              src="https://sponsors.vuejs.org/images/illa_cloud.svg" 
                              width="170"
                              style="border: none; display: block; max-width: 170px; width: 100%"
                            >
                          </td>
                        </tr>			
                        <tr>
                          <td height="40" style="height:40px">
                            <img 
                              src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                              width="1" 
                              height="1" 
                              border="0" 
                              style="display: block; border: none" 
                            />		
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h1 
                              style="font-family: Arial, Helvetica, sans-serif; 
                                font-size: 24px; 
                                color: #010E28; 
                                font-weight: bold; 
                                margin: 0; 
                                margin-bottom: 5px;
                                padding: 0"
                            >
                              欢迎注册Fen
                            </h1>
                          </td>
                        </tr>
                        <tr>
                          <td height="15" style="height: 15px">
                            <img 
                              src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                              width="1" 
                              height="1" 
                              border="0" 
                              style="display: block; border: none" 
                            />	
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p 
                              style="font-family: Arial, Helvetica, sans-serif; 
                                font-size: 15px; 
                                color: #5B6987; 
                                margin: 0; 
                                padding: 0; 
                                line-height: 20px;"
                              >
                              ${device}<br />
                              IP address: ${ip}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td height="30" style="height: 30px">
                            <img 
                              src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                              width="1" 
                              height="1" 
                              border="0" 
                              style="display: block; border: none" 
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p 
                              style="font-family: Arial, Helvetica, sans-serif; 
                                font-size: 15px; 
                                color: #5B6987; 
                                margin: 0; 
                                padding: 0; 
                                line-height: 20px;
                                font-weight: bold;"
                              >
                              您的验证码是:
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td height="20" style="height: 20px">
                            <img 
                              src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                              width="1" 
                              height="1" 
                              border="0" 
                              style="display: block; border: none" 
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p 
                              style="font-family: Arial, Helvetica, sans-serif; 
                                font-size: 35px; 
                                color: #010E28; 
                                margin: 0; 
                                padding: 0; 
                                line-height: 20px;
                                font-weight: bold;"
                              >
                              ${random}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td height="20" style="height: 20px">
                            <img 
                              src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                              width="1" 
                              height="1" 
                              border="0" 
                              style="display: block; border: none" 
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p 
                              style="font-family: Arial, Helvetica, sans-serif; 
                                font-size: 15px; 
                                color: #5B6987; 
                                margin: 0; 
                                padding: 0; 
                                line-height: 20px;
                                font-weight: bold;"
                              >
                              还有5分钟就过期了
                            </p>
                          </td>
                        </tr>
                      </table>	
                    </td>
                  </tr>
                  <tr>
                    <td height="40" style="height:40px">
                      <img 
                        src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png" 
                        width="1" 
                        height="1" 
                        border="0" 
                        style="display: block; border: none" 
                      />	
                    </td>
                  </tr>
                </table>	
              </td>
            </tr>
          </table>
        </body>
      </html>`, // html 内容, 如果设置了html内容, 将忽略text内容
    });
    return random;
  }
}
