/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { consume } from '@lit/context';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeContext } from './timeContext';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let ClockFlap = class ClockFlap extends LitElement {
    constructor() {
        super(...arguments);
        this.flipperClass = 'flipper';
        this.currentValue = 0;
        this.newValue = 1;
        this.flipperValue = this.currentValue;
        this.type = 'hour';
        this.timePosition = '2';
        this.tick = 0;
    }
    render() {
        return html ` <div class="number">
      <div class="top">
        <div class="digit">${this.newValue}</div>
      </div>
      <div class="bottom">
        <div class="digit">${this.currentValue}</div>
      </div>
      <div class="${this.flipperClass}">
        <div class="digit front">${this.flipperValue}</div>
      </div>
    </div>`;
    }
    flip() {
        this.flipperClass = 'flipper flipped';
        setTimeout(() => {
            this.flipperValue = this.newValue;
        }, 250);
        setTimeout(() => {
            this.currentValue = this.newValue;
            this.flipperClass = 'flipper';
        }, 500);
    }
    setTime() {
        if (this.time) {
            switch (this.type) {
                case 'hour':
                    // eslint-disable-next-line no-case-declarations
                    let hour = this.time.hour > 12 ? this.time.hour - 12 : this.time.hour;
                    hour = hour === 0 ? 12 : hour;
                    if (this.timePosition === '1') {
                        if (this.time.minute === 59 && this.time.second === 59) {
                            this.newValue = hour < 9 || hour === 12 ? 0 : 1;
                            this.flip();
                        }
                        else {
                            this.currentValue = Math.floor(hour / 10);
                        }
                    }
                    else {
                        const calculatedValue = hour < 10 ? hour : hour % 10;
                        if (this.time.minute === 59 && this.time.second === 59) {
                            if (hour === 12) {
                                this.newValue = 1;
                                this.flip();
                            }
                            else if (calculatedValue < 9) {
                                this.newValue = calculatedValue + 1;
                                this.flip();
                            }
                            else if (calculatedValue === 9) {
                                this.newValue = 0;
                                this.flip();
                            }
                        }
                        else {
                            this.currentValue = calculatedValue;
                        }
                    }
                    break;
                case 'second':
                case 'minute':
                    // eslint-disable-next-line no-case-declarations
                    const value = this.type === 'minute' ? this.time.minute : this.time.second;
                    if (!this.currentValue) {
                        if (this.timePosition === '1') {
                            this.currentValue = Math.floor(value / 10);
                        }
                        else {
                            this.currentValue = value % 10;
                        }
                    }
                    break;
            }
            switch (this.type) {
                case 'minute':
                    if (this.time.second === 59) {
                        if (this.timePosition === '1') {
                            const calculatedValue = this.time.minute !== 59 ? Math.floor(this.time.minute / 10) : 0;
                            if (calculatedValue !== this.currentValue) {
                                this.newValue = calculatedValue;
                                this.flip();
                            }
                        }
                        else {
                            this.newValue =
                                this.time.minute !== 59 ? this.currentValue + 1 : 0;
                            this.flip();
                        }
                    }
                    break;
                case 'second':
                    if (this.timePosition === '1') {
                        this.newValue =
                            this.time.second !== 59
                                ? Math.floor((this.time.second + 1) / 10)
                                : 0;
                        if (this.newValue !== this.currentValue) {
                            this.flip();
                        }
                    }
                    else {
                        this.flip();
                        this.newValue =
                            this.time.second !== 59 ? (this.currentValue + 1) % 10 : 0;
                    }
                    break;
            }
            this.flipperValue = this.currentValue;
        }
    }
    requestUpdate(name) {
        super.requestUpdate();
        if (name === 'time') {
            this.setTime();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.setTime();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.tick);
    }
};
ClockFlap.styles = css `
    .number {
      position: relative;
      border-right: 1px solid rgba(0, 0, 0, 0.5);
    }

    .number .top,
    .number .bottom,
    .number .flipper {
      background: #444;
      height: 27px;
      display: block;
      width: 40px;
      overflow: hidden;
      position: relative;
    }

    .number .flipper {
      position: absolute;
      perspective: 800;
      top: 0;
    }

    .number .flipper.flipped {
      transform: rotateX(180deg) translateY(-1px);
      transform-origin: bottom center;
      transition: transform 0.5s;
    }

    .number .top {
      margin-bottom: 1px;
    }

    .number .digit {
      color: white;
      position: absolute;
      font-size: 46px;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .number .flipper .digit {
      background: #444;
    }

    .number .flipper {
      transform: rotateX(0deg);
    }

    .number .flipper.flipped .digit {
      transform: translateY(32px) rotateX(180deg);
    }

    .number .top .digit {
      top: 0px;
    }

    .number .bottom .digit {
      top: -32px;
    }
  `;
__decorate([
    state()
], ClockFlap.prototype, "flipperClass", void 0);
__decorate([
    state()
], ClockFlap.prototype, "currentValue", void 0);
__decorate([
    state()
], ClockFlap.prototype, "newValue", void 0);
__decorate([
    state()
], ClockFlap.prototype, "flipperValue", void 0);
__decorate([
    consume({ context: timeContext, subscribe: true }),
    property({ attribute: false })
], ClockFlap.prototype, "time", void 0);
__decorate([
    property()
], ClockFlap.prototype, "type", void 0);
__decorate([
    property()
], ClockFlap.prototype, "timePosition", void 0);
ClockFlap = __decorate([
    customElement('clock-flap')
], ClockFlap);
export { ClockFlap };
//# sourceMappingURL=clock-flap.js.map