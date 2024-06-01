/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/crowdfund.json`.
 */
export type Crowdfund = {
  "address": "BQWAU4uYTxMzyLjjnp4YPaS1jvHmeUt6BqNrKZvzXD5r",
  "metadata": {
    "name": "crowdfund",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeFundraiser",
      "discriminator": [
        147,
        202,
        141,
        164,
        126,
        180,
        241,
        145
      ],
      "accounts": [
        {
          "name": "crowdfundAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "crowdfundPda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "crowdfundAuthority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "contribute",
      "discriminator": [
        82,
        33,
        68,
        131,
        32,
        0,
        205,
        95
      ],
      "accounts": [
        {
          "name": "contributor",
          "writable": true,
          "signer": true
        },
        {
          "name": "crowdfund",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "crowdfund.crowdfund_authority",
                "account": "crowdFund"
              }
            ]
          }
        },
        {
          "name": "systemPrgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "crowdfundAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "crowdfundPda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "crowdfundAuthority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "crowdFund",
      "discriminator": [
        153,
        206,
        145,
        155,
        118,
        252,
        99,
        114
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "titleTooLong",
      "msg": "Cannot initialize, title too long"
    },
    {
      "code": 6001,
      "name": "descriptionTooLong",
      "msg": "Cannot initialize, description too long"
    }
  ],
  "types": [
    {
      "name": "crowdFund",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crowdfundAuthority",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "collected",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
