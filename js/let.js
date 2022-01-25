const log = console.log.bind(console)

// {
//     let a = 1
//     log('里面', a)
// }

// log('外面', a)

// {
//     var b = 1
// }

// function fun() {
//     var a = 1
//     log('b', b)
// }

// fun()

// log('外面 a', a)

const c = {
    k: 1,
}

c.k = 2

log('c', c)