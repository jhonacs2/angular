import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, inject,
  Input,
  ViewChild
} from '@angular/core';
import { Item } from '../../models/post';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-table-content',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf,
    NgForOf,
  ],
  templateUrl: './table-content.component.html',
  styleUrl: './table-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContentComponent implements AfterViewInit {
  @Input() tableContent: Item[] = [
    {
      'id': '96d84888-03b8-4ec1-80c1-efbd72faf540',
      'level': 3,
      'slug': 'introduction',
      'title': 'Introduction:',
      'parentId': null
    },
    {
      'id': '4b713ae6-81b7-4624-a107-bbbd9d95ef12',
      'level': 1,
      'slug': 'chapter-1-handling-click-events',
      'title': 'Chapter 1: Handling Click Events',
      'parentId': null
    },
    {
      'id': '5e24f205-748f-4728-8216-b3423a73e966',
      'level': 4,
      'slug': 'basic-click-event-handling',
      'title': 'Basic Click Event Handling',
      'parentId': '4b713ae6-81b7-4624-a107-bbbd9d95ef12'
    },
    {
      'id': '20c1a171-d9fa-406d-9c9f-2982559535d4',
      'level': 4,
      'slug': 'passing-parameters-to-click-event-handlers',
      'title': 'Passing Parameters to Click Event Handlers',
      'parentId': '4b713ae6-81b7-4624-a107-bbbd9d95ef12'
    },
    {
      'id': 'f683452e-27f0-40ad-b1c8-f88303e165c8',
      'level': 4,
      'slug': 'functional-component-with-click-event',
      'title': 'Functional Component with Click Event',
      'parentId': '4b713ae6-81b7-4624-a107-bbbd9d95ef12'
    },
    {
      'id': '0eef5728-9fb5-450c-b9b3-644f8cf6c18c',
      'level': 3,
      'slug': 'chapter-2-handling-non-click-events',
      'title': 'Chapter 2: Handling Non-Click Events',
      'parentId': '4b713ae6-81b7-4624-a107-bbbd9d95ef12'
    },
    {
      'id': '219c771d-8521-4a12-b048-8c6715071618',
      'level': 4,
      'slug': 'handling-hover-events',
      'title': 'Handling Hover Events:',
      'parentId': '0eef5728-9fb5-450c-b9b3-644f8cf6c18c'
    },
    {
      'id': '23a029d7-1382-4c2c-a3d0-87e59020d72a',
      'level': 4,
      'slug': 'handling-input-changes',
      'title': 'Handling Input Changes:',
      'parentId': '0eef5728-9fb5-450c-b9b3-644f8cf6c18c'
    },
    {
      'id': '5d950bb4-5a64-4dc7-89e0-c84f04fc332d',
      'level': 4,
      'slug': 'handling-keypress-events',
      'title': 'Handling Keypress Events:',
      'parentId': '0eef5728-9fb5-450c-b9b3-644f8cf6c18c'
    },
    {
      'id': '0d665f9d-c079-4ad1-9ce8-4df80daac219',
      'level': 1,
      'slug': 'chapter-3-event-object',
      'title': 'Chapter 3: Event Object',
      'parentId': null
    },
    {
      'id': '2498717c-6dc0-465b-af16-5ba61e8f8128',
      'level': 4,
      'slug': 'accessing-event-properties',
      'title': 'Accessing Event Properties:',
      'parentId': '0d665f9d-c079-4ad1-9ce8-4df80daac219'
    },
    {
      'id': 'd5536704-1467-4302-be5c-4dfb4819590b',
      'level': 4,
      'slug': 'preventing-default-behavior',
      'title': 'Preventing Default Behavior:',
      'parentId': '0d665f9d-c079-4ad1-9ce8-4df80daac219'
    },
    {
      'id': '465789ab-3b79-4206-afd0-afa23bed69bc',
      'level': 4,
      'slug': 'passing-event-parameters',
      'title': 'Passing Event Parameters:',
      'parentId': '0d665f9d-c079-4ad1-9ce8-4df80daac219'
    },
    {
      'id': 'b7085dbe-6507-4785-9a58-b7c07d956cc6',
      'level': 1,
      'slug': 'chapter-4-state-in-react',
      'title': 'Chapter 4: State in React',
      'parentId': null
    },
    {
      'id': '79fa3b8c-f663-45d4-9776-e9a4e84a8a71',
      'level': 4,
      'slug': 'what-is-state',
      'title': 'What is State?',
      'parentId': 'b7085dbe-6507-4785-9a58-b7c07d956cc6'
    },
    {
      'id': '299bf395-51a3-497b-93cf-fa9116ea48cd',
      'level': 4,
      'slug': 'class-components-and-state',
      'title': 'Class Components and State:',
      'parentId': 'b7085dbe-6507-4785-9a58-b7c07d956cc6'
    },
    {
      'id': '9665f81c-1095-4d4e-8dac-1a9254f197f9',
      'level': 4,
      'slug': 'functional-components-and-state-with-hooks',
      'title': 'Functional Components and State with Hooks:',
      'parentId': 'b7085dbe-6507-4785-9a58-b7c07d956cc6'
    },
    {
      'id': '22d53bfc-84e9-486a-b67e-360952be046e',
      'level': 4,
      'slug': 'immutable-state-updates',
      'title': 'Immutable State Updates:',
      'parentId': 'b7085dbe-6507-4785-9a58-b7c07d956cc6'
    },
    {
      'id': 'f0480d39-749d-4e20-ac4f-5ba46b326a64',
      'level': 1,
      'slug': 'chapter-5-hooks',
      'title': 'Chapter 5: Hooks',
      'parentId': null
    },
    {
      'id': '6f4790c9-0163-42fe-a41c-59534c1a4586',
      'level': 4,
      'slug': 'what-are-hooks',
      'title': 'What are Hooks?',
      'parentId': 'f0480d39-749d-4e20-ac4f-5ba46b326a64'
    },
    {
      'id': '1c7f30ba-4cdc-4c57-b22f-7154bcc24cb7',
      'level': 4,
      'slug': 'benefits-of-hooks',
      'title': 'Benefits of Hooks:',
      'parentId': 'f0480d39-749d-4e20-ac4f-5ba46b326a64'
    },
    {
      'id': '19d58795-7387-416c-9897-f6c85da96250',
      'level': 4,
      'slug': 'usestate-hook',
      'title': 'useState Hook:',
      'parentId': 'f0480d39-749d-4e20-ac4f-5ba46b326a64'
    },
    {
      'id': 'd59fa6a0-257e-4665-b061-834866eff060',
      'level': 4,
      'slug': 'useeffect-hook',
      'title': 'useEffect Hook:',
      'parentId': 'f0480d39-749d-4e20-ac4f-5ba46b326a64'
    },
    {
      'id': '68901c71-7977-4981-acb4-153264a59904',
      'level': 4,
      'slug': 'custom-hooks',
      'title': 'Custom Hooks:',
      'parentId': 'f0480d39-749d-4e20-ac4f-5ba46b326a64'
    },
    {
      'id': '5a8bca8a-c426-417d-9142-ae0ea0f25475',
      'level': 1,
      'slug': 'chapter-6-usestate-hook',
      'title': 'Chapter 6: useState() Hook',
      'parentId': null
    },
    {
      'id': '5f1e6e2f-2d6c-42d1-8da7-e2175c01a3c1',
      'level': 4,
      'slug': 'introduction-to-usestate',
      'title': 'Introduction to useState:',
      'parentId': '5a8bca8a-c426-417d-9142-ae0ea0f25475'
    },
    {
      'id': 'c7a55f7a-27a2-4ed0-984d-381a27b4c866',
      'level': 4,
      'slug': 'syntax-of-usestate',
      'title': 'Syntax of useState:',
      'parentId': '5a8bca8a-c426-417d-9142-ae0ea0f25475'
    },
    {
      'id': 'dfa21f02-d820-4cc1-b57d-95aa55c2ec6b',
      'level': 4,
      'slug': 'using-usestate-in-a-simple-example',
      'title': 'Using useState in a Simple Example:',
      'parentId': '5a8bca8a-c426-417d-9142-ae0ea0f25475'
    },
    {
      'id': 'ee7fe23b-15ce-4c2d-af40-609b2b568a3f',
      'level': 4,
      'slug': 'dynamic-state-updates',
      'title': 'Dynamic State Updates:',
      'parentId': '5a8bca8a-c426-417d-9142-ae0ea0f25475'
    },
    {
      'id': '4ad096a2-3ee0-491e-acda-b3455824fda0',
      'level': 4,
      'slug': 'multiple-state-variables',
      'title': 'Multiple State Variables:',
      'parentId': '5a8bca8a-c426-417d-9142-ae0ea0f25475'
    },
    {
      'id': 'a29a1dac-476c-4d07-99fd-f6534c5b5dc6',
      'level': 1,
      'slug': 'chapter-7-activity-create-like-button',
      'title': 'Chapter 7: Activity - Create Like Button',
      'parentId': null
    },
    {
      'id': 'fd2dd3ce-e120-4fbc-a1d6-d80f5f95dfde',
      'level': 4,
      'slug': 'objective',
      'title': 'Objective:',
      'parentId': 'a29a1dac-476c-4d07-99fd-f6534c5b5dc6'
    },
    {
      'id': '0d9e9e5c-3f6c-4cd4-9c8c-6934a411922a',
      'level': 4,
      'slug': 'implementation',
      'title': 'Implementation:',
      'parentId': 'a29a1dac-476c-4d07-99fd-f6534c5b5dc6'
    },
    {
      'id': 'b4e3ea96-d8b1-43e8-81dc-487aa59947ac',
      'level': 4,
      'slug': 'conclusion',
      'title': 'Conclusion:',
      'parentId': 'a29a1dac-476c-4d07-99fd-f6534c5b5dc6'
    },
    {
      'id': '3708e853-1fef-46f5-973d-ae5c0ab20fc9',
      'level': 1,
      'slug': 'chapter-8-closure-in-javascript',
      'title': 'Chapter 8: Closure in JavaScript',
      'parentId': null
    },
    {
      'id': 'ad9d28c9-91eb-417f-b286-d35ab7ef81e8',
      'level': 4,
      'slug': 'what-is-a-closure',
      'title': 'What is a Closure?',
      'parentId': '3708e853-1fef-46f5-973d-ae5c0ab20fc9'
    },
    {
      'id': '02e86f40-54bf-49ab-917c-7363a411c80d',
      'level': 4,
      'slug': 'example-of-a-closure',
      'title': 'Example of a Closure:',
      'parentId': '3708e853-1fef-46f5-973d-ae5c0ab20fc9'
    },
    {
      'id': '2a7dd39a-9494-4b45-9927-5d275445a3f7',
      'level': 4,
      'slug': 'closures-and-event-handlers',
      'title': 'Closures and Event Handlers:',
      'parentId': '3708e853-1fef-46f5-973d-ae5c0ab20fc9'
    },
    {
      'id': 'c9184512-b7b7-42ce-bcd1-914f46585405',
      'level': 4,
      'slug': 'closures-in-asynchronous-operations',
      'title': 'Closures in Asynchronous Operations:',
      'parentId': '3708e853-1fef-46f5-973d-ae5c0ab20fc9'
    },
    {
      'id': 'b221ffa2-9bab-4b42-a9b3-2308fafd4fb7',
      'level': 4,
      'slug': 'conclusion-1',
      'title': 'Conclusion:',
      'parentId': '3708e853-1fef-46f5-973d-ae5c0ab20fc9'
    },
    {
      'id': '1a5e337d-8c0d-4b55-9d19-6f4f46d4e288',
      'level': 1,
      'slug': 'chapter-9-re-render-how-does-it-work',
      'title': 'Chapter 9: Re-render: How Does it Work?',
      'parentId': null
    },
    {
      'id': '6bb5e197-ebd8-4873-adf1-7da1838cfb97',
      'level': 4,
      'slug': 'reacts-reconciliation-algorithm',
      'title': 'React\'s Reconciliation Algorithm:',
      'parentId': '1a5e337d-8c0d-4b55-9d19-6f4f46d4e288'
    },
    {
      'id': '345c957d-a019-42b9-8167-287b361317f9',
      'level': 4,
      'slug': 'what-triggers-a-re-render',
      'title': 'What Triggers a Re-render?',
      'parentId': '1a5e337d-8c0d-4b55-9d19-6f4f46d4e288'
    },
    {
      'id': 'e38836a0-f589-4ce3-bc48-3419aa76002b',
      'level': 4,
      'slug': 'optimizing-re-renders',
      'title': 'Optimizing Re-renders:',
      'parentId': '1a5e337d-8c0d-4b55-9d19-6f4f46d4e288'
    },
    {
      'id': 'bb91bbd3-1021-490d-9f90-b2428fb708ee',
      'level': 4,
      'slug': 'conclusion-2',
      'title': 'Conclusion:',
      'parentId': '1a5e337d-8c0d-4b55-9d19-6f4f46d4e288'
    },
    {
      'id': 'd8108962-e5d1-420e-84bc-4edb1b2441cb',
      'level': 1,
      'slug': 'chapter-10-callback-in-set-state-function',
      'title': 'Chapter 10: Callback in Set State Function',
      'parentId': null
    },
    {
      'id': 'e40731f0-d940-499c-be00-4a14693546a0',
      'level': 4,
      'slug': 'understanding-setstate',
      'title': 'Understanding setState:',
      'parentId': 'd8108962-e5d1-420e-84bc-4edb1b2441cb'
    },
    {
      'id': 'b1fb7e5d-1174-4d4e-83fc-e9d893e60d1c',
      'level': 4,
      'slug': 'using-a-callback-with-setstate',
      'title': 'Using a Callback with setState:',
      'parentId': 'd8108962-e5d1-420e-84bc-4edb1b2441cb'
    },
    {
      'id': '8421b1c6-59a8-41ad-b529-02957f4b45d5',
      'level': 4,
      'slug': 'dealing-with-asynchronous-state-updates',
      'title': 'Dealing with Asynchronous State Updates:',
      'parentId': 'd8108962-e5d1-420e-84bc-4edb1b2441cb'
    },
    {
      'id': '870e18d9-fe7d-4a9e-aeb3-24473cd9f2e9',
      'level': 4,
      'slug': 'using-previous-state-for-dynamic-updates',
      'title': 'Using Previous State for Dynamic Updates:',
      'parentId': 'd8108962-e5d1-420e-84bc-4edb1b2441cb'
    },
    {
      'id': '8b04cec0-2c61-4f19-907c-4855e77e3c0e',
      'level': 4,
      'slug': 'conclusion-3',
      'title': 'Conclusion:',
      'parentId': 'd8108962-e5d1-420e-84bc-4edb1b2441cb'
    },
    {
      'id': '7e754714-a04b-4eee-8ee8-2d72041f9a8f',
      'level': 1,
      'slug': 'chapter-11-more-about-state',
      'title': 'Chapter 11: More About State',
      'parentId': null
    },
    {
      'id': '55a5aa3f-1498-4456-b499-d054d78c8aa0',
      'level': 4,
      'slug': 'complex-state-structures',
      'title': 'Complex State Structures:',
      'parentId': '7e754714-a04b-4eee-8ee8-2d72041f9a8f'
    },
    {
      'id': '46d175f5-66f3-4a92-9648-9c1fab5d93f1',
      'level': 4,
      'slug': 'updating-state-based-on-previous-state',
      'title': 'Updating State Based on Previous State:',
      'parentId': '7e754714-a04b-4eee-8ee8-2d72041f9a8f'
    },
    {
      'id': '7f7fc1ff-4b04-472f-819d-9f4ea00c028c',
      'level': 4,
      'slug': 'lifting-state-up',
      'title': 'Lifting State Up:',
      'parentId': '7e754714-a04b-4eee-8ee8-2d72041f9a8f'
    },
    {
      'id': '43b66f5e-a291-4601-af55-dc06d569e28f',
      'level': 4,
      'slug': 'conclusion-4',
      'title': 'Conclusion:',
      'parentId': '7e754714-a04b-4eee-8ee8-2d72041f9a8f'
    }
  ];

  @ViewChild('listElement') listElement!: ElementRef<HTMLUListElement>;

  public data: TreeNode[] = [];

  private cdr = inject(ChangeDetectorRef);

  constructor() {
  }

  ngAfterViewInit(): void {
    this.data = this._buildTree(this.tableContent, null);
    this.cdr.markForCheck();
  }

  private _buildTree(items: Item[], parentId: null | string): TreeNode[] {
    const result: TreeNode[] = [];
    items
      .filter(item => item.parentId === parentId)
      .forEach(item => {
        const newItem: TreeNode = { label: item.title };
        const children = this._buildTree(items, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        result.push(newItem);
      });
    return result;
  }
}

interface TreeNode {
  label: string;
  children?: TreeNode[];
}
