
document.addEventListener('DOMContentLoaded', function() {
    (function() {
        let isEnabled = true;  //这里可以设置是否自动开启
        let a_idx = 0;
        
        // 创建控制按钮
        function createToggleButton() {
            const container = document.createElement('div');
            container.id = 'click-effect-control';
            container.style.position = 'fixed';
            container.style.bottom = '30px';
            container.style.right = '30px';
            container.style.zIndex = '9999';
            
            const button = document.createElement('button');
            button.id = 'effect-toggle';
            button.innerHTML = '✨';
            button.style.width = '56px';
            button.style.height = '56px';
            button.style.borderRadius = '50%';
            button.style.background = isEnabled ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '2px solid #ffffff';;
            button.style.border = '2px solid #e2e8f0';
            button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            button.style.cursor = 'pointer';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.fontSize = '20px';
            button.style.color = '#718096';
            button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            button.style.outline = 'none';
            
            const indicator = document.createElement('div');
            indicator.id = 'effect-status';
            indicator.style.position = 'absolute';
            indicator.style.top = '-2px';
            indicator.style.right = '-2px';
            indicator.style.width = '14px';
            indicator.style.height = '14px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = isEnabled ? '#10b981' : '#ef4444';
            indicator.style.border = '2px solid #ffffff';
            
            container.appendChild(button);
            container.appendChild(indicator);
            document.body.appendChild(container);
            
            return { button, indicator };
        }
        
        // 切换特效状态
        function toggleEffect() {
            isEnabled = !isEnabled;
            
            const toggleBtn = document.getElementById('effect-toggle');
            const statusIndicator = document.getElementById('effect-status');
            
            if (isEnabled) {
                toggleBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                toggleBtn.style.color = '#ffffff';
                statusIndicator.style.backgroundColor = '#10b981';
            } else {
                toggleBtn.style.background = '#ffffff';
                toggleBtn.style.color = '#718096';
                statusIndicator.style.backgroundColor = '#ef4444';
            }
        }
        
        // 文案数组
        const wordList = [
            "人间总有一两风，填我十万八千梦",
            "只有夜足够黑，才能看到繁星闪烁",
            "花谢花飞花满天，红消香断有谁怜",
            "在世间，本就是各人下雪，各人有各人的隐晦和皎洁",
            "我与天地周旋久,写尽梦,便成梦",
            "我打碎了夕阳 留下满眼仓惶 来这人间一趟 只为碎银几两 落得半生茫茫",
            "Everything that kills me makes me feel alive",
            "总有人间一两风，圆我十万八千梦",
            "以我自己的选择，去到我自己的结局",
            "每一次抉择都是一场主动求变，每一次抉择都期待一次苦尽甘来",
            "醉后不知天在水,满船清梦压星河",
            "山有木兮卿有意 昨夜星辰恰似你",
            "phantom thief",
            "A person who is regarded as a loser isn't those ordinarys ,but the satisfieds",
            "去白日之昭昭兮，袭长夜之悠悠",
            "桃李春风一杯酒，江湖夜雨十年灯",
            "无人扶我青云志，我自踏雪至山巅",
            "我与旧事归于尽，来年依旧迎花开",
            "愿与你纵横七海，请伴我览遍千秋",
            "青春属于表白，阳光属于窗台，而我想我属于一个拥有你的未来",
            "纸上的彩虹，用素描画的钟，我还在修改回忆之中你的笑容，该怎么去形容为思念酝酿的痛？！",
            "循此苦旅，以达天际。穿越逆境，直抵繁星",
            "我多么想你能变成我永不凋零的花朵，但时间不会让你永远地停泊",
            "才子佳人鸳鸯愿 谁成全",
            "Here's To Never Growing Up",
            "纵豆蔻词工 青楼梦好 难赋深情",
            "二十四桥仍在 波心荡 冷月无声",
            "念桥边红药 年年知为谁生",
            "回头看，轻舟已过万重山",
            "『自从遇见你，凛冬散尽，星河长明』",
            "「愿，自己不再辜负自己，奇迹不再辜负奇迹。」",
            "欲买桂花同载酒 终不似 少年游"
        ];
        
        // 初始化按钮
        const { button } = createToggleButton();
        
        // 绑定按钮事件
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleEffect();
        });
        
        // 点击事件处理
        document.body.addEventListener('click', function(e) {
            if (!isEnabled) return;
            
            // 防止按钮自身触发特效
            if (e.target.closest('#click-effect-control')) {
                return;
            }
            
            let text = wordList[a_idx];
            a_idx = (a_idx + 1) % wordList.length;
            
            let span = document.createElement('span');
            span.className = 'click-word-effect';
            span.textContent = text;
            span.style.left = `${e.pageX}px`;
            span.style.top = `${e.pageY - 20}px`;
            span.style.position = 'absolute';
            span.style.fontWeight = 'bold';
            span.style.pointerEvents = 'none';
            span.style.userSelect = 'none';
            span.style.zIndex = '9999';
            span.style.animation = 'floatUp 3s ease-out forwards';
            
            // 设置随机颜色
            const r = 155 + ~~(100 * Math.random());
            const g = 155 + ~~(100 * Math.random());
            const b = 155 + ~~(100 * Math.random());
            span.style.color = `rgb(${r}, ${g}, ${b})`;
            
            document.body.appendChild(span);
            
            // 动画结束后移除DOM元素
            setTimeout(() => {
                if (span.parentNode === document.body) {
                    document.body.removeChild(span);
                }
            }, 3000);
        });
        
        // 添加CSS动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% { 
                    transform: translateY(0); 
                    opacity: 1; 
                }
                100% { 
                    transform: translateY(-160px); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    })();
});
