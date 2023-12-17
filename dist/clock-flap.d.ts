/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import { TimeStruct } from './timeContext';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class ClockFlap extends LitElement {
    flipperClass: string;
    currentValue: number;
    newValue: number;
    flipperValue: number;
    time?: TimeStruct;
    type: 'hour' | 'minute' | 'second';
    timePosition: '1' | '2';
    private tick;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    flip(): void;
    setTime(): void;
    requestUpdate(name?: PropertyKey | undefined): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
//# sourceMappingURL=clock-flap.d.ts.map