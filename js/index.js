window.onload = function () {
    const divs = document.getElementById('con').getElementsByTagName('div');
    const imgs = document.querySelectorAll('img');

    random ();

    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('transitionend', function () {
            this.style.left = 0;
            this.style.right = 0;
            this.style.top = 0;
            this.style.bottom = 0;
            this.style.transition = 'none';
        });
    }

    document.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
            handle('left');
        } else if (e.keyCode === 38) {
            handle('top');
        } else if (e.keyCode === 39) {
            handle('right');
        } else if (e.keyCode === 40) {
            handle('bottom');
        }
    });

    let canMove= true;
    function handle (type) {
        if (!canMove) return;
        canMove = false;
        let arr = calc_direction(type, 16);
        let maxTime = 0;

        arr.forEach(cycle => {
            let value = cycle.map(num => {
                return Number(imgs[num].getAttribute('value'))
            })

            let result = calc(value);

            let attr,count,isReverse;
            if (type === 'left' || type === 'right') {
                attr = 'left';
                count = 80;
                isReverse = type === 'left' ? -1 : 1;
            } else {
                attr = 'top';
                count = 109;
                isReverse = type === 'top' ? -1 : 1;
            }

            result.forEach(item => {
                let start = cycle[item.start];
                let end = cycle[item.end];
                let time = (item.start - item.end) * 0.1;
                divs[start].style.transition = `${time}s linear`;
                divs[start].style[attr] = isReverse * (item.start - item.end) * count + 'px';
                maxTime = time > maxTime ? time : maxTime;
                setTimeout(() => {
                    imgs[start].setAttribute('value', 0);
                    imgs[start].src = `img/cube_0.png`
                    imgs[end].setAttribute('value', item.value)
                    imgs[end].src = `img/cube_${item.value}.png`
                }, time * 1000)
            });
        });
        setTimeout(() => {
            canMove = true;
            random ();
        }, maxTime * 1000)
    }

    function calc_direction (type, number) {
        let step = Math.sqrt(number);

        if(step !== Math.round(step)) {
            alert('参数应为平方数')
            return;
        }

        let totalArr = Array(number).fill(0).map((item, index) => index);
        let arr = Array(step).fill(0);

        switch (type) {
            case 'left':
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = totalArr.slice(step * i, step * (i + 1));
                }
                break;
            case 'right':
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = totalArr.slice(step * i, step * (i + 1)).reverse();
                }
                break;
            case 'top':
                for (var i = 0; i < totalArr.length; i++) {
                    arr[i % step] ? arr[i % step].push(i) : arr[i % step] = [i];
                }
                break;
            case 'bottom':
                for (var i = 0; i < totalArr.length; i++) {
                    arr[i % step] ? arr[i % step].push(i) : arr[i % step] = [i];
                }
                arr.map(item => item.reverse());
                break;
        }
        return arr;
    }

    function calc (arr) {
        let moveArr = [];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] === 0) {
                continue;
            }

            for (var j = 0; j <= i; j++) {
                if (arr[j] === 0 || arr[j] === arr[i]) {
                    break;
                }
            }

            if (j < i) {
                arr[j] = arr[j] === 0 ? arr[i] : arr[i] + arr[j];
                arr[i] = 0;
                moveArr.push({
                    start: i,
                    end: j,
                    value: arr[j]
                })
                
            }
        }

        return moveArr;
    }

    function random () {
        let arr = Array(16).fill(0).map((item,index) => {
            if (Number(imgs[index].getAttribute('value'))) {
                return null;
            } else {
                return index;
            }
        }).filter(item => item !== null);

        if (arr.length === 0) {
            alert('你输了');
        }

        let index = arr[Math.floor(arr.length * Math.random())];
        imgs[index].setAttribute('value', 2);
        imgs[index].src = `img/cube_2.png`;
    }
}