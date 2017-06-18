module.exports = {
    from: 'Lakshay Bhambri <foodrecommendationapp@gmail.com>',
    host: 'smtp.gmail.com', // hostname 
    secureConnection: true, // use SSL 
    port: 465, // port for secure SMTP 
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
    auth: {
        user: 'foodrecommendationapp@gmail.com',
        pass: 'srishty2698'
    }
}