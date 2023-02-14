const { ServiceBusClient } = require("@azure/service-bus");
require("dotenv").config();
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.QUEUE_NAME;

const messages = [
    { body: "Albert Einstein" },
    { body: "James Brown" }
]

async function main() {
    const sbClient = new ServiceBusClient(connectionString);

    const sender = sbClient.createSender(queueName);

    try {
        await sender.sendMessages(messages);

        console.log(`Done sending, closing...`);
        await sender.close();
    } finally {
        await sbClient.close();
    }
}

main().catch(e => {
    console.log("sendMessages Sample: Error occured: ", e);
    process.exit(1);
});