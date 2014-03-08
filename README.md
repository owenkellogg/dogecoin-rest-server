## Dogecoin Ripple Gateway

Send dogecoins to your Ripple wallet and trade them on the global
worldwide crypto Ripple liquidity exchange.

This software will interface with the [Ripple Gateway](https://github.com/ripple/ripple-gateway) software.

### Generating a Dogecoin Address

    GET /wallet/new

    {
      address: "DJVnZpKBFs58dcxjAVzBbVSFdo6nNAC1tj"
    }

### Returning the key of an address

    GET /wallet/new?key=1

    {
      address: "DGR6H2NGP5ksHM3wHnpcw8maUBLuficpd6",
      key: "QQuvhjUGA173oGsg41od6a259R3vQeZ7HerX3FihTeba67eeDUXB"
    }

### Connecting a Ripple Address to a Dogecoin Address

    POST /bridges

    {
      ripple_address: "rMw9urZURf31w89fg7t5aJBQHqE2oyPg6T",
      email_address: "me@stevenzeiler.com",
      password: "mySup3rS3cretP@s$w0rd"
    }

    ... response ...

    {
      id: 52,
      email_address: "me@stevenzeiler.com",
      ripple_address: "rMw9urZURf31w89fg7t5aJBQHqE2oyPg6T",
      dogecoin_address: "DGR6H2NGP5ksHM3wHnpcw8maUBLuficpd6"
    }

