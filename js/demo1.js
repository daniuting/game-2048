window.onload = function () {

    /**
     * 1. 监听用户（键盘）按键（手势）事件
     * 2. 当用户触发了对应的动作
     *      
     * 
     * 
     */

    let imgs = document.querySelectorAll('img');

    document.onkeydown = function (e) {

        switch (e.keyCode) {    // 当前按下的键对应的键值
            case 37:
                // ←
                console.log('←');
                // 分组处理我们的div

                /**
                 * 1. 从第0个开始，取出第0个的值和第一个的值进行比较
                 * 2. 如果两个的值相同，则对这两个值进行相加，把相加的结果赋值给第0个，同时把第1个的值设置成空
                 * 
                 * 1. 设置i=0;
                 *  把第i个和第j=i+1个的值进行比较，可能会有如下几种情况
                 * 
                 *  - i的值 = ''，那么i++
                 *  - i的值 != j的值，i++，继续下一位的比较
                 *  - i的值 == j的值，i=i+j的值,j=''
                 */
                
                 for (let i=0; i<4; i++) {  // 用i表示指针，一开始指向0

                    // console.log(imgs[i].getAttribute('value'));

                    let iv = Number(imgs[i].getAttribute('value'));

                    if ( iv != 0 ) {
                        let jv = Number(imgs[i+1].getAttribute('value'));
                        
                        if (iv == jv) {
                            // imgs[i].src = '';
                            imgs[i].setAttribute('value', iv + jv);
                            imgs[i+1].setAttribute('value', 0);
                        }
                    }

                 }

                break;
            case 38:
                // ↑
                console.log('↑');
                break;
            case 39:
                // →
                console.log('→');
                break;
            case 40:
                // ↓
                console.log('↓');
                break;
        }

    }

}