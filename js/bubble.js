
(function () {
    // 仅在首页根路径且无查询参数时执行
    if (window.location.pathname !== "/" || window.location.search !== "") {
        return;
    }

    // 创建气泡容器
    const bubbleContainer = document.createElement("div");
    bubbleContainer.style.height = "500px";
    bubbleContainer.id = "bubbles";

    // 查找主页背景容器并添加气泡层
    const homePage = document.querySelector(".full-bg-img");
    if (!homePage) {
        console.warn("未找到.home-bg-img元素，无法添加气泡效果");
        return;
    }
    homePage.appendChild(bubbleContainer);
    
    // 启动气泡动画
    circleMagic();

    // 气泡动画核心实现
    function circleMagic(options) {
        let width;
        let height;
        let canvas;
        let ctx;
        let animateHeader = true;
        const circles = [];

        // 默认配置参数
        const settings = options || {
            color: 'rgba(255,255,255,.3)',
            radius: 10,
            density: 0.1,
            clearOffset: 0.7
        }

        // 获取气泡容器
        const container = document.getElementById('bubbles');
        if (!container) {
            console.warn("未找到#bubbles元素");
            return;
        }
        
        // 初始化容器和事件监听
        initContainer();
        addListeners();

        // 容器初始化
        function initContainer() {
            width = container.offsetWidth;
            height = container.offsetHeight - 120;

            initCanvas();
            canvas = document.getElementById('homeTopCanvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.position = 'absolute';
            canvas.style.left = '0';
            canvas.style.bottom = '0';
            ctx = canvas.getContext('2d');

            // 创建气泡对象
            for (let x = 0; x < width * settings.density; x++) {
                const c = new Circle();
                circles.push(c);
            }
            animate();
        }

        // 创建Canvas元素
        function initCanvas() {
            const canvasElement = document.createElement('canvas');
            canvasElement.id = 'homeTopCanvas';
            canvasElement.style.pointerEvents = 'none';
            container.appendChild(canvasElement);
            canvasElement.parentElement.style.overflow = 'hidden';
        }

        // 添加事件监听器
        function addListeners() {
            window.addEventListener('scroll', scrollCheck, false);
            window.addEventListener('resize', resize, false);
        }

        // 滚动检查
        function scrollCheck() {
            if (document.body.scrollTop > height) {
                animateHeader = false;
            } else {
                animateHeader = true;
            }
        }

        // 窗口大小调整处理
        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            container.height = height + 'px';
            canvas.width = width;
            canvas.height = height;
        }

        // 动画循环
        function animate() {
            if (animateHeader) {
                ctx.clearRect(0, 0, width, height);
                for (const i in circles) {
                    circles[i].draw();
                }
            }
            requestAnimationFrame(animate);
        }

        // 随机颜色生成
        function randomColor() {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            const alpha = Math.random().toPrecision(2);
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }

        // 气泡对象构造函数
        function Circle() {
            const that = this;
            (function () {
                that.pos = {};
                init();
            })();
            
            // 初始化气泡属性
            function init() {
                that.pos.x = Math.random() * width;
                that.pos.y = height + Math.random() * 100;
                that.alpha = 0.1 + Math.random() * settings.clearOffset;
                that.scale = 0.1 + Math.random() * 0.3;
                that.speed = Math.random();
                if (settings.color === 'random') {
                    that.color = randomColor();
                } else {
                    that.color = settings.color;
                }
            }
            
            // 绘制气泡
            this.draw = function () {
                if (that.alpha <= 0) {
                    init();
                }
                that.pos.y -= that.speed;
                that.alpha -= 0.0005;
                ctx.beginPath();
                ctx.arc(
                    that.pos.x,
                    that.pos.y,
                    that.scale * settings.radius,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fillStyle = that.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
})();
