import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
  input
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Unique ID for the injected tooltip stylesheet. */
const TOOLTIP_STYLE_ID = 'hub-tooltip-styles';

/** Base styles for the tooltip element, injected once into <head>. */
const TOOLTIP_STYLES = `
.ng-tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  margin: 0;
  font-family: var(--hub-ref-font-family, inherit);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  font-size: 0.875rem;
  word-wrap: break-word;
  opacity: 0;
  background-color: #000;
  color: #fff;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  pointer-events: none;
}
.ng-tooltip-show { opacity: 0.9; }
`;

@Directive({
	selector: '[tooltip]'
})
export class TooltipDirective {
	readonly tooltipTitle = input.required<string>({ alias: "tooltip" });
	readonly placement = input<string>();
	readonly delay = input<number>();
	tooltip!: HTMLElement | null;
	offset = 8;

	private readonly document = inject(DOCUMENT);

	constructor(private el: ElementRef, private renderer: Renderer2) {
		this.ensureStyles();
	}

	/**
	 * Injects the tooltip stylesheet into <head> once per document.
	 * Subsequent instances reuse the same <style> tag.
	 */
	private ensureStyles(): void {
		if (this.document.getElementById(TOOLTIP_STYLE_ID)) {
			return;
		}
		const style = this.renderer.createElement('style') as HTMLStyleElement;
		style.id = TOOLTIP_STYLE_ID;
		style.textContent = TOOLTIP_STYLES;
		this.renderer.appendChild(this.document.head, style);
	}

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.tooltip) {
			this.show();
		}
	}

	@HostListener('click') onClick() {
		if (this.tooltip) {
			this.hide();
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (this.tooltip) {
			this.hide();
		}
	}

	show() {
		this.create();
		this.setPosition();
		this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
	}

	hide() {
		this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
		window.setTimeout(() => {
			this.renderer.removeChild(document.body, this.tooltip);
			this.tooltip = null;
		}, this.delay());
	}

	create() {
		this.tooltip = this.renderer.createElement('span');

		this.renderer.appendChild(
			this.tooltip,
			this.renderer.createText(this.tooltipTitle()) // textNode
		);

		this.renderer.appendChild(document.body, this.tooltip);
		// this.renderer.appendChild(this.el.nativeElement, this.tooltip);

		this.renderer.addClass(this.tooltip, 'ng-tooltip');
		this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement()}`);

		// delay 설정
		const delay = this.delay();
  this.renderer.setStyle(
			this.tooltip,
			'-webkit-transition',
			`opacity ${delay}ms`
		);
		this.renderer.setStyle(
			this.tooltip,
			'-moz-transition',
			`opacity ${delay}ms`
		);
		this.renderer.setStyle(
			this.tooltip,
			'-o-transition',
			`opacity ${delay}ms`
		);
		this.renderer.setStyle(
			this.tooltip,
			'transition',
			`opacity ${delay}ms`
		);
	}

	setPosition() {
		if (!this.tooltip) {
			return;
		}
		// 호스트 요소의 사이즈와 위치 정보
		const hostPos = this.el.nativeElement.getBoundingClientRect();

		// tooltip 요소의 사이즈와 위치 정보
		const tooltipPos = this.tooltip.getBoundingClientRect();

		// window의 scroll top
		// getBoundingClientRect 메소드는 viewport에서의 상대적인 위치를 반환한다.
		// 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
		const scrollPos =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;

		let top, left;

		const placement = this.placement();
  if (placement === 'top') {
			top = hostPos.top - tooltipPos.height - this.offset;
			left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
		}

		if (placement === 'bottom') {
			top = hostPos.bottom + this.offset;
			left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
		}

		if (placement === 'left') {
			top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
			left = hostPos.left - tooltipPos.width - this.offset;
		}

		if (placement === 'right') {
			top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
			left = hostPos.right + this.offset;
		}

		// 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
		this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
		this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
	}
}
