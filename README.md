## Dogecoin Ripple Gateway

Send dogecoins to your Ripple wallet and trade them on the global
worldwide crypto Ripple liquidity exchange.

### Generating a Dogecoin Address

    GET /wallet/new

    {
      address: "DJVnZpKBFs58dcxjAVzBbVSFdo6nNAC1tj"
    }

### Returning they key of an address

    GET /wallet/new?key=1

    {
      address: "DGR6H2NGP5ksHM3wHnpcw8maUBLuficpd6",
      key: "QQuvhjUGA173oGsg41od6a259R3vQeZ7HerX3FihTeba67eeDUXB"
    }

This software will interface with the [Ripple Gateway](https://github.com/ripple/ripple-gateway) software.
