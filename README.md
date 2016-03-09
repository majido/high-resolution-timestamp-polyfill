# High-Resolution Timestamp Polyfill [![Build Status](https://travis-ci.org/majido/high-resolution-timestamp-polyfill.svg?branch=master)](https://travis-ci.org/majido/high-resolution-timestamp-polyfill)

## Introduction

This repository hosts utilities to help with Event.timeStamp transition from
[```DOMTimeStamp```][timestamp-mdn] to
[```DOMHighResTimeStamp```][highres-timestamp-mdn].

## Background

Browsers ([Chrome][chrome-bug], [Firefox][firefox-bug]) and the [DOM spec]
[spec-bug] are in the process of updating event timestamp from being a
```DOMTimeStamp``` to a ```DOMHighResTimeStamp```.


[```DOMTimeStamp```][timestamp-mdn] is a time value in milliseconds relative to
an arbitrary epoch. Most browsers use system epoch making the value comparable
to ```Date.now()``` in those browsers. In contrast [```DOMHighResTimeStamp```]
[highres-timestamp-mdn] is a time value in milliseconds but with microseconds
precision (i.e., decimal component) which is relative to
[performance.timing.navigationStart][navigation-start-mdn] making it comparable
to ```performance.now()```.

To better understand the potential impact of this change in existing code please
read the more detailed [blog post][blogpost] by [Jeff Posnick](https://twitter.com/jeffposnick)
on Chrome Developer's blog.


## Details

* [Conversion function][conversion]: A simple cross-browser utility function
  that allows translation of event timestamp to a DOMHighResTimeStamp.

* [Polyfill (work in progress)][polyfill]: Makes Event.timeStamp to always be
  a DOMHighResTimeStamp. This is WIP as it does not work well in Safari yet. Safari support requires a fix for [this WebKit bug][webkit-limitation] that
  prevents overriding getter and setter on the prototype.

## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)


[timestamp-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTimeStamp
[highres-timestamp-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
[navigation-start-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/navigationStart
[chrome-bug]: https://www.chromestatus.com/features/5523910145605632
[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1026804
[spec-bug]: https://github.com/whatwg/dom/issues/23
[webkit-limitation]: https://bugs.webkit.org/show_bug.cgi?id=49739

[blogpost]: https://developers.google.com/web/updates/2016/01/high-res-timestamps?hl=en

[conversion]: https://github.com/majido/high-resolution-timestamp-polyfill/blob/master/translate-timeStamp.js
[polyfill]: https://github.com/majido/high-resolution-timestamp-polyfill/blob/master/high-resolution-timestamp-polyfill.js


