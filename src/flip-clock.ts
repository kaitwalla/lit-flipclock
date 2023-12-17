import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ClockFlap} from './clock-flap';
import {provide} from '@lit/context';
import {TimeStruct, timeContext} from './timeContext';

@customElement('flip-clock')
export class FlipClock extends LitElement {
  static override styles = css`
    .clock {
      display: flex;
    }
  `;

  override render() {
    return html` <div class="clock">
      <clock-flap type="hour" timePosition="1"></clock-flap>
      <clock-flap type="hour" timePosition="2"></clock-flap>
      <clock-flap type="minute" timePosition="1"></clock-flap>
      <clock-flap type="minute" timePosition="2"></clock-flap>
      <clock-flap type="second" timePosition="1"></clock-flap>
      <clock-flap type="second" timePosition="2"></clock-flap>
    </div>`;
  }

  @provide({context: timeContext})
  time: TimeStruct = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };

  override connectedCallback(): void {
    super.connectedCallback();
    setInterval(() => {
      this.time = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
      };
    }, 1000);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'clock-flap': ClockFlap;
    'flip-clock': FlipClock;
  }
}
