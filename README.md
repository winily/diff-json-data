# diff-json-data

## Install

```shell
npm install -g diff-json-data
# or
yarn add -global diff-json-data
```

## E.g

data1

```json
{
  "IsPrint": false,
  "data": {
    "log_id": "5636805825537214258",
    "action_rule": {
      "pos_1": [],
      "pos_2": [],
      "pos_3": []
    }
  },
  "action_rule": {
    "pos_1": [],
    "pos_2": [],
    "pos_3": []
  },
  "pos_1": [],
  "pos_2": [],
  "pos_3": [],
  "log_id": "5636805825537214258",
  "errmsg": "ok",
  "errno": 0
}
```

data2

```json
{
  "IsPrint": false,
  "data": {
    "log_id": "5636805825537214255",
    "action_rule": {
      "pos_1": [],
      "pos_2": [],
      "pos_3": []
    }
  },
  "action_rule": {
    "pos_1": [],
    "pos_2": [],
    "pos_3": []
  },
  "pos_1": [],
  "pos_2": [],
  "pos_3": [],
  "log_id": "5636805825537214256",
  "errmsg": "ok",
  "errno": 0
}
```

```shell
diffjs -c path ./data1.json ./data2.json key value1 value2
```

output ./result.json

```json
{
  "data": {
    "log_id": {
      "diff": "inconsistent value!",
      "value1": "5636805825537214258",
      "value2": "5636805825537214255"
    }
  },
  "log_id": {
    "diff": "inconsistent value!",
    "value1": "5636805825537214258",
    "value2": "5636805825537214256"
  }
}
```
