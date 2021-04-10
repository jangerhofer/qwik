/**
 * @license
 * Copyright a-Qoot All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/a-Qoot/qoot/blob/main/LICENSE
 */

import { TodoService } from '../../data/Todo/public.js';
import {
  injectEventHandler,
  provideQrlExp,
  provideService,
  markDirty,
  provideProviderOf,
} from '../../qoot.js';
import { HeaderComponent } from './component.js';

export default injectEventHandler(
  HeaderComponent,
  provideQrlExp<string>('value'),
  provideQrlExp<string>('code'),
  provideProviderOf(provideService<TodoService>('items:')),
  async function (
    this: HeaderComponent,
    inputValue: string,
    charCode: string,
    itemsService: () => Promise<TodoService>
  ) {
    if (charCode === 'Enter' && inputValue) {
      (await itemsService()).newItem(inputValue);
      this.$state.text = '';
      markDirty(this);
    }
  }
);