var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { timeContext } from './timeContext';
let FlipClock = class FlipClock extends LitElement {
    constructor() {
        super(...arguments);
        this.time = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
        };
    }
    render() {
        return html ` <div class="clock">
      <clock-flap type="hour" timePosition="1"></clock-flap>
      <clock-flap type="hour" timePosition="2"></clock-flap>
      <clock-flap type="minute" timePosition="1"></clock-flap>
      <clock-flap type="minute" timePosition="2"></clock-flap>
      <clock-flap type="second" timePosition="1"></clock-flap>
      <clock-flap type="second" timePosition="2"></clock-flap>
    </div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        setInterval(() => {
            this.time = {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds(),
            };
        }, 1000);
    }
};
FlipClock.styles = css `
    .clock {
      display: flex;
    }
  `;
__decorate([
    provide({ context: timeContext })
], FlipClock.prototype, "time", void 0);
FlipClock = __decorate([
    customElement('flip-clock')
], FlipClock);
export { FlipClock };
//# sourceMappingURL=flip-clock.js.map