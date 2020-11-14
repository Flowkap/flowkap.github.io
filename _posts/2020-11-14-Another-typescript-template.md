---
layout: post
title: Another typescript template
categories: [Typescript,Nodejs]
excerpt: Yes I did it. Another [typescript template](https://github.com/Flowkap/typescript-node-template) has made it into existence. Why did I do this? ...
---

Yes I did it. Another [typescript template](https://github.com/Flowkap/typescript-node-template) has made it into existence. Why did I do this? More boilerplate on the internet will not help you might say, contribute to an existing one you might say, and you're of course not wrong. Kind of. The reason is the following: Node.js is still a very versatile environment with many many things and libs to choose from. Also a lot of the popluar ones changed over time. A lot. And thats what made me start this project: Incompatibilities in between [mocha](https://mochajs.org/) [nyc](https://github.com/istanbuljs/nyc) and typescript to be specific.

It made my brain hurt to make it work again with recent version (mocha 8.x.x and nyc 15.x.x). Don't get me wrong I love those tools but they had several compatibility issues during the last 12 months that do make live harder for many people. Actually after researching I found out that they fixed many bugs that were happening occasionally and creating non deterministic results from time to time.

The problem that comes with it is wrong docs all over the internet. You know how it is, you find an upvoted answer on Stackoverflow and you try it out. It doesnt work cause you  overlooked that the response is like 3 years old. The libs / tools changed and the response is not valid anymore. This is very much the case with docs on the combination `mocha + nyc + typescript`.

Let me give you one example: We had it working on my job without [ts-node](https://github.com/TypeStrong/ts-node) for ages but actually had strange issues from time to time. Also our setup never covered files that were not loaded by mocha at all (or any test of course). But the `all: true` setting made issues in the past. The [current docs](https://www.npmjs.com/package/@istanbuljs/nyc-config-typescript) are pretty good but did also not work for me as I had custom glob patterns. So I ended up plaing around in the evenings to find a proper working way also eliminating things that always bothered me. and the result is basically this config:

**.mocharc.yml**

```yml
require:
  - ts-node/register
  - source-map-support/register
recursive: true
color: true
exit: true
extension:
  - ts
  - test.ts
```

**.nycrc.yml**
```yml
extends: "@istanbuljs/nyc-config-typescript"

reporter:
  - html
  - lcovonly
  - clover
  - text
  - text-summary
report-dir: coverage

```

And of course the call config in **package.json**

```json
"test": "npm run lint && nyc mocha src test",
```

For instance did I not know mocha can have config files in this new format. Found out that feature is not that old and I missed it. That made me actually start the repo. What about other stuff that I frequently use?

* Linting ([eslint](https://github.com/eslint/eslint) of course as [tslint](https://github.com/palantir/tslint) is deprecated)
* [VsCode](https://code.visualstudio.com/) config
* Unit Tests using [sinon](https://github.com/sinonjs/sinon) for stubs / mocks / spies
* Example code for the typical webserver use case using [fastify](https://github.com/fastify/fastify)

So I sat down and started it. The final config is a lot more clean, does not need any taskrunners like [gulp](https://github.com/gulpjs/gulp) anymore and all config is in files where possible. Wilst sitting on that example I did actually find more small issues that made coverage suddenly broken (when starting with mocks and stubbing the demo code) and it was as small stuff as a wrong `**` in the globs. Or nyc treating everything after the first `.` as file ending making a glob pattern like `**/*.ts` not macht for a file like `src/abc.test.ts`.

As I wanted to try out [Travis-Ci](https://travis-ci.com/) and [codecov](https://codecov.io/) since quite some time I did do that in one go. The end result is my repo on Github:

https://github.com/Flowkap/typescript-node-template

It might be another template noone needs, but in the end I'm happy with my template for my private use and I would be super happy if someone can find it useful for starting with Typescript or migrating to newer versions of all our beloved open source tools. :smiley: