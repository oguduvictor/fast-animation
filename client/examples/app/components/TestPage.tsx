import * as React from 'react';
const doSvg1 = require('../assets/images/do-check.svg');
const easingCurve = require('../assets/images/easing-curve.svg');
const sass = require('../assets/styles/test-page.scss');
import ScrollTrigger from '[lib]/triggers/ScrollTrigger';
import ViewEnterTrigger from '[lib]/triggers/ViewEnterTrigger';
import ViewExitTrigger from '[lib]/triggers/ViewExitTrigger';

import AnimateTo from '[lib]/animateTo';
import AnimateFrom from '[lib]/animateFrom';
import { cubicBezier } from '[lib]/curves';
import AnimateGroup from '[lib]/animateGroup';
import AnimateSequence from '[lib]/animateSequence';

class TestPage extends React.Component {
    private scrollElement: HTMLElement;

    clickContainer1 = (e) => {
        let highlighter = document.getElementById('highlighter');
        let circle = e.currentTarget.querySelector('.ui-circle');
        let slide = new AnimateTo(highlighter, { y: e.currentTarget.offsetTop - 87 }, { duration: 250 });
        let bounceKeyframes = [
            { transform: "scale(1)" },
            { transform: "scale(2.2)", offset: .35 },
            { transform: "scale(2)", offset: .55 },
            { transform: "scale(0.9)", offset: .93 },
            { transform: "scale(1)" }
        ];

        let circleAnimation = new AnimateTo(circle, {}, { duration: 500, easing: cubicBezier('fastInOut') });
        circleAnimation.addKeyframes(bounceKeyframes);
        circleAnimation.play();
        slide.play();
    }

    clickContainer2 = (e) => {
        const bar = e.currentTarget.querySelector('.bar-fill');
        const diamond = e.currentTarget.querySelector('#diamond');
        const checkmark = e.currentTarget.querySelector('#doSvg1');

        const diamondFrames = [
            { transform: 'scale(1)' },
            { transform: 'scale(1.6)', offset: 0.75 },
            { transform: 'scale(0.95)', offset: 0.78 },
            { transform: 'scale(1.05)', offset: 0.81 },
            { transform: 'scale(0.97)', offset: 0.83 },
            { transform: 'scale(1)', offset: 0.85 },
            { transform: 'scale(1)'}
        ];

        const doSvgFrames = [
            { transform: 'scale(0)' },
            { transform: 'scale(1.1)', offset: .9 },
            { transform: 'scale(1)' }
        ];

        let barAnimation = new AnimateTo(bar, { scale: [138, 1], transformOrigin: '0 0'}, { duration: 5000 });
        let diamondAnimation = new AnimateTo(diamond, { transformOrigin: '50% 100%' }, { duration: 5000 });
        let doAnimation = new AnimateTo(checkmark, { transformOrigin: '50% 100%' }, { fill: 'both', delay: 4650, duration: 250 });

        doAnimation.addKeyframes(doSvgFrames);
        diamondAnimation.addKeyframes(diamondFrames);

        new AnimateGroup([
            barAnimation,
            diamondAnimation,
            doAnimation
        ]).play();
    }

    hoverContainer4 = (e) => {
        const darkSquare = e.currentTarget.querySelector('.dark-square');
        const mediumSquare = e.currentTarget.querySelector('.medium-square');
        const lightSquare = e.currentTarget.querySelector('.light-square');
        
        const fadeOptions = { opacity: 0 };
        const fadeEffect = { duration: 100 };
        
        const slideOptions = { x: 180 };
        const slideEffect = {
            duration: 300,
            fill: 'backwards' as AnimationEffectTimingFillMode,
            easing: cubicBezier('easeOut')
        };

        new AnimateGroup([
            new AnimateFrom(darkSquare, fadeOptions, fadeEffect),
            new AnimateFrom(darkSquare, slideOptions, slideEffect),
            new AnimateFrom(mediumSquare, fadeOptions, fadeEffect),
            new AnimateFrom(mediumSquare, slideOptions, Object.assign({}, slideEffect, { delay: 40 })),
            new AnimateFrom(lightSquare, fadeOptions, fadeEffect),
            new AnimateFrom(lightSquare, slideOptions, Object.assign({}, slideEffect, { delay: 80 })),
        ]).play();
   }

    clickContainer5 = (e) => {
        let lilsquare = e.currentTarget;
        let filler = lilsquare.parentNode.querySelector('.size-fill');
        let fillAnimation = new AnimateTo(filler, { scale: 1, transformOrigin: ' 0 0' }, { duration: 250, easing: cubicBezier('easeOutSmooth') });
        fillAnimation.play();
        lilsquare.classList.add('dark-square');
        lilsquare.classList.remove('medium-square');

        function swapBack() {
            lilsquare.classList.remove('dark-square');
            lilsquare.classList.add('medium-square');
        }

        window.setTimeout(() => {
            fillAnimation.reverse();
            swapBack();
        }, 2750);
    }

    clickContainer6 = (e) => {
        let lilcircle = e.currentTarget.querySelector('.circle-small');
        let bigcircle = e.currentTarget.querySelector('.circle-large');

        new AnimateGroup([
            new AnimateTo(lilcircle, { x: 200 }, { duration: 3000 }),
            new AnimateTo(lilcircle, { bottom: 260 }, { duration: 3000, easing: cubicBezier('fastInOut') }),
            new AnimateTo(bigcircle, { y: -200 }, { duration: 3000, easing: cubicBezier('fastInOut') })
        ]).play();
    }

    hoverContainer7 = (e) => {
        const square = e.currentTarget.querySelector('.medium-square');
        new AnimateFrom(square, { opacity: 0, x: 60 }, { duration: 250, easing: cubicBezier('easeOut') }).play();
    }

    clickContainer8 = (e) => {
        const row1 = e.currentTarget.querySelector('.row1');
        const row2 = e.currentTarget.querySelector('.row2');
        const row3 = e.currentTarget.querySelector('.row3');

        const fadeInOptions = { opacity: 1 };
        const fadeOutOptions = { opacity: 0 };
        const fadeInEffect = {
            duration: 350,
            easing: cubicBezier('fastInOut')
        };
        const fadeOutEffect = {
            delay: 4000,
            easing: cubicBezier('easeOut')
        };

        let sequence = new AnimateSequence([
            new AnimateTo(row1, fadeInOptions, fadeInEffect),
            new AnimateTo(row2, fadeInOptions, fadeInEffect),
            new AnimateTo(row3, fadeInOptions, fadeInEffect)
        ]);

        sequence.onFinish = () => {
            sequence.onFinish = sequence.pause.bind(sequence);

            window.setTimeout(sequence.reverse.bind(sequence), 3000);
        }
        
        sequence.play();
    }

    clickContainer9 = (e) => {
        const square1 = e.currentTarget.querySelector('#fourSquare1');
        const square2 = e.currentTarget.querySelector('#fourSquare2');
        const square3 = e.currentTarget.querySelector('#fourSquare3');
        const square4 = e.currentTarget.querySelector('#fourSquare4');
        const fadeKeyFrames = [
            { opacity: 1 },
            { opacity: 0, offset: 0.4 },
            { opacity: 0, offset: 0.8 },
            { opacity: 1 }
        ];

        const slideOptions = { y: -100 };
        const slideEffect = { duration: 750, easing: cubicBezier('fastInOut') };
        const square1Animation = new AnimateTo(square1, slideOptions, slideEffect);
        const square2Animation = new AnimateTo(square2, slideOptions, slideEffect);
        const square3Animation = new AnimateTo(square3, slideOptions, slideEffect);
        const square4Animation = new AnimateTo(square4, slideOptions, slideEffect);

        square1Animation.addKeyframes(fadeKeyFrames);
        square2Animation.addKeyframes(fadeKeyFrames);
        square2Animation.effectTiming.delay = 100;
        square3Animation.addKeyframes(fadeKeyFrames);
        square3Animation.effectTiming.delay = 200;
        square4Animation.addKeyframes(fadeKeyFrames);
        square4Animation.effectTiming.delay = 2000;

        let group = new AnimateGroup([
            square1Animation,
            square2Animation,
            square3Animation,
            square4Animation
        ]);

        group.play();

        window.setTimeout(() => {
            group.reverse();
        }, 3000);
    }

    componentDidMount() {
        let overlapping = document.getElementById('overlapping');
        let scrollTrigger = new ScrollTrigger();
        let viewEnterTrigger = new ViewEnterTrigger();
        let viewExitTrigger = new ViewExitTrigger();

        const lightSquare = overlapping.querySelector('.light-square');
        const mediumSquare = overlapping.querySelector('.medium-square');

        const effects: AnimationEffectTiming = {
            duration: 750,
            iterations: Infinity,
            direction: 'alternate',
            easing: cubicBezier('fastInOut')
        };

        new AnimateTo(lightSquare as HTMLElement, { scale: 2.27, transformOrigin: '0 50%' }, effects).play();
        new AnimateTo(mediumSquare as HTMLElement, { scale: 2.27, transformOrigin: '100% 50%' }, Object.assign({}, effects, { delay: 750 })).play();

        scrollTrigger.subscribe(this.scrollElement, (distance) => {
            // Save for debugging
            // console.log(distance);
        });
        viewEnterTrigger.subscribe(this.scrollElement, (distance) => {
            // Save for debugging
            // console.log('entered');
        });

        viewExitTrigger.subscribe(this.scrollElement, (distance) => {
            // Save for debugging
            // console.log('exited');
        });
    }

    render() {
        return (
            <div>
                <div className="container-square">
                    <div id="highlighter"></div>
                    <div className="page-container">
                        <div className="ui-line"></div>
                        <div className="ui-box" onClick={this.clickContainer1}>
                            <div id="circle1" className="ui-circle"></div>
                        </div>
                        <div className="ui-box" onClick={this.clickContainer1}>
                            <div id="circle2" className="ui-circle"></div>
                        </div>
                    </div>
                </div>
                <div className="container-square" onClick={this.clickContainer2}>
                    <div id="diamond"></div>
                    <div className="fill-bar-container">
                        <img id="doSvg1" src={doSvg1} alt="check mark"/>
                        <div className="bar-track">
                            <div className="bar-fill"></div>
                        </div>
                        <div className="bar-numbers">
                            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                        </div>
                    </div>
                </div>
                <div id="overlapping" className="container-square">
                    <div className="light-square size-medium"></div>
                    <div className="medium-square size-medium"></div>
                </div>
                <div className="container-square" onMouseEnter={this.hoverContainer4}>
                    <div className="centerizer">
                        <div className="dark-square size-medium"></div>
                        <div className="medium-square size-medium"></div>
                        <div className="light-square size-medium"></div>
                    </div>
                </div>
                <div className="container-square">
                    <div className="medium-square size-small" onClick={this.clickContainer5}></div>
                    <div className="light-square size-fill"></div>
                </div>
                <div className="container-square" onClick={this.clickContainer6}>
                    <img id="easingCurve" src={easingCurve} alt="easing curve" />
                    <div className="circle-small"></div>
                    <div className="circle-large"></div>
                </div>
                <div className="container-square" onMouseEnter={this.hoverContainer7} ref={(ref) => { this.scrollElement = ref;}}>
                    <div className="centerizer large single">
                        <div className="medium-square size-large"></div>
                    </div>
                </div>
                <div className="container-square" onClick={this.clickContainer8}>
                    <div className="centerizer layout">
                        <div className="row1">
                            <div className="medium-square size-medium fill-width"></div>
                        </div>
                        <div className="row2">
                            <div className="dark-square size-medium"></div>
                            <div className="light-square size-medium"></div>
                        </div>
                        <div className="row3">
                            <div className="medium-square size-medium"></div>
                            <div className="dark-square size-medium"></div>
                        </div>
                    </div>
                </div>
                <div className="container-square" onClick={this.clickContainer9}>
                    <div className="centerizer foursquare">
                        <div id="fourSquare1" className="dark-square size-medium"></div>
                        <div id="fourSquare2" className="medium-square size-medium"></div>
                        <div id="fourSquare3" className="light-square size-medium"></div>
                        <div id="fourSquare4" className="light-square size-medium"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestPage;