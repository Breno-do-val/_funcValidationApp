const { promisify} = require('util')

const googleSpreadsheet = require('google-spreadsheet')
const credentials = require('../comprefuncionalidade.json')
const sgMail = require('@sendgrid/mail');

const docId = '15wkABXk4lQTre3Bkpv0aO58z9asgYFL2KR6mczraHWU'
const worksheetCompany = 0
const sendGridKey = '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'

module.exports = {

    async index(req, res) {
        res.render('company', {
            pageTitle: 'Laborshare - RH'
        })
    },
    
    async store(req, res) {
        try {
            const doc = new googleSpreadsheet(docId)
            await promisify(doc.useServiceAccountAuth)(credentials)
            console.log('Planilha aberta')
            const info = await promisify(doc.getInfo)()
            const worksheet = info.worksheets[worksheetCompany]
            await promisify(worksheet.addRow)({
                name: req.body.name, 
                email: req.body.email,
                position: req.body.position,
                hired: req.body.freelancer,
                company: req.body.company,
            })
            sgMail.setApiKey(sendGridKey);
            const msg = {
            to: 'brenorvale@gmail.com',
            from: 'laborshare@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'Teste',
            html: '<strong>Teste</strong>',
            }   
            await sgMail.send(msg);
        res.render('acknowledge')
        } catch (err) {
            res.send('Erro ao Enviar o formulário.')
            console.log(err)
        }  
    }
}