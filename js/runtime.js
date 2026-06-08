(function() {
  // 等待 DOM 加载完成
  function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      setTimeout(() => waitForElement(selector, callback), 100);
    }
  }

  // 创建时间显示元素
  function createTimeDisplay() {
    // 检查是否已存在时间显示元素
    if (document.getElementById('timeDate')) return;

    const timeContainer = document.createElement('div');
    timeContainer.innerHTML = `
      <span id="timeDate">正在载入天数...</span>
      <span id="times">载入时分秒...</span>
    `;

    // 创建并插入脚本
    const script = document.createElement('script');
    script.textContent = `
      var now = new Date();
      function createtime(){
          var grt= new Date("02/07/2026 00:00:00");  //月/日/年
          now.setTime(now.getTime()+250);
          days = (now - grt ) / 1000 / 60 / 60 / 24;
          dnum = Math.floor(days);
          hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum);
          hnum = Math.floor(hours);
          if(String(hnum).length ==1 ){
              hnum = "0" + hnum;
          }
          minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
          mnum = Math.floor(minutes);
          if(String(mnum).length ==1 ){
                    mnum = "0" + mnum;
          }
          seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
          snum = Math.round(seconds);
          if(String(snum).length ==1 ){
                    snum = "0" + snum;
          }
          document.getElementById("timeDate").innerHTML = "🚀已持续航行&nbsp"+dnum+"&nbsp天";  
          document.getElementById("times").innerHTML = hnum + "&nbsp时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
      }
      setInterval("createtime()",250);
    `;
    
    timeContainer.appendChild(script);

    // 插入到 footer 中
    const footer = document.querySelector('.footer-inner');
    if (footer) {
      footer.appendChild(timeContainer);
    } else {
      document.body.appendChild(timeContainer);
    }
  }

  // 确保 DOM 加载完成后再执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTimeDisplay);
  } else {
    createTimeDisplay();
  }
})();
