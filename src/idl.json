{
  "address": "CgUbsFCLHLK6df1Xfg9zPqFqsPRRM35QdpdvK9b87jMy",
  "metadata": {
    "name": "crowdfund",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "close_fundraiser",
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
          "name": "crowdfund_authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "crowdfund_pda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "crowdfund_authority"
              }
            ]
          }
        },
        {
          "name": "system_program",
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
                "account": "CrowdFund"
              }
            ]
          }
        },
        {
          "name": "system_prgram",
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
          "name": "crowdfund_authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "crowdfund_pda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "crowdfund_authority"
              }
            ]
          }
        },
        {
          "name": "system_program",
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
      "name": "CrowdFund",
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
      "name": "TitleTooLong",
      "msg": "Cannot initialize, title too long"
    },
    {
      "code": 6001,
      "name": "DescriptionTooLong",
      "msg": "Cannot initialize, description too long"
    }
  ],
  "types": [
    {
      "name": "CrowdFund",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crowdfund_authority",
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
}
