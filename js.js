const map = document.querySelector('#map');

function createDiv(color) {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    div.style.top = 50 + parseInt(Math.random() * 10) * 50 + 'px';
    div.style.left = 100 + parseInt(Math.random() * 10) * 50 + 'px';
    div.style.borderRadius = 20 + 'px'
    map.appendChild(div);
    return div
}
// 创建蛇头
const headNode = createDiv('red');
// 蛇头默认移动方向
headNode.value = 'north';
// 创建食物
const foodNode = createDiv('blue');
// 创建蛇的身体
let bodyNodes = [];
// 创建移动函数
function move() {
    // 身体移动
    if (bodyNodes.length > 0) {
        for (let index = bodyNodes.length - 1; index >= 0; index--) {
            // 贪吃蛇死亡情况————吃到自己的身体
            if (headNode.style.top == bodyNodes[index].style.top && headNode.style.left ==
                bodyNodes[index].style.left) {
                alert('吃到自己了!')
                clearInterval(timer)
            }
            switch (bodyNodes[index].value) {
                case 'north':
                    bodyNodes[index].style.top = parseInt(bodyNodes[index].style.top) - 50 + 'px';
                    break;
                case 'south':
                    bodyNodes[index].style.top = parseInt(bodyNodes[index].style.top) + 50 + 'px';
                    break;
                case 'west':
                    bodyNodes[index].style.left = parseInt(bodyNodes[index].style.left) - 50 + 'px';
                    break;
                case 'east':
                    bodyNodes[index].style.left = parseInt(bodyNodes[index].style.left) + 50 + 'px';
                    break;
                default:
                    break;
            }
            if (index == 0) {
                bodyNodes[index].value = headNode.value
            } else {
                bodyNodes[index].value = bodyNodes[index - 1].value;
            }
        }
    }
    // 头部移动
    switch (headNode.value) {
        case 'north':
            headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
            break;
        case 'south':
            headNode.style.top = parseInt(headNode.style.top) + 50 + 'px';
            break;
        case 'west':
            headNode.style.left = parseInt(headNode.style.left) - 50 + 'px';
            break;
        case 'east':
            headNode.style.left = parseInt(headNode.style.left) + 50 + 'px';
            break;
        default:
            break;
    }
    // 贪吃蛇死亡情况————撞墙
    if (parseInt(headNode.style.left) < 100 || parseInt(headNode.style.left) > 550 || parseInt(headNode.style.top) < 50 || parseInt(headNode.style.top) > 500) {
        clearInterval(timer);
        alert('撞墙了撞墙了');
        alert('请点击重新开始游戏方可')
    }
    // 小蛇吃到食物   相互碰撞   搭建小蛇的身体      食物的更新
    if (headNode.style.top == foodNode.style.top && headNode.style.left == foodNode.style.left) {
        // 产生一个新的身体    身体位于末节点的后面
        let bodyNode = createDiv('yellow');
        let lastNode;
        if (bodyNodes.length > 0) {
            lastNode = bodyNodes[bodyNodes.length - 1]
        } else {
            lastNode = headNode;
        }
        switch (lastNode.value) {
            case 'north':
                bodyNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
                bodyNode.style.left = parseInt(lastNode.style.left) + 'px';
                break;
            case 'south':
                bodyNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
                bodyNode.style.left = parseInt(lastNode.style.left) + 'px';
                break;
            case 'west':
                bodyNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
                bodyNode.style.top = parseInt(lastNode.style.top) + 'px';
                break;
            case 'east':
                bodyNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
                bodyNode.style.top = parseInt(lastNode.style.top) + 'px';
                break;
            default:
                break;
        }
        bodyNode.value = lastNode.value;
        bodyNodes.push(bodyNode)
        // 得分score
        const score = h1.children[0];
        score.innerHTML = bodyNodes.length * 10;
        // 食物位置的更新（防止食物与蛇重合）
        let foodNodex = 100 + parseInt(Math.random() * 10) * 50
        let foodNodey = 50 + parseInt(Math.random() * 10) * 50
        for (let index = 0; index < bodyNodes[index].length; index++) {
            if (parseInt(bodyNodes[index].style.left) == foodNodex &&
                parseInt(bodyNodes[index].style.top) == foodNodey) {
                foodNodex = 100 + parseInt(Math.random() * 10) * 50
                foodNodey = 50 + parseInt(Math.random() * 10) * 50
                index = -1
            }
        }
        foodNode.style.top = foodNodey + 'px';
        foodNode.style.left = foodNodex + 'px';
    }
}
// 键盘上下左右键控制小蛇头部的移动
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:
            headNode.value = 'west';
            break;
        case 38:
            headNode.value = 'north';
            break;
        case 39:
            headNode.value = 'east';
            break;
        case 40:
            headNode.value = 'south';
            break;
        default:
            break;
    }
})
// 速度设置
const pattern = document.querySelector('.pattern');
const h1 = pattern.children[0];
const fast = pattern.children[1];
const slow = pattern.children[2];
const medium = pattern.children[3];
// 默认移动速度
let timer = setInterval(move, 500);
fast.addEventListener('click', function () {
    clearInterval(timer);
    timer = setInterval(move, 300);
})
slow.addEventListener('click', function () {
    clearInterval(timer);
    timer = setInterval(move, 700);
})
medium.addEventListener('click', function () {
    clearInterval(timer);
    timer = setInterval(move, 500);
})
// 重新开始游戏
const restart = document.querySelector('.restart')
restart.addEventListener('click', function () {
    location.reload(true)
})
// 暂停游戏
const gameover = document.querySelector('.gameover')
gameover.addEventListener('click',function(){
    clearInterval(timer)
})
// 继续游戏
const gogame = document.querySelector('.gogame')
gogame.addEventListener('click',function(){
    timer = setInterval(move, 500);
})
// 时间
const time =document.querySelector('.time')
time.innerHTML = Date()
setInterval(function(){
    time.innerHTML = Date()
},1000)