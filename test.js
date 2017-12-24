

function getJokerMsg(string) {
    const rand = Math.round((Math.random() * 10)) % 5;
    const joker = [
        `${string}是什么呀，可以吃吗？`,
        `不要拿${string}来逗我呀！`,
        `${string}?是不是什么羞羞的东西?`,
        `${string}不要再拿这个来逗我了！它不能吃，对吧？`,
        `嘻嘻,我不知道什么是${string}噢，你是不是打错字啦？`
    ];
    console.log(joker[rand])
    return joker[rand];
}

getJokerMsg('哈哈');