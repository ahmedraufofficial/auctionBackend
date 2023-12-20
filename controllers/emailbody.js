const companyAddress = 'Main Branch - Business Bay, Dubai'
const companyUrl = 'https://carologyauctions.com'
const companyTiktok = 'https://www.tiktok.com/@carologyauctions'
const companyInsta = 'https://www.instagram.com/carology_auctions/?hl=en#'
const companyContact = '+971 058 9 10 11 12'

const signupEmail = (user) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
          }

          p {
            color: #555555;
          }

          footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #dddddd;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sign up Email</h1>

          <p><strong>Subject:</strong> Welcome to Carology - Your Account Activation</p>

          <p>Dear ${user},</p>

          <p>Thank you for signing up with Carology! We're thrilled to have you join our community of car enthusiasts and enthusiasts-to-be. Your account creation was successful, and we can't wait for you to dive into the exciting world of cars with us. However, before you hit the road, we want to let you know that our admin team will need to verify your account. This extra step ensures a secure and pleasant experience for all our members.</p>

          <p>Once the verification process is complete, you will receive an email notification confirming that your account is now active and ready for action.</p>

          <p>In the meantime, feel free to explore our website and get to know our offerings. We have a fantastic lineup of cars waiting for you to discover.</p>

          <p>Thank you for choosing Carology, where the journey of car exploration and ownership begins. We can't wait to see you on the road!</p>

          <footer>
            ${companyAddress}<br>
            <a href="${companyUrl}">Visit our website</a><br>
            TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
            Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
            Contact Information: ${companyContact}<br>
          </footer>
        </div>
      </body>
    </html>
  `;
}

const activateEmail = (user) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
          }

          p {
            color: #555555;
          }

          footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #dddddd;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Carology Auctions!</h1>

          <p>Hello ${user},</p>

          <p>Great news! Your registration with Carology Auctions is complete, and we're excited to inform you that your account is now activated and ready for action. With Carology Auctions, you have the keys to explore, bid on, and potentially own the car of your dreams through our famous auctions. We're thrilled to have you on board and can't wait to see which incredible vehicles catch your eye.</p>

          <p>Your journey with Carology is just beginning, and we're here to support you every step of the way. If you have any questions, need assistance, or want to explore these additional features, don't hesitate to contact our friendly support team.</p>

          <p>Get ready for a thrilling ride with Carology Auctions! Your activated account is your passport to car ownership and exploration adventures.</p>

          <p>Best regards,<br>The Carology Auctions Team</p>

          <footer>
            ${companyAddress}<br>
            <a href="${companyUrl}">Visit our website</a><br>
            TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
            Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
            Contact Information: ${companyContact}<br>
          </footer>
        </div>
      </body>
    </html>
  `;
}

const otpEmail = (user, otpCode) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
  
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            h1 {
              color: #333333;
            }
  
            p {
              color: #555555;
            }
  
            footer {
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px solid #dddddd;
              text-align: center;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Request</h1>
  
            <p>Dear ${user},</p>
  
            <p>We received a request to reset your password for your Carology Auctions account. Your security is important to us, and we're here to help you regain access to your account.</p>
  
            <p>Please find your one-time passcode (OTP) below. Enter this code on the password reset page to set up a new password:</p>
  
            <p><strong>One-Time Passcode (OTP):</strong> ${otpCode}</p>
  
            <p>This passcode is valid for until the moment you've used it. If you didn't request a password reset, please disregard this email and ensure the security of your account.</p>
  
            <p>If you need further assistance or have any questions, feel free to reach out to our dedicated support team. We're here to assist you.</p>
  
            <p>Thank you for being a valued member of Carology Auctions. We appreciate your trust in us.</p>
  
            <p>Best regards,<br>The Carology Auctions Team</p>
  
            <footer>
              ${companyAddress}<br>
              <a href="${companyUrl}">Visit our website</a><br>
              TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
              Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
              Contact Information: ${companyContact}<br>
            </footer>
          </div>
        </body>
      </html>
    `;
};

const activateAuctionEmail = (user) => {
    return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="background-color: #007bff; color: #fff; text-align: center; padding: 20px;">
        <h1>Thank You for Applying!</h1>
    </div>
    
    <div style="padding: 20px;">
        <p>Dear ${user},</p>
    
        <p>We want to express our gratitude for your interest in Carology Auctions and for applying to join our auctions. We're thrilled to have you on board and excited to offer you the opportunity to explore our unique selection of items up for bidding.</p>
    
        <p>We're delighted to inform you that your application has been accepted! 🎉 You can now access our exclusive auctions and start bidding on a wide range of fantastic vehicles.</p>
    
        <h3>Getting Started</h3>
        <ol>
            <li>Re-Log in to your account</li>
            <li>Navigate to the "Auctions" section.</li>
            <li>Browse through our curated collection and place your bids on vehicles that catch your eye.</li>
        </ol>
    
        <p>We believe you'll enjoy the thrill of the auction process and discover treasures that align with your interests.</p>
    
        <p>Should you need any assistance or have questions along the way, our dedicated support team is ready to help. You can reach out to us at .</p>
    
        <p>Once again, thank you for choosing Carology Auctions for your auction experience. We're looking forward to providing you with top-notch service and access to exciting vehicles.</p>
    
        <footer>
              ${companyAddress}<br>
              <a href="${companyUrl}">Visit our website</a><br>
              TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
              Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
              Contact Information: ${companyContact}<br>
            </footer>
    </div>
    
    </body>`
}

const evaluationEmail = (user) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
          }

          p {
            color: #555555;
          }

          footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #dddddd;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Car Listing is Live!</h1>

          <p>Hello ${user},</p>

          <p>We wanted to let you know that your car is now under evaluation by our trusted Carology's team! 🚗</p>

          <p>Our team will ensured that your listing is ready to shine, and we'll see how to make it accessible to potential buyers looking for their dream cars. You're a part of a vibrant community of car enthusiasts, and we can't wait to see the connections your listing will create.</p>

          <p>Carology is all about making connections, and we're here to support you every step of the way. If you have any questions or need assistance, please don't hesitate to contact our support team. We're here to help.</p>

          <p>Thank you for choosing Carology as your platform to find the precise evaluation for your car. Your evaluation request is now added to our system and awaiting to make those connections happen!</p>

          <p>Best regards,<br>The Carology Team</p>

          <footer>
            ${companyAddress}<br>
            <a href="${companyUrl}">Visit our website</a><br>
            TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
            Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
            Contact Information: ${companyContact}<br>
          </footer>
        </div>
      </body>
    </html>
  `;
}

const classifiedEmail = (user) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
          }

          p {
            color: #555555;
          }

          footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #dddddd;
            text-align: center;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Car Listing is Live!</h1>

          <p>Hello ${user},</p>

          <p>We're thrilled to let you know that your car listing is now live on Carology's active and unique marketplace! 🚗</p>

          <p>Our team has ensured that your listing is ready to shine, and it's now accessible to potential buyers looking for their dream cars. You're a part of a vibrant community of car enthusiasts, and we can't wait to see the connections your listing will create.</p>

          <p>Carology is all about making connections, and we're here to support you every step of the way. If you have any questions or need assistance, please don't hesitate to contact our support team. We're here to help.</p>

          <p>Thank you for choosing Carology as your platform to find the perfect match for your car. Your listing is now live and ready to make those connections happen!</p>

          <p>Best regards,<br>The Carology Team</p>

          <footer>
            ${companyAddress}<br>
            <a href="${companyUrl}">Visit our website</a><br>
            TikTok: <a href="${companyTiktok}">${companyTiktok}</a><br>
            Instagram: <a href="${companyInsta}">${companyInsta}</a><br>
            Contact Information: ${companyContact}<br>
          </footer>
        </div>
      </body>
    </html>
  `;
}

module.exports = { signupEmail, activateEmail, otpEmail, activateAuctionEmail, evaluationEmail, classifiedEmail }