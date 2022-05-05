import {
	INodeProperties
} from 'n8n-workflow';
import { parseBinId } from './GenericFunctions';

import {
	RESOURCES,
	BIN_OPERATIONS,
	BIN_FIELDS,
	REQUEST_OPERATIONS,
	NODE_SETTINGS
} from './NodeConstants';

export const binOperations: INodeProperties[] = [
	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
				show: {
						resource: [
							RESOURCES.BIN.value,
						],
				},
		},
		options: [
			{
					name: BIN_OPERATIONS.CREATE.name,
					value: BIN_OPERATIONS.CREATE.value,
					description: BIN_OPERATIONS.CREATE.description,
					routing: {
						request: {
							method: 'POST',
							url: NODE_SETTINGS.API_URL
						},
					}
			},
			{
				name: BIN_OPERATIONS.GET.name,
				value: BIN_OPERATIONS.GET.value,
				description: BIN_OPERATIONS.GET.description,
				routing: {
					request: {
						method: 'GET',
						url: `=${NODE_SETTINGS.API_URL}/{{$parameter["${BIN_FIELDS.BIN_ID.name}"]}}`
					},
				}
			},
			{
				name: BIN_OPERATIONS.DELETE.name,
				value: BIN_OPERATIONS.DELETE.value,
				description: BIN_OPERATIONS.DELETE.description,
				routing: {
					request: {
						method: 'DELETE',
						url: `=${NODE_SETTINGS.API_URL}/{{$parameter["${BIN_FIELDS.BIN_ID.name}"]}}`
					},
				}
			},
			{
				name: BIN_OPERATIONS.TEST.name,
				value: BIN_OPERATIONS.TEST.value,
				description: BIN_OPERATIONS.TEST.description,
				routing: {
					request: {
						method: 'POST',
						url: `=${NODE_SETTINGS.BIN_URL}/{{$parameter["${BIN_FIELDS.BIN_ID.name}"]}}`
					},
					send: {
						type: 'body',
						property: 'content',
						value: `={{$parameter["${BIN_FIELDS.BIN_CONTENT.name}"]}}`
					}
				}
			},
		],
		default: BIN_OPERATIONS.CREATE.value,
		description: 'The operation to perform.',
	},
]

export const binFields: INodeProperties[] = [
	{
		name: BIN_FIELDS.BIN_ID.name,
		displayName: BIN_FIELDS.BIN_ID.displayName,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					RESOURCES.BIN.value,
					RESOURCES.REQUEST.value
				],
				operation: [
					BIN_OPERATIONS.GET.value,
					BIN_OPERATIONS.DELETE.value,
					BIN_OPERATIONS.TEST.value,
					REQUEST_OPERATIONS.SHIFT.value,
				]
			},
		},
		description: 'Unique identifier for each bin.',
	},
	{
	 name: BIN_FIELDS.BIN_CONTENT.name,
	 displayName: BIN_FIELDS.BIN_CONTENT.displayName,
	 type: 'string',
	 default: '',
	 typeOptions: {
	     rows: 5,
	 },
	 displayOptions: {
	     show: {
	         resource: [
	             RESOURCES.BIN.value,
	         ],
	         operation: [
	             BIN_OPERATIONS.TEST.value,
	         ]
	     }
	 }
	},
]
