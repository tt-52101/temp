import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DelonFormModule, WidgetRegistry } from '@delon/form';

import { EditorWidget } from './widgets/editor/editor.widget';
import { ImgWidget } from './widgets/img/img.widget';
import { AddressWidget } from './widgets/address/address.widget';
import { TinymceComponent } from './widgets/tinymce/tinymce.component';

export const SCHEMA_THIRDS_COMPONENTS = [
  EditorWidget,
  ImgWidget,
  AddressWidget,
  TinymceComponent,
];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  entryComponents: SCHEMA_THIRDS_COMPONENTS,
  imports: [SharedModule, DelonFormModule.forRoot()],
  exports: [...SCHEMA_THIRDS_COMPONENTS],
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(EditorWidget.KEY, EditorWidget);
    widgetRegistry.register(ImgWidget.KEY, ImgWidget);
    widgetRegistry.register(AddressWidget.KEY, AddressWidget);
    widgetRegistry.register(TinymceComponent.KEY, TinymceComponent);
  }
}
