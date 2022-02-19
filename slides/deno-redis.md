---
title: deno-redis
description: deno-redis
keywords: Deno
url: https://uki00a.github.io/slides/deno-redis
---

# deno-redisの紹介

<!-- _class: lead -->

---

## 簡単に自己紹介

@uki00a

- 仕事: Vue.js、Ruby、Goなど
- 興味: Deno、TypeScript、フロントエンドなど
- Deno歴2年です🙄

![bg right h:256](https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png)

---

## deno-redisとは?

https://github.com/denodrivers/redis

DenoのRedisクライアントライブラリ

開発者は[keroxp](https://github.com/keroxp)さんです。

---

## 基本

```ts
import { connect } from "https://deno.land/x/redis@v0.25.0/mod.ts";

const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});
const ok = await redis.set("foo", "bar");
console.assert(await redis.get("hoge") === "bar");
```

---

## PubSub

Publisher

```ts
const redis = await connect({ hostname: "127.0.0.1" });
await redis.publish("hoge", "Hello");
```

Subscriber

```ts
const redis = await connect({ hostname: "127.0.0.1" });
const sub = await redis.subscribe("hoge");
(async function () {
  for await (const { channel, message } of sub.receive()) {
    handleMessage(message);
  }
})();
```

---

## Redis Cluster ([v0.23.0](https://github.com/denodrivers/redis/releases/tag/v0.23.0)〜)

```ts
import { connect } from "https://deno.land/x/redis@v0.25.0/experimental/cluster/mod.ts";

const cluster = await connect({
  nodes: [
    {
      hostname: "127.0.0.1",
      port: 7000,
    },
    {
      hostname: "127.0.0.1",
      port: 7001,
    },
  ],
});

await cluster.get("{foo}bar");
```

正直なところ、まだ色々と足りてないです...

---

## 実際に使えるの？

まだ実践などで使うのは少し早いと考えています。

メジャーリリースはまだしておらず、今後破壊的変更を入れる可能性もあります。

---

## 今後について

v1をリリースしたい...

- RESP3の実装
- Redis Sentinelサポートの実装
- Redis Clusterサポートの向上
- パフォーマンスチューニング
- APIの見直し

---

## おわりに

もし使っていて気になるところとか意見とかがありましたら、

- ツイッター ([@uki00a](https://twitter.com/uki00a))
- deno-jaスラック
- Discordのdenodriversチャンネル
- GitHubのissue
