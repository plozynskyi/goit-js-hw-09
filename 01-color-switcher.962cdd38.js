const t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.startButton.addEventListener("click",(function(){t.startButton.setAttribute("disabled","disabled"),t.stopButton.removeAttribute("disabled"),timerId=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopButton.addEventListener("click",(function(){t.startButton.removeAttribute("disabled"),t.stopButton.setAttribute("disabled","disabled"),clearInterval(timerId)}));
//# sourceMappingURL=01-color-switcher.962cdd38.js.map