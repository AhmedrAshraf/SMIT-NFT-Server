const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-specific-password'
  }
});

// Email service functions
const emailService = {
  // Send a simple email
  sendEmail: async (to, subject, text, html) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to,
        subject,
        text,
        html
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send a welcome email
  sendWelcomeEmail: async (to, name) => {
    const subject = 'Welcome to SMIT NFT Platform';
    const text = `Hello ${name},\n\nWelcome to our NFT platform! We're excited to have you on board.`;
    const html = `
      <h1>Welcome to SMIT NFT Platform</h1>
      <p>Hello ${name},</p>
      <p>Welcome to our NFT platform! We're excited to have you on board.</p>
      <p>Best regards,<br>The SMIT NFT Team</p>
    `;

    return emailService.sendEmail(to, subject, text, html);
  },

  // Send NFT purchase confirmation
  sendPurchaseConfirmation: async (to, nftName, price) => {
    const subject = 'NFT Purchase Confirmation';
    const text = `Thank you for purchasing ${nftName} for ${price} ETH.`;
    const html = `
      <h1>NFT Purchase Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <p>NFT: ${nftName}</p>
      <p>Price: ${price} ETH</p>
      <p>Best regards,<br>The SMIT NFT Team</p>
    `;

    return emailService.sendEmail(to, subject, text, html);
  }
};

module.exports = emailService; 