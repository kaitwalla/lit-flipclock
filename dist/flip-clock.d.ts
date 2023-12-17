import { LitElement } from 'lit';
import { ClockFlap } from './clock-flap';
import { TimeStruct } from './timeContext';
export declare class FlipClock extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    time: TimeStruct;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'clock-flap': ClockFlap;
        'flip-clock': FlipClock;
    }
}
//# sourceMappingURL=flip-clock.d.ts.map