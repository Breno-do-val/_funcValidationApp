const { promisify} = require('util')

const googleSpreadsheet = require('google-spreadsheet')
const credentials = require('../comprefuncionalidade.json')
const sgMail = require('@sendgrid/mail');

const docId = '15wkABXk4lQTre3Bkpv0aO58z9asgYFL2KR6mczraHWU'
const worksheetDeveloper = 1
const sendGridKey = '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'

module.exports = {
    
    async index(req, res) {
        res.render('developer', {
            pageTitle: 'LaborShare - DEV'
        })
    },

    async store(req, res) {
        try {
            const doc = new googleSpreadsheet(docId)
            await promisify(doc.useServiceAccountAuth)(credentials)
            const info = await promisify(doc.getInfo)()
            const worksheet = info.worksheets[worksheetDeveloper]
            await promisify(worksheet.addRow)({
                name: req.body.name,
                email: req.body.email,
                position: req.body.position,
                hired: req.body.freelancer,
                company: req.body.company,
                matching: req.body.matching,
                cultureAlignment: req.body.alignment,
                hardSkills: req.body.hardSkills,
                hourBased: req.body.hourBased,
                Contract: req.body.contract,
                taxDeclaration: req.body.tax,
                ProjectManagement: req.body.projectManagement,
                HourControl: req.body.hourControl,
                Assessment: req.body.assessment,
                Comments: req.body.comment,
            })
            sgMail.setApiKey(sendGridKey);
            const msg = {
                to: req.body.email,
                from: 'laborshare@gmail.com',
                subject: 'Plataforma LaborShare',
                text: 'Teste',
                html: '<strong>Obrigado por responder nossa pesquisa</strong>',
                html: '<p>Todas as informações compartilhadas serão usadas apenas para nossa pesquisa de campo, logo após serão apagadas de nosso banco de dados.</p>'
            };
            await sgMail.send(msg);
            res.render('acknowledge', {
                pageTitle: 'LaborShare - Obrigado'
            })
        } catch (err) {
        res.send('Erro ao Enviar o formulário.')
        console.log(err)
        }  
    }
}