---
layout: post
title: Some thoughts on CI/CD and automation
categories: [CI/CD, Automation]
excerpt: 'I recently read an article recommended by a college. It started with "The moral of the story is, don’t treat the symptoms: treat the cause." [...]'
---

I recently read an article recommended by a college. It started with *"The moral of the story is, don’t treat the symptoms: treat the cause."* . The article was published a few weeks ago on [Stack Overflow Blog](https://stackoverflow.blog/2021/01/19/fulfilling-the-promise-of-ci-cd/) and I don't want to repeat the content here as you really should read the article yourself! 

Anyway, after reading it I really started thinking about the matter a lot. I thought I'd do a lot CI/CD in the past myself, but is this really true? To be frank, only partly. I'm a huge fan of automation including: 

* Unit / Integration tests
* Automated quality checks 
* Custom shell extensions / scripts for recurring tasks
* Documentation creation (API docs, Plantuml etc)

And of course automating as much of it using CI. But beside a few components I never really dig into CD a lot. The answer of course is not as easy, as it partly was due to the structure of the organization I was working in, the project structure, but most importantly and that's the true cause if I really think about it: I was afraid of it! 

What if the auto deploy breaks the environment? What if people get mad because I suggested it? ... and so I did not do it. Probably you had similar thoughts yourself before. Of course there are technical reasons as well, but you can solve them if you really grieve for the CD automation. 

So I did read this article and recapped why I'm not doing it. In the end all reasons seem really half-hearted. Like I was usually one of the people deploying manually. That also broke the environment. And I rolled it back. I could've rolled it back myself as well after auto deploy. But I would've saved a lot of time deploying in the first step. 

Luckily a college is working on CD right now on my new job. It's actually not the same who suggested the article, and I'm super hyped about it! If I can help by any means to support this I'm all in for it! And probably it will change my way of working as much as it did when I started using CI / test automation heavily. I'm really looking forward to auto deploy my first increment of a feature on my new job next week :). 

One more thing ... 

Actually a few weeks ago I stumbled across [Upptime](https://github.com/upptime/upptime). If you're interested how to utilize [GitHub Actions](https://github.com/features/actions) not only as a CI/CD but also as a "Serverless" computation platform you should check it out! 
I'd like to be as clever as those peeps to having such a brilliant idea myself one day.
