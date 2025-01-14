export default {
    features: {
        datasource: true
    },
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    return (
                        !!settings.publicData.applicationId &&
                        !!settings.publicData.apiKey &&
                        !!settings.privateData.apiKey
                    );
                },
            },
        ],
        collection: {
            edit: () => import('./src/components/Collection/CollectionEdit.vue'),
            summary: () => import('./src/components/Collection/CollectionSummary.vue'),
            getIsValid({ index, search }) {
                return !!index && !!search;
            },
            modes: ['dynamic'],
            queryConfig: {
                hasNativePagination: true,
                hasNativeSort: false,
                hasNativeFilter: false,
            },
        },
    },
    actions: [
        {
            name: 'Search',
            code: 'search',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Search.vue'),
            getIsValid({ index, search }) {
                return !!index && !!search;
            },
            copilot: {
                description: 'Search through an Algolia index',
                returns: 'object',
                schema: {
                    index: {
                        type: 'string',
                        description: 'The name of the Algolia index to search in',
                        bindable: true
                    },
                    search: {
                        type: 'string',
                        description: 'The search query to execute',
                        bindable: true
                    },
                    page: {
                        type: 'number',
                        description: 'The page number to retrieve (starting from 0)',
                        bindable: true
                    },
                    limit: {
                        type: 'number',
                        description: 'The number of results per page',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};