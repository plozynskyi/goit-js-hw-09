!function(){var t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.stopButton.setAttribute("disabled",!0);var e={timerId:null,start:function(){t.startButton.setAttribute("disabled",!0),t.stopButton.removeAttribute("disabled"),this.timerId=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)},stop:function(){t.startButton.removeAttribute("disabled"),t.stopButton.setAttribute("disabled",!0),clearInterval(this.timerId)}};t.startButton.addEventListener("click",(function(){e.start()})),t.stopButton.addEventListener("click",(function(){e.stop()})),console.log(e)}();
//# sourceMappingURL=01-color-switcher.4d1ad76c.js.map
