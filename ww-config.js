export default {
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
            /* wwEditor:end */
        },
    ],
};
