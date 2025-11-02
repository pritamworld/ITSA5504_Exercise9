const path = require('path');
const { Verifier } = require('@pact-foundation/pact');


(async () => {
    try {
            const res = await new Verifier({
                providerBaseUrl: 'http://localhost:3000',
                pactUrls: [path.resolve(process.cwd(), 'pacts/ordersui-ordersapi.json')]
            }).verifyProvider();
            console.log('Pact verification complete:', res);
        } catch (e) {
            console.error('Pact verification failed:', e);
            process.exit(1);
    }
})();