module.exports = {
    from: 'Lakshay Bhambri <bhambri.lakshay@gmail.com>',
    host: 'smtp.gmail.com', // hostname 
    secureConnection: true, // use SSL 
    port: 465, // port for secure SMTP 
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
    auth: {
        user: 'bhambri.lakshay@gmail.com',
        pass: 'srishty2698'
    }
}