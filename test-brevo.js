import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const email = new brevo.SendSmtpEmail();
email.subject = "Prueba Brevo - Caminatas Terapéuticas";
email.sender = { email: process.env.EMAIL_FROM };
email.to = [{ email: process.env.EMAIL_TO }];
email.htmlContent = "<h2>Prueba de conexión con Brevo</h2><p>Todo funciona 🚀</p>";

apiInstance.sendTransacEmail(email)
  .then(res => console.log("✅ Email enviado con Brevo:", res))
  .catch(err => console.error("❌ Error Brevo:", err.message, err.body));
