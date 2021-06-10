(function () {
    this.animation = (function () {
        function animation(options) {
            this.default = { selector: ".zk-animate", animated: "animate__animated", animation: "animate__fadeInUp" };
            Object.assign(this.default, options);
        }
        animation.prototype.doAnimate = function () {
            for (let i = 0; i < this.elements.length; i++) {
                const element = this.elements[i];

                if (Number(element.dataset.offsetTop) <= window.scrollY + window.innerHeight) {
                    element.style.setProperty("animation-play-state", null);
                    this.elements.splice(i, 1);
                    i--;
                }
            }
        };
        animation.prototype.init = function () {
            this.elements = [];
            var matchedElements = document.querySelectorAll(this.default.selector);
            for (let i = 0; i < matchedElements.length; i++) {
                const element = matchedElements[i];
                var rec = element.getBoundingClientRect();
                if (rec.top > window.innerHeight) {
                    element.dataset.offsetTop = rec.top;
                    element.style.setProperty("animation-play-state", "paused");
                    element.classList.add(this.default.animated, this.default.animation);                    
                    this.elements.push(element);
                }
            }
            var animationInstance = this;
            window.addEventListener("scroll", function () {
                if (animationInstance.animationTime) clearTimeout(animationInstance.animationTime);

                animationInstance.animationTime = setTimeout(animateCaller, 200);
            });
            function animateCaller() {
                animationInstance.doAnimate.call(animationInstance);
            }
        };
        return animation;
    })();
}).call(this);