const log = console.log.bind(console)

const e = selector => document.querySelector(selector)

// const e = (sel) => {
//     return document.querySelector(selector)
// }

const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

const bindEvent = (ele, eventName, callback) => {
    ele.addEventListener(eventName, callback)
}