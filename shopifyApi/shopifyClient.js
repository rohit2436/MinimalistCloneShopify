import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'rohitapitesting.myshopify.com',
  storefrontAccessToken: 'a0df56357ac9e8ab29a2ebd7d92b37f5',
});

export default client;
