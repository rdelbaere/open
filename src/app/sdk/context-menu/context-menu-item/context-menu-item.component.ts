import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sdk-context-menu-item',
  templateUrl: './context-menu-item.component.html',
  styleUrls: ['./context-menu-item.component.scss']
})
export class ContextMenuItemComponent {
    @Input() icon: string;
    @Output() selected = new EventEmitter<void>();

    clicked() {
        this.selected.emit();
    }
}
